export default defineNuxtRouteMiddleware((to, from) => {
	const user = useSupabaseUser();

	if (!user.value) {
		if (to.path === "/profile") {
			return navigateTo("/");
		}
		if (to.path === "/signup") {
			return navigateTo("/auth/signup");
		}
		if (to.path === "/login") {
			return navigateTo("/auth/login");
		}
	} else {
		if (to.path === "/auth/login" || to.path === "/auth/signup") {
			return navigateTo("/profile");
		}
	}
});
