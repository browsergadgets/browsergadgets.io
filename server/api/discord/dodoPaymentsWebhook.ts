import { Webhook } from "standardwebhooks";

interface WebhookEventData {
	type: string;
	data: any;
	id?: string;
}

const formatDiscordMessage = (event: WebhookEventData) => {
	const { type, data, id } = event;

	// Helper function to format amount
	const formatAmount = (amount: number, currency: string) =>
		`${(amount / 100).toFixed(2)} ${currency}`;

	// Generate webhook log URL
	const getWebhookLogUrl = (webhookId: string) =>
		`https://app.dodopayments.com/developer/webhooks/logs/${webhookId}`;

	// Generate transaction log URL for payment events
	const getTransactionLogUrl = (paymentId: string) =>
		`https://app.dodopayments.com/transactions/payments/summary/${paymentId}`;

	// Standardize event messages
	const eventMessages = {
		// Payment Events
		"payment.succeeded": () => ({
			message: `✅ Payment Succeeded
      • Customer: ${data.customer.name}
      • Amount: ${formatAmount(data.total_amount, data.currency)}
      • Method: ${data.payment_method}
      • Webhook Log: ${getWebhookLogUrl(id || "N/A")}
      • Transaction Log: ${getTransactionLogUrl(data.payment_id)}`,
		}),

		"payment.failed": () => ({
			message: `❌ Payment Failed
      • Customer: ${data.customer.name}
      • Amount: ${formatAmount(data.total_amount, data.currency)}
      • Error: ${data.error_message || "Unknown"}
      • Webhook Log: ${getWebhookLogUrl(id || "N/A")}
      • Transaction Log: ${getTransactionLogUrl(data.payment_id)}`,
		}),

		// Subscription Events
		"subscription.active": () => ({
			message: `🔄 Subscription Activated
      • Customer: ${data.customer.name}
      • Product: ${data.product_id}
      • Billing Frequency: ${data.payment_frequency_count} ${
				data.payment_frequency_interval
			}
      • Webhook Log: ${getWebhookLogUrl(id || "N/A")}`,
		}),

		"subscription.cancelled": () => ({
			message: `❌ Subscription Cancelled
      • Customer: ${data.customer.name}
      • Product: ${data.product_id}
      • Webhook Log: ${getWebhookLogUrl(id || "N/A")}`,
		}),

		// Refund Events
		"refund.succeeded": () => ({
			message: `💸 Refund Processed
      • Amount: ${formatAmount(data.amount, data.currency)}
      • Reason: ${data.reason || "Not specified"}
      • Webhook Log: ${getWebhookLogUrl(id || "N/A")}`,
		}),

		// Dispute Events
		"dispute.opened": () => ({
			message: `⚠️ Dispute Opened
      • Amount: ${formatAmount(parseFloat(data.amount), data.currency)}
      • Stage: ${data.dispute_stage}
      • Webhook Log: ${getWebhookLogUrl(id || "N/A")}`,
		}),

		// License Key Events
		"license_key.created": () => ({
			message: `🔑 License Key Generated
      • Product: ${data.product_id}
      • Status: ${data.status}
      • Expires: ${new Date(data.expires_at).toLocaleDateString()}
      • Webhook Log: ${getWebhookLogUrl(id || "N/A")}`,
		}),

		// Fallback for unhandled events
		default: () => ({
			message: `📣 Unhandled Event: ${type}
      • Webhook Log: ${getWebhookLogUrl(id || "N/A")}`,
		}),
	};

	// Execute the appropriate message formatter
	const messageGenerator = eventMessages[type] || eventMessages.default;
	return messageGenerator();
};

// Discord webhook sender with error handling
const sendToDiscord = async (message: string) => {
	try {
		const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

		if (!discordWebhookUrl) {
			throw new Error("Discord webhook URL is not configured");
		}

		return await $fetch(discordWebhookUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				content: message,
				username: "DodoPayments Webhook",
				// avatar_url: "https://example.com/webhook-avatar.png", // Optional avatar
			}),
		});
	} catch (error) {
		console.error("Discord webhook error:", error);
		throw error;
	}
};

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
			console.error(
				"Webhook Signature Verification Failed:",
				verificationError
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
		console.log("payload", payload);
		

		try {
			// Format Discord message
			const { message } = formatDiscordMessage({
				type: payload.type,
				data: payload.data,
				id: headers["webhook-id"], // Pass webhook ID for log URL
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
			console.error("Failed to send error to Discord:", discordError);
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
