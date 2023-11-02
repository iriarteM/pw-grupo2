import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
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

    const [state, setState] = useState({
        nombre: "",
        apellido: "",
        tipoDocumento: "DNI",
        nroDocumento: "",
        correo: "",
        contraseña: "",
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
            "../../../api/actualizarAdmin/leer",
            opciones
        );
        let data = await request.json();
        console.log(data);
        return data;
    }

    async function escribir() {
        let data = await leer();

        const adminIndex = data.findIndex(
            (usuario) => usuario.nroDocumento === adminsEncontrado.nroDocumento
        );

        if (adminIndex !== -1) {
            data[adminIndex] = { ...data[adminIndex], ...state };
        }

        if (typeof data[adminIndex].imagen === undefined) {
            data[adminIndex].imagen = null;
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
            "../../../api/actualizarAdmin/escribir",
            opciones
        );
        data = await request.json();
        console.log(data);
    }

    const [guardar, setGuardar] = useState(null);

    function subirImagen(event) {
        const archivo = event.target.files[0];

        if (archivo) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const imageSrc = e.target.result;
                setGuardar(imageSrc);
            };
            reader.readAsDataURL(archivo);
        }
    }

    async function guardarImagen() {
        let data = await leer();

        const adminIndex = data.findIndex(
            (usuario) => usuario.nroDocumento === adminsEncontrado.nroDocumento
        );
        console.log(guardar);
        if (adminIndex !== -1) {
            data[adminIndex].imagen = guardar;
        }

        const opciones = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const request = await fetch(
            "../../../api/actualizarAdmin/escribir",
            opciones
        );
        data = await request.json();
        console.log(data);
    }

    async function quitarImagen() {
        let data = await leer();

        const adminIndex = data.findIndex(
            (usuario) => usuario.nroDocumento === adminsEncontrado.nroDocumento
        );
        console.log(guardar);
        if (adminIndex !== -1) {
            data[adminIndex].imagen = null;
        }

        const opciones = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const request = await fetch(
            "../../../api/actualizarAdmin/escribir",
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
                        <title>Perfil Administrador</title>
                    </Head>

                    <div className="auth-container">
                        <p>Imagen de Perfil:</p>
                        <br />
                        <p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={subirImagen}
                            />

                            {adminsEncontrado?.imagen ? (
                                <Image
                                    src={adminsEncontrado.imagen}
                                    alt="Imagen de perfil"
                                    className="imagen-de-perfil"
                                    width={100}
                                    height={100}
                                />
                            ) : (
                                <p>No hay imagen de perfil</p>
                            )}
                        </p>
                        <p>
                            {adminsEncontrado?.imagen ? (
                                <button type="button" onClick={quitarImagen}>
                                    Quitar imagen
                                </button>
                            ) : (
                                <button type="button" onClick={guardarImagen}>
                                    Guardar imagen seleccionada
                                </button>
                            )}
                        </p>
                        <br />
                        <div className="data-form">
                            <p>
                                Si quiere cambiar sus datos tiene que modificar
                                todas las casillas
                            </p>
                            <input
                                name="nombre"
                                type="text"
                                maxLength="30"
                                placeholder="Nombre"
                                onChange={mngmtChange}
                                value={state.nombre}
                                className="input-data"
                            />
                            <input
                                name="apellido"
                                type="text"
                                maxLength="30"
                                placeholder="apellido"
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
                                name="contraseña"
                                type="password"
                                maxLength="12"
                                placeholder="Contraseña"
                                onChange={mngmtChange}
                                value={state.contraseña}
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
