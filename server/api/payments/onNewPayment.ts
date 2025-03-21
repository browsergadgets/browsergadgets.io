import { Webhook } from "standardwebhooks";
import {
	serverSupabaseClient,
	serverSupabaseUser,
	serverSupabaseServiceRole,
} from "#supabase/server";
import { formatDiscordMessage, sendToDiscord } from "~/utils/discordNotifier";

export default defineEventHandler(async (event) => {
	try {
		// Read raw body
		const rawBody = await readRawBody(event);

		// console.log("rawBody: ", rawBody);

		// Get headers
		const headers = getHeaders(event);
		// console.log("headers: ", headers);

		// Verify webhook signature using standardwebhooks
		const webhook = new Webhook(process.env.DODO_WEBHOOK_SECRET || "");

		try {
			webhook.verify(rawBody || "", headers);

			console.log("Webhook verified successfully!");
		} catch (verificationError) {
			console.error(
				"Webhook Signature Verification Failed:",
				verificationError
			);

			throw createError({
				statusCode: 401,
				statusMessage: "Unauthorized: Invalid webhook signature",
			});
		}

		// Parse webhook payload
		const payload = await readBody(event);
		console.log("payload: ", payload);

		console.log("payload.type", payload.type);

		if (
			payload.type === "payment.succeeded" &&
			payload.data.metadata.product_code &&
			payload.data.metadata.product_code == "mywebshortcuts" &&
			payload.data.metadata.plan_code &&
			payload.data.metadata.plan_code == "powerPack"
		) {
			console.log("Payment Succeeded!!");

			try {
				console.log("Sending Discord Message");

				// Format Discord message
				const { message } = formatDiscordMessage({
					type: payload.type,
					data: payload.data,
					id: headers["webhook-id"] as string, // Pass webhook ID for log URL
				});

				// Send to Discord
				await sendToDiscord(message);
			} catch (formatError) {
				// Send formatting/processing error to Discord
				await sendToDiscord(`❌ Webhook Processing Error
				  • Event Type: ${payload.type}
				  • Error: ${
						formatError instanceof Error ? formatError.message : "Unknown error"
					}`);

				throw formatError;
			}

			const client = await serverSupabaseServiceRole(event);

			// Extract necessary fields
			const paymentId = payload.data.payment_id;
			const purchased_at = payload.data.created_at;
			const metadata = payload.data.metadata; // Extract metadata once
			const userId = metadata.supabase_user_id;
			const productCode = metadata.product_code;
			const planCode = metadata.plan_code;
			const expiresAt = payload.data.expires_at
				? new Date(payload.data.expires_at).toISOString()
				: null;
			console.log("payment metadata: ", metadata);
			console.log("user id from metadata: ", userId);

			// Check if a record with this payment ID already exists
			const { data: existingPayment, error: paymentCheckError } = await client
				.from("user_purchases")
				.select("id")
				.eq("id", paymentId)
				.maybeSingle();

			if (paymentCheckError) {
				console.error(
					"Error checking for existing payment record:",
					paymentCheckError
				);
				return;
			}

			if (existingPayment) {
				console.log("Payment ID already exists, skipping insertion.");
				return;
			}

			// Check if the user already has a plan for this product
			const { data: existingPlan, error: planCheckError } = await client
				.from("user_purchases")
				.select("id")
				.eq("user_id", userId)
				.eq("product_code", productCode)
				.maybeSingle();

			if (planCheckError) {
				console.error("Error checking for existing plan:", planCheckError);
				return;
			}

			if (existingPlan) {
				console.log(
					"User already has an active plan for this product, skipping insertion."
				);
				return;
			}

			// Insert into user_purchases
			const { data, error } = await client.from("user_purchases").insert([
				{
					id: paymentId, // Using payment_id as row id
					user_id: userId,
					product_code: productCode,
					plan_code: planCode,
					purchased_at,
					expires_at: expiresAt,
				},
			]);

			if (error) {
				console.error("Error inserting payment record:", error);
			} else {
				console.log("Inserted payment record:", data);
			}
		}

		// Acknowledge successful processing
		return {
			status: "success",
			message: "Webhook processed successfully",
		};
	} catch (error) {
		// Log detailed error for server-side tracking
		throw createError({
			statusCode: 500,
			statusMessage: "Webhook processing failed",
			data: {
				error: error instanceof Error ? error.message : "Unknown error",
			},
		});
	}
});
