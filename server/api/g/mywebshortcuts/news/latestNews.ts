export default defineEventHandler(async () => {
	try {
		const response = await $fetch(
			"https://api.github.com/repos/browsergadgets/news/contents/mywebshortcuts/latestNews.json"
		);

		// Decode the Base64-encoded content
		const decodedContent = atob(response.content);
		const jsonData = JSON.parse(decodedContent);

		// Return the fetched JSON data
		return jsonData;
	} catch (error) {
		console.error("Error fetching JSON:", error);
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to fetch data",
		});
	}
});
