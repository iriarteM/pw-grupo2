import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

import Admins from "/administradores.json";
import Usuario from "/usuarios.json";

const Login = () => {
    const [state, setState] = useState({ usuario: "", contraseña: "" });
    const router = useRouter();

    // Gestiona los cambios en los campos de entrada
    function mngmtChange(e) {
        console.log(e.target.name, e.target.value);
        setState({ ...state, [e.target.name]: e.target.value });
    }

    // Se valida el inicio de sesion
    const validarLogin = async (e) => {
        e.preventDefault();

        const { usuario, contraseña } = state;

        // Verifica administrador
        const admin = Object.values(Admins).find(
            (admin) =>
                admin.correo === usuario && admin.contraseña === contraseña
        );

        // Verifica alumno
        const alumno = Object.values(Usuario).find(
            (alumno) =>
                alumno.correo === usuario && alumno.password === contraseña
        );

        if (admin) {
            // Es un administrador
            router.push(`/blog/admin/${admin.correo}/inicioAdmin`);
        } else if (
            alumno &&
            alumno.correo === usuario &&
            alumno.password === contraseña
        ) {
            // Es un alumno
            router.push(`/blog/alumno/${alumno.correo}/inicioAlumno`);
        } else {
            alert("No coincide la contraseña o usuario");
        }
    };

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className="login">
                <form
                    method="post"
                    onSubmit={validarLogin}
                    className="login_form"
                >
                    <h1 className="login_title">
                        Sistema de Revervas de Libros
                    </h1>

                    <div className="login_inputs">
                        <div className="login_box">
                            <input
                                type="email"
                                maxLength="35"
                                placeholder="Correo"
                                className="login_input"
                                id="usuario"
                                name="usuario"
                                onChange={mngmtChange}
                                required
                            />
                        </div>

                        <div className="login_box">
                            <input
                                type="password"
                                maxLength="12"
                                placeholder="Contraseña"
                                className="login_input"
                                id="contraseña"
                                name="contraseña"
                                onChange={mngmtChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="login_check">
                        <a href="#" className="login_forgot">
                            Olvidé mi contraseña
                        </a>
                    </div>

                    <button type="submit" className="login_button">
                        Ingresar
                    </button>

                    <div className="login_register">
                        <Link href="/registro">Registrar</Link>
                    </div>

                    /* hola */
                </form>
            </div>
        </>
    );
};

export default Login;
