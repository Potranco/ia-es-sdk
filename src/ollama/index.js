const OLLAMA_LOCAL = 'http://localhost:11434'
const OLLAMA_SERVER = 'http://192.168.1.128:11434'
const DEFAULT_BASE_URL = 
  (typeof process !== 'undefined' && process.env?.OLLAMA_HOST) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_OLLAMA_HOST) ||
  OLLAMA_SERVER

const URL_MODELS = DEFAULT_BASE_URL + '/api/tags'
const URL_GENERATE = DEFAULT_BASE_URL + '/api/generate'
const URL_LOADED_MODELS = DEFAULT_BASE_URL + '/api/ps'
const URL_CHAT = DEFAULT_BASE_URL + '/api/chat'

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
        const response = await fetch(URL_GENERATE, {
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
        const response = await fetch(URL_MODELS, { method: 'GET' })
        const data = await response.json()
        return data.models
    } catch(err) {
        throw err
    }
}

export async function loadedModels() {
    try {
        const response = await fetch(URL_LOADED_MODELS, { method: 'GET' })
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
        const response = await fetch(URL_CHAT, {
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
    ask, listModels, loadedModels, isRun, chat 
}