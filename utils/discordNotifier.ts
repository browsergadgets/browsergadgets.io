export const formatDiscordMessage = (event: {type: string, data: {}, id: string}) => {
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

export async function sendToDiscord(message: string) {
	try {
		const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

		if (!DISCORD_WEBHOOK_URL) {
			logMessage("error", "Discord webhook URL is not configured");
			throw new Error("Discord webhook URL is not configured");
		}

		await fetch(DISCORD_WEBHOOK_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content: message }),
		});
	} catch (error) {
		logMessage("error", "Discord webhook error:", error as any);

		throw new Error(`Failed to send Discord message: ${error}`);
	}
}
