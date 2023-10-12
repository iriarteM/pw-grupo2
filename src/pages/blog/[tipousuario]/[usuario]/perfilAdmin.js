import Link from "next/link";
import Head from "next/head";

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import Layout from "@/components/LayoutAdmin";
import Admins from "/administradores.json";

const Perfil = () => {
    const [section, setSection] = useState(null);

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
                        <div className="btn-group">
                            <button onClick={() => setSection("data_section")}>
                                Sección de Datos
                            </button>
                            <button onClick={() => setSection("account_section")}>
                                Sección de Cuenta
                            </button>
                        </div>

                        {section === "data_section" && (
                            <div className="data-form">
                                <input type="text" placeholder="Nombre" className="input-data" />
                                <input type="text" placeholder="Apellido" className="input-data" />
                                <input type="email" placeholder="Correo electrónico" className="input-data" />
                                <input type="password" placeholder="Contraseña" className="input-data" />
                                <button type="button" className="save-btn">Guardar</button>
                            </div>
                        )}

                        {section === "account_section" && (
                            <div className="account-form">
                                <input type="text" placeholder="Usuario" className="input-account" />
                                <input type="password" placeholder="Nueva contraseña" className="input-account" />
                                <button type="button" className="save-btn">Guardar</button>
                            </div>
                        )}
                    </div>

                </>
            }
        />
    );
};

export default Perfil;
