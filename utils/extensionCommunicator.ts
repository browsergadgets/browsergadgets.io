import { extensionIDsForDifferentBrowsers } from "~/data/gadgets";






export function sendMessageToExtension(browserObject, message_type, message_data){
	console.log("browserObject: ", browserObject);
	
  if (!browserObject) {
	console.log("browserObject doesn't exist, skipping messaging!");
	
		return;
	}
	const browser = detectBrowser();
	// if (browser == 'firefox' || browser == 'safari') {
	// 	console.log("Non-chromium browser detected, skipping messaging");
		
	// 	return;
	// }
	if (extensionIDsForDifferentBrowsers[browser]) {
		let extension_id = extensionIDsForDifferentBrowsers[browser];
		// Check if extension is installed
		if (browserObject && browserObject.runtime) {
			// browserObject = chrome
			console.log("Chrome runtime is available");
			browserObject.runtime.sendMessage(
				extension_id,
				{ type: message_type, data: message_data },
				(response) => {
					console.log("Response received from extension:", response);
				}
			);
		} else {
			console.log("Chrome runtime is not available");
		}
	}
}



// Listen for messages from the extension
// if (chrome && typeof chrome !== "undefined" && chrome.runtime) {
// 	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
// 		if (!sender || sender.id !== extensionId) {
// 			console.warn(
// 				"Unauthorized extension tried to send a message:",
// 				sender?.id
// 			);
// 			return sendResponse({ error: "Unauthorized extension" });
// 		}
// 		if (request.msg === "INITIAL") {
// 			sendResponse({ msg: "Hello from Browser Gadgets" });
// 		}
// 	});
// }
