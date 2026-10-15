//#region src/ollama/index.js
var e = "http://localhost:11434";
function t(t) {
	e = t;
}
function n(t) {
	switch (t) {
		case "URL_MODELS": return e + "/api/tags";
		case "URL_GENERATE": return e + "/api/generate";
		case "URL_LOADED_MODELS": return e + "/api/ps";
		case "URL_CHAT": return e + "/api/chat";
		default: return e;
	}
}
async function r() {
	try {
		return (await fetch(e, { method: "GET" })).ok;
	} catch (e) {
		throw e;
	}
}
async function i(e, t) {
	try {
		return (await (await fetch(n("URL_GENERATE"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				model: t,
				prompt: e,
				stream: !1
			})
		})).json()).response;
	} catch (e) {
		throw e;
	}
}
async function a() {
	try {
		return (await (await fetch(n("URL_MODELS"), { method: "GET" })).json()).models;
	} catch (e) {
		throw e;
	}
}
async function o() {
	try {
		return (await (await fetch(n("URL_LOADED_MODELS"), { method: "GET" })).json()).models;
	} catch (e) {
		throw e;
	}
}
async function s(e, t, { format: r, options: i, keepAlive: a } = {}) {
	try {
		return (await (await fetch(n("URL_CHAT"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				model: e,
				messages: t,
				stream: !1,
				...r && { format: r },
				...i && { options: i },
				...a !== void 0 && { keep_alive: a }
			})
		})).json()).message;
	} catch (e) {
		throw e;
	}
}
var c = {
	ask: i,
	listModels: a,
	loadedModels: o,
	isRun: r,
	chat: s,
	setHost: t,
	getHost: n
};
//#endregion
export { i as ask, s as chat, n as getHost, r as isRun, a as listModels, o as loadedModels, c as ollama, t as setHost };

//# sourceMappingURL=ia-es-sdk.es.js.map