import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export default (props) => {
    const router = useRouter();
    const { usuario } = router.query;

    // Define un estado para controlar si el menú está abierto o cerrado
    const [isMenuOpen, setMenuOpen] = useState();

    // Función para alternar entre abrir y cerrar el menú
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    // Clases CSS para el menú lateral basadas en el estado
    const sidebarClass = isMenuOpen ? "sidebar_menu open" : "sidebar_menu";
    const contentClass = isMenuOpen ? "main_content open" : "main_content";

    return (
        <>
            <Head>
                <title>Usuario</title>
            </Head>
            <header id="topbar">
                <div id="menu-icon" onClick={toggleMenu}>
                    &#9776;
                </div>
            </header>

            <div className={sidebarClass}>
                <div className="menu">
                    <ul>
                        <li>
                            <Link href={`/blog/alumno/${usuario}/inicioAlumno`}>
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href={`/blog/alumno/${usuario}/perfilAlumno`}>
                                Perfil
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/blog/alumno/${usuario}/resultadosAlumno`}
                            >
                                Préstamos
                            </Link>
                        </li>
                        <li>
                            <Link href="http://localhost:3000/">Exit</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={contentClass}>
                <main>{props.content}</main>
            </div>
        </>
    );
};
