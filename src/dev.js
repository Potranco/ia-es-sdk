/**
    Archivo solo para entorno de desarrollo, no tiene salida a produccion
*/
import { ask, listModels, loadedModels, isRun, chat } from './ollama'

isRun()
    .then(console.log)
    .catch(console.error)

let loaded = await loadedModels()
console.log('Modelos cargados', loaded)

listModels()
    .then(async models => {
        if (models && models.length !== 0) {
            models.map(m => {
                console.log(m.name)
            })

            const respuesta = await ask('hola', models[0].name)
            console.log('ask', respuesta)
            const chatRes = await chat(models[0].name, [{rol: 'user', content: 'Hola'}])
            console.log('chat', chatRes)
        }
    })
    .catch(console.log)

loaded = await loadedModels()
console.log('Modelos cargados', loaded)

