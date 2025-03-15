import { defineEventHandler } from "h3";
import DodoPayments from "dodopayments";
import { CountryCode } from "dodopayments/resources/misc/supported-countries.mjs";
import { Customer } from "dodopayments/resources/index.mjs";
import { CustomerCreateParams } from "dodopayments/src/resources/index.js";

export default defineEventHandler(async (event) => {
	try {
		const client = new DodoPayments({
			environment: "test_mode",
			bearerToken: process.env["DODO_PAYMENTS_API_KEY"], // This is the default and can be omitted
		});

		const query = getQuery(event);
		const city = query.city as string;
		const country = query.country as CountryCode;
		const state = query.state as string;
		const street = query.street as string;
		const zipcode = query.zipcode as string;
		const email = query.email as string;
		const name = query.name as string;
		const customer_id = query?.customer_id as string;
		const product_id = query.product_id as string;
		const product_code = query.product_code as string;
		const discount_code = query.discount_code as string;
		const plan_code = query.plan_code as string;
		const supabase_user_id = query.supabase_user_id as string;
		const return_url = query.return_url as string;

		let customer:
			| CustomerCreateParams
			| { customer_id: Customer["customer_id"] };
		if (customer_id) {
			customer = {
				customer_id,
			} as { customer_id: Customer["customer_id"] };
		} else {
			customer = {
				email,
				name,
				create_new_customer: false, // in case the email exists already then the existing customer object will be used and that customer_id will be returned, this will prevent the cases of same email order
			} as CustomerCreateParams;
		}

		// console.log("customer object", customer);
		

		let billing = {
			city,
			country,
			state,
			street,
			zipcode,
		};

		let paymentBody = {
			billing,
			customer,
			payment_link: true,
			return_url: return_url,
			product_cart: [{ product_id, quantity: 1 }],
			metadata: {
				supabase_user_id,
				product_code,
				plan_code,
			},
		};

		// console.log("paymentBody", paymentBody);
		
		if (discount_code) {
			// paymentBody.discount_code = discount_code;
		}

		let payment;
		const createOneTimePayment = async () => {
			payment = await client.payments.create(paymentBody);
		};

		await createOneTimePayment();

		return payment;
	} catch (error) {
		 throw createError({error, message:error.message});
	}
});
