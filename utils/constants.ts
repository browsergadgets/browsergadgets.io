export const baseUrl =
	process.env.NUXT_ENV === "production"
		? "https://browsergadgets.io"
		: "localhost:3000";