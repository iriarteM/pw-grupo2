import Link from "next/link"
import Head from "next/head";
import Layout from "@/components/LayoutAdmin";
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage.external.js";
import { useState } from 'react'

const Formulario = () => {

    const [state, setState] = useState( 
        { titulo : "", autor : "", isbn : "", tipo : "", id:""}
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

    async function eliminar() {
      let data = await leer()

      console.log( JSON.stringify(state))
      // Llamar a escribir
      const opciones = {
          method : 'DELETE',
          body : JSON.stringify( state ),
          headers : {
              "Content-Type" : "application/json"
          }
      }

      const request = await fetch( '/api/recursoAgregado/libroEliminar', opciones)
      data = await request.json()
      console.log( data)

  }

  async function modificar() {
    let data = await leer()

    console.log( JSON.stringify(state))
    // Llamar a escribir
    const opciones = {
        method : 'PUT',
        body : JSON.stringify( state ),
        headers : {
            "Content-Type" : "application/json"
        }
    }

    const request = await fetch( '/api/recursoAgregado/libroModificar', opciones)
    data = await request.json()
    console.log( data)

}

    return (    
        <>
            <div className="interconexion">
                <form action="" className="formulario_de_conexion">
                  <h1 className="titulo_de_acceso">
                    Adición de nuevo recurso
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

                  <div>
                    <p>De querer eliminar el recurso ingresado por el formulario, presione "ELIMINAR"</p>
                    <button
                    type="button"
                    onClick={eliminar}
                  >
                    ELIMINAR
                  </button>
                  </div>
                  <div>
                  <p>Si quieres modificar un libro con los datos ingresados, escribe el ID del libro y presione el boton "MODIFICAR"</p>
                  <input
                        type="text"
                        placeholder="ID"
                        name="id"
                        value={state.id}
                        onChange={mngmtChange}
                        className="campo_de_ingreso"
                        style={{
                          border: '1px solid #ccc',}}
                        maxLength="35"
                        required
                      />
                  <button
                    type="button"
                    onClick={modificar}
                  >
                    MODIFICAR
                  </button>
                  </div>
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