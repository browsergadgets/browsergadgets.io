import { gadgetsData } from "~/data/gadgets";
import { detectBrowser } from "#imports";


// Detect Browser
// Get the appribrowser specific 


// The ID of the extension we want to talk to.
const editorExtensionId = "eieokkopejddkfnfioklcjabmhpbmgke";
console.log("Editor Extension ID:", editorExtensionId);

// Check if extension is installed
if (chrome && chrome.runtime) {
	console.log("Chrome runtime is available");

	// Make a request:
	chrome.runtime.sendMessage(
		editorExtensionId,
		{
			msg: "Hello from Browser Gadgets",
		},
		(response) => {
			console.log("Response received from extension:", response);
		}
	);
} else {
	console.log("Chrome runtime is not available");
}
