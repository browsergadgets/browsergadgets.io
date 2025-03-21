import { Webhook } from "standardwebhooks";
import {
	serverSupabaseClient,
	serverSupabaseServiceRole,
} from "#supabase/server";
import { formatDiscordMessage, sendToDiscord } from "~/utils/discordNotifier";

export default defineEventHandler(async (event) => {
	try {
		// ✅ Read the raw body (only once)
		const rawBody = await readRawBody(event);
		if (!rawBody) {
			throw createError({
				statusCode: 400,
				statusMessage: "Invalid request: Empty body",
			});
		}

		// ✅ Parse webhook payload from rawBody
		const payload = JSON.parse(rawBody);
		if (!payload || !payload.type) {
			throw createError({
				statusCode: 400,
				statusMessage: "Invalid webhook payload",
			});
		}

		console.log("Webhook Payload: ", payload);

		// ✅ Get headers for verification
		const headers = getHeaders(event);

		// ✅ Verify webhook signature
		const webhook = new Webhook(process.env.DODO_WEBHOOK_SECRET || "");

		try {
			webhook.verify(rawBody, headers);
			console.log("✅ Webhook verified successfully!");
		} catch (verificationError) {
			console.error(
				"❌ Webhook Signature Verification Failed:",
				verificationError
			);

			throw createError({
				statusCode: 401,
				statusMessage: "Unauthorized: Invalid webhook signature",
			});
		}

		// ✅ Ensure valid payment data
		if (
			payload.type === "payment.succeeded" &&
			payload.data?.metadata?.product_code === "mywebshortcuts" &&
			payload.data?.metadata?.plan_code === "powerPack"
		) {
			console.log("✅ Payment Succeeded!");

			// ✅ Send Discord Notification
			try {
				console.log("📢 Sending Discord Message");

				const { message } = formatDiscordMessage({
					type: payload.type,
					data: payload.data,
					id: headers["webhook-id"] as string,
				});

				await sendToDiscord(message);
			} catch (formatError) {
				await sendToDiscord(`❌ Webhook Processing Error
				  • Event Type: ${payload.type}
				  • Error: ${
						formatError instanceof Error ? formatError.message : "Unknown error"
					}`);

				throw formatError;
			}

			const client = await serverSupabaseServiceRole(event);

			// ✅ Extract payment details
			const { payment_id, created_at, metadata } = payload.data;
			const userId = metadata?.supabase_user_id;
			const productCode = metadata?.product_code;
			const planCode = metadata?.plan_code;
			const expiresAt = payload.data.expires_at
				? new Date(payload.data.expires_at).toISOString()
				: null;

			// ✅ Ensure required metadata fields exist
			if (!userId || !productCode || !planCode) {
				throw createError({
					statusCode: 400,
					statusMessage: "Missing required metadata in webhook payload",
				});
			}

			console.log("📝 Payment Metadata: ", metadata);
			console.log("👤 User ID: ", userId);

			// ✅ Check for duplicate payment
			const { data: existingPayment, error: paymentCheckError } = await client
				.from("user_purchases")
				.select("id")
				.eq("id", payment_id)
				.maybeSingle();

			if (paymentCheckError) {
				console.error(
					"❌ Error checking for existing payment record:",
					paymentCheckError
				);
				throw createError({
					statusCode: 500,
					statusMessage: "Database error: Failed to check existing payment",
				});
			}

			if (existingPayment) {
				console.log("⚠️ Payment already exists, skipping insertion.");
				return { status: "ignored", message: "Duplicate payment detected" };
			}

			// ✅ Check if user already has an active plan
			const { data: existingPlan, error: planCheckError } = await client
				.from("user_purchases")
				.select("id")
				.eq("user_id", userId)
				.eq("product_code", productCode)
				.maybeSingle();

			if (planCheckError) {
				console.error("❌ Error checking for existing plan:", planCheckError);
				throw createError({
					statusCode: 500,
					statusMessage: "Database error: Failed to check existing plan",
				});
			}

			if (existingPlan) {
				console.log("⚠️ User already has an active plan, skipping insertion.");
				return {
					status: "ignored",
					message: "User already has an active plan",
				};
			}

			// ✅ Insert into `user_purchases`
			const { data, error } = await client.from("user_purchases").insert([
				{
					id: payment_id,
					user_id: userId,
					product_code: productCode,
					plan_code: planCode,
					purchased_at: created_at,
					expires_at: expiresAt,
				},
			]);

			if (error) {
				console.error("❌ Error inserting payment record:", error);
				throw createError({
					statusCode: 500,
					statusMessage: "Database error: Failed to insert payment",
				});
			}

			console.log("✅ Inserted payment record:", data);
		}

		// ✅ Return success response
		return {
			status: "success",
			message: "Webhook processed successfully",
		};
	} catch (error) {
		console.error("🚨 Webhook processing failed:", error);
		throw createError({
			statusCode: 500,
			statusMessage: "Webhook processing failed",
			data: { error: error instanceof Error ? error.message : "Unknown error" },
		});
	}
});
