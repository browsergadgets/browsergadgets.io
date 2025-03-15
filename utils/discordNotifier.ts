export async function sendDiscordMessage(message: string) {
	const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
	if (!DISCORD_WEBHOOK_URL) return;

	await fetch(DISCORD_WEBHOOK_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ content: message }),
	});
}
