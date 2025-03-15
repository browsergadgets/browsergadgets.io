import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const supabase = serverSupabaseClient(event);
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return false;

	return {
		full_name: user.user_metadata?.full_name || "User",
		email: user.email,
	};
});
