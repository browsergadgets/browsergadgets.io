export default defineEventHandler(async (event) => {
	try {
		const query = getQuery(event);
		const gadgetName = query?.gadgetName;
		const infoType = query?.type;

		let url;
		switch (infoType) {
			case "latestNewsDate":
				url = `https://api.github.com/repos/browsergadgets/news/contents/${gadgetName}/latestData.json`;
				break;
			case "latestNews":
				url = `https://api.github.com/repos/browsergadgets/news/contents/${gadgetName}/latestNews.json`;
				break;

			default:
				break;
		}
		if (!url) {
			throw new Error("Invalid parameters");
		}
		const response = await $fetch(url);

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
