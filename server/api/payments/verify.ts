import { serverSupabaseClient } from "#supabase/server";
import { logMessage } from "~/utils/logger"; // Assuming you're using Logtail or console logs

export default defineEventHandler(async (event) => {
	try {
		// Extract payment_id from query params
		const query = getQuery(event);
		const paymentId = query.payment_id as string;

		logMessage("info", "Received payment verification request", { paymentId });

		if (!paymentId) {
			logMessage("error", "Missing payment_id in request");
			throw createError({
				statusCode: 400,
				statusMessage: "Missing payment_id",
			});
		}

		// Initialize Supabase client
		const supabase = await serverSupabaseClient(event);

		// Check if the payment exists
		const { data, error } = await supabase
			.from("user_purchases")
			.select("*") // Selecting all fields for debugging
			.eq("id", paymentId)
			.maybeSingle();

		if (error) {
			logMessage("error", "Database error while verifying payment", {
				paymentId,
				error: error.message,
			});
			throw createError({
				statusCode: 500,
				statusMessage: "Database query failed",
			});
		}

		logMessage("info", "Payment lookup result", { paymentId, data });

		if (!data) {
			logMessage("warn", "Payment ID not found in database", { paymentId });
			return { success: false, exists: false };
		}

		logMessage("success", "Payment ID found in database", { paymentId });
		return { success: true, exists: true, paymentData: data };
	} catch (error) {
		logMessage("error", "Error in verify payment API", {
			error: error.message,
		});
		return { success: false, error: error.message };
	}
});
