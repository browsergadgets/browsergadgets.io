import { gadgetsData } from "~/data/gadgets";

export default defineEventHandler(async (event) => {
	// ✅ Get the gadget name from the query parameters
	const query = getQuery(event);
	const gadgetName = query.name;

	// ✅ Check if the gadget exists
	if (!gadgetName || !gadgetsData[gadgetName]) {
		throw createError({ statusCode: 404, statusMessage: "Gadget not found" });
	}

	// ✅ Return the gadget data
	return gadgetsData[gadgetName];
});
