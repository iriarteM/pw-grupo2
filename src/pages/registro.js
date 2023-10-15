import Link from "next/link";
import Head from "next/head";
import { useState } from "react";

const Registro = () => {
    const [valido, setValido] = useState(true);
    const [state, setState] = useState({
        nombres: "",
        apellidos: "",
        tipoDocumento: "",
        nroDocumento: "",
        correo: "",
        password: "",
        repetirPassword: "",
    });

    function mngmtChange(e) {
        console.log(e.target.name, e.target.value);
        setState({ ...state, [e.target.name]: e.target.value });
    }

    async function mngmtSubmit(e) {
        e.preventDefault();

        if (state.password !== state.repetirPassword) {
            setValido(false);
            alert("Contraseña no coincide");
            return;
        }
        setValido(true);
        let formData = new FormData();
        for (let [key, value] of Object.entries(state)) {
            formData.append(key, value);
        }
        console.log(formData);

        if (e.nativeEvent.submitter.classList.contains("registro_button")) {
            try {
                await escribir();
                alert("Registo exitoso");
                window.location.href = "http://localhost:3000/";
            } catch (error) {
                console.error("Error de registo de usuario:", error);
                alert(
                    "Correo electronico existente. Inténte con uno distinto."
                );
            }
        }
    }

    var data;
    async function leer() {
        const opciones = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const peticion = await fetch(
            "api/actualizarRegistros/leerUsuario",
            opciones
        );
        data = await peticion.json();
        console.log(data);
        return data;
    }

    async function escribir() {
        const {
            nombres,
            apellidos,
            tipoDocumento,
            nroDocumento,
            correo,
            password,
            repetirPassword,
        } = state;

        let data = await leer();

        const correoExistente = data.find((user) => user.correo === correo);
        if (correoExistente) {
            return error;
        }

        let nuevo = {
            nombres: nombres,
            apellidos: apellidos,
            tipoDocumento: tipoDocumento,
            nroDocumento: nroDocumento,
            correo: correo,
            password: password,
            repetirPassword: repetirPassword,
        };

        data.push(nuevo);

        const opciones = {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        };

        const peticion = await fetch(
            "api/actualizarRegistros/escribirUsuario",
            opciones
        );
        data = await peticion.json();
        console.log(data);
    }

    return (
        <>
            <Head>
                <title>Registro</title>
            </Head>
            <div className="registro">
                <div className="cuerpo">
                    <h1 className="registro_title">
                        Sistema de Revervas de Libros
                    </h1>
                    <h1 className="registro_title">Registro de Usuario</h1>

                    <form onSubmit={mngmtSubmit} className="registro_form">
                        <div className="registro_inputs">
                            <h2 className="registro_title2">
                                Datos Personales
                            </h2>
                            <div
                                className="registro_box"
                                onSubmit={mngmtSubmit}
                            >
                                <input
                                    type="text"
                                    maxLength="30"
                                    placeholder="Nombres"
                                    className="registro_input"
                                    id="nombres"
                                    name="nombres"
                                    onChange={mngmtChange}
                                    value={state.nombres}
                                    required
                                />
                            </div>

                            <div
                                className="registro_box"
                                onSubmit={mngmtSubmit}
                            >
                                <input
                                    type="text"
                                    maxLength="30"
                                    placeholder="Apellidos"
                                    className="registro_input"
                                    id="apellidos"
                                    name="apellidos"
                                    onChange={mngmtChange}
                                    value={state.apellidos}
                                    required
                                />
                            </div>
                            <div
                                className="registro_box"
                                onSubmit={mngmtSubmit}
                            >
                                <input
                                    type="text"
                                    maxLength="21"
                                    list="niveles"
                                    placeholder="Tipo de Documento"
                                    className="registro_input"
                                    id="tipoDocumento"
                                    name="tipoDocumento"
                                    onChange={mngmtChange}
                                    value={state.tipoDocumento}
                                    required
                                />
                                <datalist id="niveles">
                                    <option value="DNI"></option>
                                    <option value="Carnet de Extranjeria"></option>
                                    <option value="Pasaporte"></option>
                                </datalist>
                            </div>

                            <div
                                className="registro_box"
                                onSubmit={mngmtSubmit}
                            >
                                <input
                                    type="text"
                                    maxLength="8"
                                    placeholder="Nro de Documento"
                                    className="registro_input"
                                    id="nroDocumento"
                                    name="nroDocumento"
                                    onChange={mngmtChange}
                                    value={state.nroDocumento}
                                    required
                                />
                            </div>
                        </div>

                        <div className="registro_inputs">
                            <h2 className="registro_title2">
                                Datos de la Cuenta
                            </h2>
                            <div
                                className="registro_box"
                                onSubmit={mngmtSubmit}
                            >
                                <input
                                    type="email"
                                    maxLength="35"
                                    placeholder="Email"
                                    className="registro_input"
                                    id="correo"
                                    name="correo"
                                    onChange={mngmtChange}
                                    value={state.correo}
                                    required
                                />
                            </div>

                            <div
                                className="registro_box"
                                onSubmit={mngmtSubmit}
                            >
                                <input
                                    type="password"
                                    maxLength="12"
                                    placeholder="Contraseña"
                                    className="registro_input"
                                    id="password"
                                    name="password"
                                    onChange={mngmtChange}
                                    value={state.password}
                                    required
                                />
                            </div>
                            <div
                                className="registro_box"
                                onSubmit={mngmtSubmit}
                            >
                                <input
                                    type="password"
                                    maxLength="12"
                                    placeholder="Repetir Contraseña"
                                    className="registro_input"
                                    id="repetirPassword"
                                    name="repetirPassword"
                                    onChange={mngmtChange}
                                    value={state.repetirPassword}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                onSubmit={mngmtSubmit}
                                className="registro_button"
                            >
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Registro;
