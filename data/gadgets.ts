export const gadgetsData = {
	mywebshortcuts: {
		name: "My Web Shortcuts",
		tagline: "Create Keyboard Shortcuts to interact with websites",
		keywords:
			"chrome extension, click on element chrome extension, autoclicker extension, keyboard shortcuts chrome extension, chrome extension to create keyboard shortcuts, custom keyboard shortcut, custom keyboard shortcuts in browser",
		shortDescription:
			"An extension to create keyboard shortcuts on websites to click on elements. This lets you save time and effort and improves your browsing experience.",
		description: `Create custom keyboard shortcuts to access the web, and be more productive!

    Introducing My Web Shortcuts 🌏💻 — your new best friend for browsing!

    A cool free & open-source extension that lets you create your own keyboard shortcuts for any website. No more endless clicking around; now you can do actions or click things using simple keyboard strokes. 😉

    You can set up shortcuts for your favourite tasks, making browsing faster and way more convenient. Skip the hassle, forget hunting for elements and jump straight to what you need with just a tap of a key. ⚡

    Get ready to take control of your browsing with My Web Shortcuts—it's all about making your online journey smoother and simpler. 🌾🎐`,
		showImageCount: 5,
		userCount: 1078,
		avgRating: 4.2,
		supportedBrowsers: ["chrome", "brave"],
		storeURLs: {
			chromeWebStore:
				"https://chromewebstore.google.com/detail/my-web-shortcuts/eieokkopejddkfnfioklcjabmhpbmgke",
			msEdgeAddons:
				"https://microsoftedge.microsoft.com/addons/detail/my-web-shortcuts/npnjcbppikoclgpnnjebolaeclbgfhdf",
			firefoxAddons: "",
			operaAddons: "",
		},
		extensionIDsOnStores: {
			chromeWebstore: "eieokkopejddkfnfioklcjabmhpbmgke",
			msEdgeAddons: "npnjcbppikoclgpnnjebolaeclbgfhdf",
			firefoxAddons: "",
			operaAddons: "",
		},
		theme: {
			bgColor: {
				dark: "#262626",
				light: "#c0d3d8",
			},
			primaryColor: {
				light: "#54b948",
				medium: "#54b948",
				dark: "#49a942",
			},
			secondaryColor: {
				light: "#cceaee",
				medium: "#7ed0e0",
				dark: "#26bcd6",
			},
		},
		plans: [
			{
				code: "free",
				name: "Regular Pack 😇",
				price: "Free Forever",
				tagline:
					"For normal users who are satisfied with simple single element shortcuts",
				features: [
					"Unlimited Single Element Shortcuts",
					"Smooth Element Selector with useful options",
					"Easy Shortcuts Management",
					"Import/Export Shortcuts",
				],
			},
			{
				code: "powerPack",
				name: "Power Pack ⚡",
				price: "$49.99/lifetime",
				dodoProductId: "pdt_o7QY5maK0jhm6CwvR4acc",
				tagline:
					"For Power Users who need quicker web navigation and improved browsing experience",
				features: [
					"Everything in Regular pack",
					"Similar & Multiple Element Selection Functionality",
					"Unlimited Single, Multiple, and Similar Element Shortcuts",
					"Custom Regex URLs",
					"Action Conditionals",
					"Added Actions - Scroll to element, cycle through elements, etc.",
					"Live Support",
					"More to come!",
				],
			},
			// {
			// 	code: 'proSubscriber',
			// 	name: "Pro Subscriber 🔥",
			// 	price: "$2.99/month",
			// 	tagline:
			// 		"For Users who need all the power pack features but for limited time",
			// 	features: [
			// 		"Everything in Regular and Power pack",
			// 		"Sync shortcuts across browsers and devices seamlessly (Not available yet, coming soon)",
			// 	],
			// },
		],
	},
};

// Available values and formats
// supportedBrowsers: ["chrome", "brave", "firefox", "opera", "arc", "safari"]



export const extensionIDsForDifferentBrowsers = {
	chrome: "eieokkopejddkfnfioklcjabmhpbmgke",
	"microsoft-edge": "npnjcbppikoclgpnnjebolaeclbgfhdf",
	brave: "eieokkopejddkfnfioklcjabmhpbmgke",
	opera: "eieokkopejddkfnfioklcjabmhpbmgke",
	arc: "eieokkopejddkfnfioklcjabmhpbmgke",
	safari: "",
	firefox: "",
};