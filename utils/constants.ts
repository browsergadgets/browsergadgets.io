export const baseUrl =
	process.env.NUXT_ENV == "development"
		? "localhost:3000"
		: "https://browsergadgets.io";