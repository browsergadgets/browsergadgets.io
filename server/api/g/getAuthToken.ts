// server/api/auth-token.ts
import { getCookie } from "h3";

export default defineEventHandler(async (event) => {
	// const authToken = await getCookie(
	// 	event,
	// 	"sb-flvufljrgwryehyctetn-auth-token"
	// );
    let decodedToken;
    // const origin = getHeader(event, "x-extension-secret");
    const origin = getHeader(event, "origin");
    // if(authToken){
    //     decodedToken = JSON.parse(atob(authToken.split("base64-")[1]));
    //     console.log(decodedToken);
    // }
	return { origin, event };
});
// export default defineEventHandler(async (event) => {
// 	const allowedOrigins = [
// 		"chrome-extension://eieokkopejddkfnfioklcjabmhpbmgke",
// 	];
// 	const origin = getHeader(event, "origin");

// 	if (!allowedOrigins.includes(origin)) {
// 		throw createError({ statusCode: 403, message: origin });
// 	}

// 	return { apiKey: process.env.SUPABASE_API_KEY };
// });
