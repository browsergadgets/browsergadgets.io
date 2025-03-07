export default defineNuxtRouteMiddleware((to, from) => {
	const user = useSupabaseUser();

	if (!user.value && to.path === "/profile") {
		navigateTo("/");
	} else if (user.value && to.path === "/auth/login" || to.path === "/auth/signup") {
		navigateTo("/profile");
	}
});
