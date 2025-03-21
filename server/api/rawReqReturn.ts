import { Webhook } from "standardwebhooks";

export default defineEventHandler(async (event) => {
	const rawBody = await readRawBody(event);
	const headers = getHeaders(event);

	console.log("DEBUG - Raw Headers:", JSON.stringify(headers));
	console.log("DEBUG - Raw Body:", rawBody?.toString());

	// Verify webhook signature using standardwebhooks
	const webhook = new Webhook(process.env.DODO_WEBHOOK_SECRET || "");

	try {
		webhook.verify(rawBody || "", headers);
		return {
			status: "success",
			headers: headers,
			body: rawBody?.toString(),
		};
	} catch (error) {
		console.error("Webhook Signature Verification Failed:", error);

		throw createError({
			statusCode: 401,
			statusMessage: "Unauthorized: Invalid webhook signature",
		});
	}

	return {
		status: "debug",
		headers: headers,
		body: rawBody?.toString(),
	};
});
