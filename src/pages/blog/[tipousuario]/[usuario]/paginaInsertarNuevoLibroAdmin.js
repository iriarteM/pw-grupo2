import Link from "next/link"
import Head from "next/head";
import Layout from "@/components/LayoutUsuario";
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage.external.js";
import { useState } from 'react'

const Formulario = () => {

    const [state, setState] = useState( 
        { titulo : "", autor : "", isbn : "", tipo : "",}
        )

    var data

    function mngmtChange(e){
        console.log( e.target.name , e.target.value)
        setState( {...state, [e.target.name]  : e.target.value })
    }

    async function leer() {
        const opciones = {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json"
            }
        }

        const request = await fetch( '../../api/actualizarLibreria/leer', opciones)
        data = await request.json()
        console.log( data)
        return data

    }

    async function escribir() {
        let data = await leer()
        // Buscar el mayor ID
        let mayor = 0
        data.forEach(element => {
            let id = parseInt( element["id"] )
            if ( id > mayor ) {
                mayor = id
            }
        });
        // sumar 1
        mayor = mayor + 1
        
        // Generar nuevo objeto JSON de Formulario
        const obj = {
            titulo: state.titulo,
            autor: state.autor,
            isbn: state.isbn,
            tipo: state.tipo
        }


        // Agregar al arreglo JSON
        data.push( obj)

        console.log( JSON.stringify(data))
        // Llamar a escribir
        const opciones = {
            method : 'POST',
            body : JSON.stringify( data ),
            headers : {
                "Content-Type" : "application/json"
            }
        }

        const request = await fetch( '../../api/actualizarLibreria/escribir', opciones)
        data = await request.json()
        console.log( data)

    }

    return (    
        <>
            <div className="interconexion">
                <form action="" className="formulario_de_conexion">
                  <h1 className="titulo_de_acceso">
                    Adicion de nuevo recurso
                  </h1>
                  <div className="campos_de_ingreso">
                    <div className="contenedor_de_conexion">
                      <input
                        type="text"
                        placeholder="Título"
                        name="titulo"
                        value={state.titulo}
                        onChange={mngmtChange}
                        className="campo_de_ingreso"
                        maxLength="35"
                        required
                      />
                    </div>
                    <div className="contenedor_de_conexion">
                      <input
                        type="text"
                        placeholder="Autor"
                        name="autor"
                        value={state.autor}
                        onChange={mngmtChange}
                        className="campo_de_ingreso"
                        maxLength="35"
                        required
                      />
                    </div>
                    <div className="contenedor_de_conexion">
                      <input
                        type="text"
                        placeholder="ISBN"
                        name="isbn"
                        value={state.isbn}
                        onChange={mngmtChange}
                        className="campo_de_ingreso"
                        maxLength="35"
                        required
                      />
                    </div>
      
                    <div className="contenedor_de_conexion">
                      <input
                        id="input4"
                        type="text"
                        placeholder="Serie, Tipo"
                        name="serieTipo"
                        value={state.serieTipo}
                        onChange={mngmtChange}
                        className="campo_de_ingreso"
                        maxLength="35"
                        required
                      />
                    </div>
                  </div>
      
                  <button
                    type="submit"
                    className="boton_de_ingreso"
                    onClick={escribir}
                  >
                    Guardar
                  </button>
                </form>
              </div>
        </>
    )
}

const ingresarLibro = () => {
    return (<Layout content={
        <>        
            <Head>
                <title>Sistema de biblioteca</title>
            </Head>
            <Formulario />
        </>
    }
    ></Layout>
    )
}

export default ingresarLibro 