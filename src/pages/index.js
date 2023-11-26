import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

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

        async function leer() {
            const opciones = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
    
            const request = await fetch(
                "/api/validar/leeUsuarios",//
                opciones
            );
            let data = await request.json();
            console.log(data);
            return data;
        }

        const datos = await leer();
        const admin = datos.find((d) => d.tipo_usuario === "administrador" && d.correo === usuario && d.contrasenia === contraseña);
        const estudiante = datos.find((d) => d.tipo_usuario === "estudiante" && d.correo === usuario && d.contrasenia === contraseña);

        if (admin) {
            // Es un administrador
            router.push(`/blog/admin/${admin.correo}/inicioAdmin`);
        } else if (estudiante) {
            // Es un alumno
            router.push(`/blog/alumno/${estudiante.correo}/inicioAlumno`);
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
                </form>
            </div>
        </>
    );
};

export default Login;
