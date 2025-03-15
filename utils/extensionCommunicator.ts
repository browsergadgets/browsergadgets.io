import { extensionIDsForDifferentBrowsers } from "~/data/gadgets";






export function sendMessageToExtension(chromeObject, message_type, message_data){
	const browser = detectBrowser();

	if (extensionIDsForDifferentBrowsers[browser]) {
		let extension_id = extensionIDsForDifferentBrowsers[browser];
		// Check if extension is installed
		if (chromeObject && chromeObject.runtime) {
			// chromeObject = chrome
			console.log("Chrome runtime is available");
			chromeObject.runtime.sendMessage(
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
