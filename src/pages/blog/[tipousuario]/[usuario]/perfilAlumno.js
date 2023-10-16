import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Layout from "@/components/LayoutUsuario";
import Alumno from "/usuarios.json";

const Perfil = () => {
    const router = useRouter();
    const { usuario } = router.query;
    console.log(`Usuario recuperado del login: ${usuario}`);

    let alumnoEncontrado = null;

    // Recorre el objeto de alumnos usando forEach
    Object.keys(Alumno).forEach((id) => {
        const alumno = Alumno[id];
        if (alumno.correo === usuario) {
            alumnoEncontrado = alumno;
        }
    });
    console.log(
        "Alumno encontrado:",
        JSON.stringify(alumnoEncontrado, null, 4)
    );

    const [state, setState] = useState({
        nombres: "",
        apellidos: "",
        tipoDocumento: "DNI",
        nroDocumento: "",
        correo: "",
        password: "",
    });

    function mngmtChange(e) {
        console.log(e.target.name, e.target.value);
        setState({ ...state, [e.target.name]: e.target.value });
    }

    async function leer() {
        const opciones = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const request = await fetch(
            "../../../api/actualizarAlumno/leer",
            opciones
        );
        let data = await request.json();
        console.log(data);
        return data;
    }

    async function escribir() {
        let data = await leer();

        const usuarioIndex = data.findIndex(
            (usuario) => usuario.nroDocumento === alumnoEncontrado.nroDocumento
        );

        if (usuarioIndex !== -1) {
            data[usuarioIndex] = { ...data[usuarioIndex], ...state };
        }

        // Llamar a escribir
        const opciones = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const request = await fetch(
            "../../../api/actualizarAlumno/escribir",
            opciones
        );
        data = await request.json();
        console.log(data);
    }

    return (
        <Layout
            content={
                <>
                    <Head>
                        <title>Perfil Usuario</title>
                    </Head>
                    <div className="auth-container">
                        <div className="data-form">
                            <p>
                                Si quiere cambiar sus datos tiene que modificar
                                todas las casillas
                            </p>
                            <input
                                name="nombres"
                                type="text"
                                maxLength="30"
                                placeholder="Nombre"
                                onChange={mngmtChange}
                                value={state.nombres}
                                className="input-data"
                            />
                            <input
                                name="apellidos"
                                type="text"
                                maxLength="30"
                                placeholder="Apellidos"
                                onChange={mngmtChange}
                                value={state.apellidos}
                                className="input-data"
                            />
                            <select
                                name="tipoDocumento"
                                placeholder="DNI, Pasarporte, Otros"
                                onChange={mngmtChange}
                                value={state.tipoDocumento}
                                className="input-data"
                            >
                                <option value="dni">DNI</option>
                                <option value="pasaporte">Pasaporte</option>
                                <option value="otros">Otros</option>
                            </select>
                            <input
                                name="nroDocumento"
                                type="text"
                                maxLength="8"
                                placeholder="N° de documento elegido"
                                onChange={mngmtChange}
                                value={state.nroDocumento}
                                className="input-data"
                            />
                            <input
                                name="correo"
                                type="text"
                                maxLength="35"
                                placeholder="Correo"
                                onChange={mngmtChange}
                                value={state.correo}
                                className="input-data"
                            />
                            <input
                                name="password"
                                type="password"
                                maxLength="12"
                                placeholder="Contraseña"
                                onChange={mngmtChange}
                                value={state.password}
                                className="input-data"
                            />
                            <button
                                type="button"
                                className="save-btn"
                                onClick={escribir}
                            >
                                Modificar
                            </button>
                        </div>
                    </div>
                </>
            }
        />
    );
};

export default Perfil;
