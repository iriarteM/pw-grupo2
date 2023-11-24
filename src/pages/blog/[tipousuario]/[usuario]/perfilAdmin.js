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

    let [adminsEncontrado, setAdminsEncontrado] = useState(null);

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
            "/api/perfilActualizado/adminLeer",
            opciones
        );
        let data = await request.json();
        console.log(data);

        return data;
    }

    async function escribir() {
        let data = await leer();


        // Llamar a escribir
        const opciones = {
            method: "PUT",
            body: JSON.stringify(state),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const request = await fetch(
            "/api/perfilActualizado/adminActualizar",
            opciones
        );
        data = await request.json();
        setAdminsEncontrado = data
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
            (usuario) => usuario.id === 100
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
            "/api/perfilActualizado/adminActualizar",
            opciones
        );
        data = await request.json();
        console.log(data);
    }

    async function quitarImagen() {
        let data = await leer();

        const adminIndex = data.findIndex(
            (usuario) => usuario.id === 100
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
            "/api/perfilActualizado/adminActualizar",
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
                    <div className="contenedor_mayor">
                        <div className="auth-container">
                            <h1 className="titulo-perfil">PERFIL:</h1>
                            
                            <br />
                            <div className="data-form">
                                <p>
                                    Si quiere cambiar sus datos tiene que
                                    modificar todas las casillas
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
                                    placeholder="Apellido"
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
                                    placeholder="N° de Documento Elegido"
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
                            <div className="seccion-imagen">
                            <input
                                    type="file"
                                    id="cargarImagen"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={subirImagen}
                                />
                                <label htmlFor="cargarImagen">
                                    Cargar Imagen
                                </label>
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
                                <p>
                                {adminsEncontrado?.imagen ? (
                                    <button
                                        type="button"
                                        onClick={quitarImagen}
                                    >
                                        Quitar imagen
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={guardarImagen}
                                    >
                                        Guardar imagen seleccionada
                                    </button>
                                )}
                            </p>
                            </div>
                    </div>
                    
                </>
            }
        />
    );
};

export default Perfil;
