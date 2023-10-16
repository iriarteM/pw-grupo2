import Link from "next/link";
import Head from "next/head";

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import Layout from "@/components/LayoutAdmin";
import Admins from "/administradores.json";

const Perfil = () => {
    const router = useRouter();
    const { usuario } = router.query;
    console.log(`Usuario recuperado del login: ${usuario}`);

    let adminsEncontrado = null;

    // Recorre el objeto de administradores usando forEach
    Object.keys(Admins).forEach((id) => {
        const admins = Admins[id];
        if (admins.correo === usuario) {
            adminsEncontrado = admins;
        }
    });
    console.log(
        "Administrador encontrado:",
        JSON.stringify(adminsEncontrado, null, 4)
    );

    const [state, setState] = useState( 
        { nombre : "", apellido : "", tipoDocumento : "DNI", nroDocumento : "", 
        correo : "", contraseña : ""}
        )

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
    
            const request = await fetch( '../../../api/actualizarAdmin/leer', opciones)
            let data = await request.json()
            console.log( data)
            return data
        }

        async function escribir() {
            let data = await leer()
    
            const adminIndex = data.findIndex((usuario) => usuario.nroDocumento === adminsEncontrado.nroDocumento)
    
            if(adminIndex !== -1){
                data[adminIndex] = {...data[adminIndex], ...state}
            }
    
            // Llamar a escribir
            const opciones = {
                method : 'POST',
                body : JSON.stringify( data ),
                headers : {
                    "Content-Type" : "application/json"
                }
            }
    
            const request = await fetch( '../../../api/actualizarAdmin/escribir', opciones)
            data = await request.json()
            console.log(data)
        }


    

    return (
        <Layout
            content={
                <>
                    <Head>
                        <title>Perfil</title>
                    </Head>
                    <Head>
                        <title>Login</title>
                    </Head>
                    <div className="auth-container">
                    <div className="auth-container">
                        
                        <div className="data-form">
                            <p>Si quiere cambiar sus datos tiene que modificar todas las casillas</p>
                                    <input name="nombre" type="text"
                                        placeholder="Nombre"
                                        onChange={mngmtChange}
                                        value={state.nombre}
                                        className="input-data"
                                    />
                                    <input name="apellido" type="text"
                                        placeholder="apellido"
                                        onChange={mngmtChange}
                                        value={state.apellidos}
                                        className="input-data"
                                    />
                                    <select name="tipoDocumento"
                                        placeholder="DNI, Pasarporte, Otros"
                                        onChange={mngmtChange}
                                        value={state.tipoDocumento}
                                        className="input-data">
                                        <option value="dni">DNI</option>
                                        <option value="pasaporte">Pasaporte</option>
                                        <option value="otros">Otros</option></select>
                                    <input name="nroDocumento" type="text"
                                        placeholder="N° de documento elegido"
                                        onChange={mngmtChange}
                                        value={state.nroDocumento}
                                        className="input-data"
                                    />
                                    <input name="correo" type="text"
                                        placeholder="Correo"
                                        onChange={mngmtChange}
                                        value={state.correo}
                                        className="input-data"
                                    />
                                    <input name="contraseña" type="password"
                                        placeholder="Contraseña"
                                        onChange={mngmtChange}
                                        value={state.contraseña}
                                        className="input-data"
                                    />
                                    <button type="button" className="save-btn" onClick={escribir}>
                                        Modificar
                                    </button>
                            </div>
                    </div>
                    </div>

                </>
            }
        />
    );
};

export default Perfil;
