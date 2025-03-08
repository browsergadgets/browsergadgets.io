export function detectBrowser(): string | null {
	const userAgent = navigator.userAgent.toLowerCase();

	if (userAgent.includes("opr") || userAgent.includes("opera")) return "opera";
	if (userAgent.includes("edg")) return "microsoft-edge";
	if (userAgent.includes("firefox")) return "firefox";
	if (userAgent.includes("safari") && !userAgent.includes("chrome"))
		return "safari";
	if (userAgent.includes("chrome")) {
		// ✅ Detect Brave using feature detection (Brave hides its userAgent)
		if (navigator.brave !== undefined) return "brave";
		return "Google Chrome";
	}

	return null;
}
