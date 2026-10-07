//#region src/ollama/index.js
var e = typeof process < "u" && process.env?.OLLAMA_HOST || "http://192.168.1.128:11434", t = e + "/api/tags", n = e + "/api/generate", r = e + "/api/ps", i = e + "/api/chat";
async function a() {
	try {
		return (await fetch(e, { method: "GET" })).ok;
	} catch (e) {
		throw e;
	}
}
async function o(e, t) {
	try {
		return (await (await fetch(n, {
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
async function s() {
	try {
		return (await (await fetch(t, { method: "GET" })).json()).models;
	} catch (e) {
		throw e;
	}
}
async function c() {
	try {
		return (await (await fetch(r, { method: "GET" })).json()).models;
	} catch (e) {
		throw e;
	}
}
async function l(e, t, { format: n, options: r, keepAlive: a } = {}) {
	try {
		return (await (await fetch(i, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				model: e,
				messages: t,
				stream: !1,
				...n && { format: n },
				...r && { options: r },
				...a !== void 0 && { keep_alive: a }
			})
		})).json()).message;
	} catch (e) {
		throw e;
	}
}
var u = {
	ask: o,
	listModels: s,
	loadedModels: c,
	isRun: a,
	chat: l
};
//#endregion
export { o as ask, l as chat, a as isRun, s as listModels, c as loadedModels, u as ollama };

//# sourceMappingURL=ia-es-sdk.es.js.map