import { Logtail } from "@logtail/node";

// Load Logtail Source Token from environment variables
const LOGTAIL_SOURCE_TOKEN = process.env.LOGTAIL_SOURCE_TOKEN || "";
const LOGTAIL_INGESTING_HOST = process.env.LOGTAIL_INGESTING_HOST || "";

// Initialize Logtail client for production only
const logtail = LOGTAIL_SOURCE_TOKEN
	? new Logtail(LOGTAIL_SOURCE_TOKEN, {
			endpoint: `https://${LOGTAIL_INGESTING_HOST}`,
	  })
	: null;

// Universal logging function
export function logMessage(
	level: "info" | "warn" | "error",
	message: string,
	data: Record<string, any> = {}
) {
	// if (process.env.NODE_ENV === "production") {
	if (process.env.NUXT_ENV === "production") {
		// Log to Logtail in production
		logtail?.[level](message, data);
		logtail?.flush(); // Ensure logs are sent
	} else {
		// Log to console in development
		console[level](`[${level.toUpperCase()}] ${message}`, data);
	}
}
