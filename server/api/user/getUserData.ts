import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
	try {
		const user = await serverSupabaseUser(event);

		// console.log("user: ", user);

		if (!user) return null;

		return {
			full_name: user.user_metadata?.full_name,
			email: user.email,
		};
	} catch (error) {
		return null;
	}
});
