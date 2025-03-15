export default defineEventHandler(async (event) => {
	const { pathname } = getRequestURL(event);

	const protectectedEnpoints = [""];
	if (protectectedEnpoints.includes(pathname)) {
		console.log("protected endpoint called!");
	}
	// return true
});
