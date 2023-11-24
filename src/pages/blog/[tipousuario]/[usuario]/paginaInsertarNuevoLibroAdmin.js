import Link from "next/link"
import Head from "next/head";
import Layout from "@/components/LayoutAdmin";
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

        const request = await fetch( '/api/recursoAgregado/libroLeer', opciones)
        data = await request.json()
        console.log( data)
        return data

    }

    async function escribir() {
        let data = await leer()

        console.log( JSON.stringify(state))
        // Llamar a escribir
        const opciones = {
            method : 'POST',
            body : JSON.stringify( state ),
            headers : {
                "Content-Type" : "application/json"
            }
        }

        const request = await fetch( '/api/recursoAgregado/libroGuardar', opciones)
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
                        type="text"
                        placeholder="Serie, Tipo"
                        name="tipo"
                        value={state.tipo}
                        onChange={mngmtChange}
                        className="campo_de_ingreso"
                        maxLength="35"
                        required
                      />
                    </div>
                  </div>
      
                  <button
                    type="button"
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