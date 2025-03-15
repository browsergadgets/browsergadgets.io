import crypto from "crypto";
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

const SECRET_KEY = process.env.PREMIUM_SECRET_KEY;

export default defineEventHandler(async (event) => {
	try {
		const user = await serverSupabaseUser(event);
		if (!user) return null;

		const { user_id, product_code, purchased_at, signature } = await readBody(
			event
		);
		if (user.id !== user_id) {
			console.log("Different User IDs");
            
            return null;
		}

		if (!user_id || !product_code || !purchased_at || !signature) {
			return null;
		}

		// Recreate the signature using the same logic
		const expectedSignature = crypto
			.createHmac("sha256", SECRET_KEY)
			.update(`${user_id}:${product_code}:${purchased_at}`)
			.digest("hex");

		// Compare signatures
		if (signature === expectedSignature) {
			return { valid: true };
		} else {
			return { valid: false };
		}
	} catch (error) {
		console.error("Error in verifyPremium API:", error);
		return null;
	}
});
