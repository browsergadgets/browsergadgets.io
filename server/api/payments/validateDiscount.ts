import { defineEventHandler } from "h3";
import DodoPayments from "dodopayments";
const config = useRuntimeConfig();

export default defineEventHandler(async () => {

		const client = new DodoPayments({
			bearerToken: process.env["DODO_PAYMENTS_API_KEY"], // This is the default and can be omitted
		});

		async function main() {
			const discount = await client.discounts.retrieve("discount_id");
		}

		main();
    
    try {
        const licenseKeys = await client.licenseKeys.list();
        return { success: true, licenseKeys };
    } catch (error) {
        return { success: false, error: error.message };
    }
});