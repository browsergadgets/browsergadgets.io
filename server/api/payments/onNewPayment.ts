import { serverSupabaseClient } from "#supabase/server";
import { logMessage } from "~/utils/logger";

export default defineEventHandler(async (event) => {
	try {
		const paymentId = getQuery(event).payment_id;
		if (!paymentId) {
			logMessage("warn", "No payment ID provided in request");
			throw createError({
				statusCode: 400,
				statusMessage: "Missing payment ID",
			});
		}

		logMessage("info", "🔍 Checking payment in Supabase", { paymentId });

		const supabase = await serverSupabaseClient(event);

		// ✅ FIX: Ensure correct column name and log response
		const { data, error } = await supabase
			.from("user_purchases")
			.select("*") // Fetch full record for debugging
			.eq("id", paymentId) // ✅ FIX: Use correct column name
			.maybeSingle();

		if (error) {
			logMessage("error", "❌ Supabase query failed", { error: error.message });
			throw createError({ statusCode: 500, statusMessage: "Database error" });
		}

		logMessage("info", "🔎 Payment lookup result", { paymentId, data });

		if (data) {
			return { exists: true, details: data };
		} else {
			logMessage("warn", "⚠️ Payment ID not found in database", { paymentId });
			return { exists: false };
		}
	} catch (error) {
		logMessage("error", "❌ Error in verify API", { error: error.message });
		return { exists: false, error: error.message };
	}
});
