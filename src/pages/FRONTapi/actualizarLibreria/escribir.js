import fsPromises from 'fs/promises'
import path from 'path'
import process from 'process'

export default async function escribir(req, res) {
    let filePath = '/library.json'
    let ruta = path.join( process.cwd() , filePath )

    // Escritura
    try {
        let tmp = JSON.stringify(req.body)
        console.log( tmp )

        await fsPromises.writeFile( ruta, tmp )
        return res.status(200).json( { "rpta" : "Se grabo OK"} )

    } catch( error) {
        console.log("Ocurrio un error al Escribir ", {error})
    }

}