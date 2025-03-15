export default defineEventHandler(async (event) => {
	const rawBody = await readRawBody(event);
	const headers = getHeaders(event);

	console.log("DEBUG - Raw Headers:", JSON.stringify(headers));
	console.log("DEBUG - Raw Body:", rawBody?.toString());

	return {
		status: "debug",
		headers: headers,
		body: rawBody?.toString(),
	};
});
