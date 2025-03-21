import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import crypto from "crypto"; // Built-in Node.js module for HMAC signing
import { logMessage } from "~/utils/logger"; // Import existing logging function

const SECRET_KEY = process.env.PREMIUM_SECRET_KEY; // Keep this secret!

export default defineEventHandler(async (event) => {
	try {
		const user = await serverSupabaseUser(event);
		if (!user) {
			logMessage("error", "Unauthorized access attempt", {
				ip: getRequestIP(event),
			});
			throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
		}

		const productCode = getQuery(event).product_code;
		if (!productCode) {
			logMessage("error", "Missing product code in request", {
				user_id: user.id,
			});
			throw createError({
				statusCode: 400,
				statusMessage: "Missing product code",
			});
		}

		const supabase = await serverSupabaseClient(event);

		// Fetch user purchase record
		const { data, error } = await supabase
			.from("user_purchases")
			.select("purchased_at, plan_code")
			.eq("user_id", user.id)
			.eq("product_code", productCode)
			.maybeSingle();

		if (error) {
			logMessage("error", "Database error while fetching user purchases", {
				user_id: user.id,
				product_code: productCode,
				error: error.message,
			});
			throw createError({ statusCode: 500, statusMessage: "Database error" });
		}

		if (!data) {
			logMessage("info", "No purchase record found", {
				user_id: user.id,
				product_code: productCode,
			});
			return {
				premium: false,
				message: "No active premium subscription found",
			};
		}

		// Generate HMAC signature (secret key + user_id + product_code + purchased_at)
		if (!SECRET_KEY) {
			logMessage("error", "SECRET_KEY is missing");
			throw createError({
				statusCode: 500,
				statusMessage: "Server misconfiguration: Missing secret key",
			});
		}

		const signature = crypto
			.createHmac("sha256", SECRET_KEY)
			.update(`${user.id}:${productCode}:${data.purchased_at}`)
			.digest("hex");

		logMessage("info", "Premium status checked successfully", {
			user_id: user.id,
			product_code: productCode,
			purchased_at: data.purchased_at,
			plan_code: data.plan_code,
			signature,
		});

		return {
			premium: true,
			user_id: user.id,
			purchased_at: data.purchased_at,
			plan_code: data.plan_code,
			signature,
		};
	} catch (error) {
		logMessage("error", "Error in checkPremium API", { error: error.message });

		// Ensure proper error response is returned
		throw createError({
			statusCode: error.statusCode || 500,
			statusMessage: error.statusMessage || "Internal Server Error",
		});
	}
});

// Utility function to get the user's IP address
const getRequestIP = (event) => {
	return (
		event.req.headers["x-forwarded-for"] || event.req.connection.remoteAddress
	);
};