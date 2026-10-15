const OLLAMA_LOCAL = 'http://localhost:11434'
const OLLAMA_SERVER = 'http://192.168.1.131:11434'
let DEFAULT_BASE_URL = OLLAMA_LOCAL


export function setHost(url) {
    DEFAULT_BASE_URL = url
}

export function getHost(type) {
    switch (type) {
        case 'URL_MODELS': return DEFAULT_BASE_URL + '/api/tags'
        case 'URL_GENERATE': return DEFAULT_BASE_URL + '/api/generate'
        case 'URL_LOADED_MODELS': return DEFAULT_BASE_URL + '/api/ps'
        case 'URL_CHAT': return DEFAULT_BASE_URL + '/api/chat'
        default: return DEFAULT_BASE_URL
    }
}

export async function isRun() {
    try {
        const response = await fetch(DEFAULT_BASE_URL, { method: 'GET' })
        return response.ok
    } catch(err) {
        throw err
    }
}

export async function ask(prompt, model) {
    try {
        const response = await fetch(getHost('URL_GENERATE'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model,
                prompt,
                stream: false
            })
        });

        const data = await response.json();
        return data.response;
    } catch(err) {
        throw err
    }
    
}

export async function listModels() {
    try {
        const response = await fetch(getHost('URL_MODELS'), { method: 'GET' })
        const data = await response.json()
        return data.models
    } catch(err) {
        throw err
    }
}

export async function loadedModels() {
    try {
        const response = await fetch(getHost('URL_LOADED_MODELS'), { method: 'GET' })
        const data = await response.json()
        return data.models
    } catch(err) {
        throw err
    }
}

export async function chat(model, messages, { format, options, keepAlive } = {}) {
/*
messages: [{
    role: 'system', 'user', 'assistant' o 'tool'.
    content: El texto del mensaje.
    images (opcional): Array de imágenes codificadas en base64 (para modelos multimodales).
    tool_calls (opcional): Array de llamadas a herramientas devueltas previa o manualmente por el asistente.
}]
*/
    try {
        const response = await fetch(getHost('URL_CHAT'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            model,
            messages,
            stream: false,
            ...(format && { format }),
            ...(options && { options }),
            ...(keepAlive !== undefined && { keep_alive: keepAlive })
            })
        });

        const data = await response.json();
        return data.message;
    } catch(err) {
        throw err
    }
}

export default { 
    ask, listModels, loadedModels, isRun, chat,
    setHost, getHost
}