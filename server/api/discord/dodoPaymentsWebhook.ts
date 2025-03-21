import { Webhook } from "standardwebhooks";
import { formatDiscordMessage, sendToDiscord } from "~/utils/discordNotifier";
import { logMessage } from "~/utils/logger";

export default defineEventHandler(async (event) => {
	try {
		// Read raw body
		const rawBody = await readRawBody(event);

		// Get headers
		const headers = getHeaders(event);

		// Verify webhook signature using standardwebhooks
		const webhook = new Webhook(process.env.DODO_WEBHOOK_SECRET || "");

		try {
			webhook.verify(rawBody || "", headers);
		} catch (verificationError) {
			logMessage(
				"error",
				"Webhook Signature Verification Failed: ",
				verificationError as any
			);

			// Send error to Discord
			await sendToDiscord(`❌ Webhook Verification Failed
      • Error: ${
				verificationError instanceof Error
					? verificationError.message
					: "Unknown error"
			}`);

			throw createError({
				statusCode: 401,
				statusMessage: "Unauthorized: Invalid webhook signature",
			});
		}

		// Parse webhook payload
		const payload = await readBody(event);
		logMessage("info", "payload", payload);

		try {
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

		// Acknowledge successful processing
		return {
			status: "success",
			message: "Webhook processed successfully",
		};
	} catch (error) {
		// Send any unhandled error to Discord
		try {
			await sendToDiscord(`❌ Unhandled Webhook Processing Error
      • Error: ${error instanceof Error ? error.message : "Unknown error"}`);
		} catch (discordError) {
			logMessage(
				"error",
				"Failed to send error to Discord:",
				discordError as any
			);
		}

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
