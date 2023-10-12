import Link from "next/link";
import Head from "next/head";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Layout from "@/components/LayoutAdmin";
import Admins from "/administradores.json";

const Inicio = () => {
    return (
        <Layout
            content={
                <>
                    <Head>
                        <title>Mi Biblioteca</title>
                    </Head>
                    <div className="container">
                        <p id="bienvenido">Bienvenido, Juan!</p>
                        <hr id="lineah" />
                        <div id="auxiliar">
                            <div id="ult_reservas">
                                <p id="titulo_ult">Ultimas reservas</p>
                                <div className="card">
                                    <div className="contenido">
                                        <p>
                                            <span id="circulo">A</span>
                                            <span className="cleancode">
                                                Clean Code: A Handbook of Agile
                                                Software Craftsmanship
                                            </span>
                                        </p>
                                        <p className="small-text">
                                            18/09/2023 08:00 am
                                        </p>
                                    </div>
                                    <img
                                        src="/FotoLibro.jpeg"
                                        alt="Descripción de la imagen"
                                        className="imagen"
                                    />
                                </div>
                                <div className="card">
                                    <div className="contenido">
                                        <p>
                                            <span id="circulo">A</span>
                                            <span className="cleancode">
                                                Clean Code: A Handbook of Agile
                                                Software Craftsmanship
                                            </span>
                                        </p>
                                        <p className="small-text">
                                            18/09/2023 08:00 am
                                        </p>
                                    </div>
                                    <img
                                        src="/FotoLibro.jpeg"
                                        alt="Descripción de la imagen"
                                        className="imagen"
                                    />
                                </div>
                            </div>
                            <div id="mas_pedidos">
                                <p id="titulo_mas">Los más Pedidos</p>
                                <div className="card">
                                    <div className="contenido2">
                                        <p>
                                            <span id="circulo">A</span>
                                            <span className="cleancode">
                                                Clean Code: A Handbook of Agile
                                                Software Craftsmanship
                                            </span>
                                        </p>
                                        <p className="small-text">
                                            18/09/2023 08:00 am
                                        </p>
                                    </div>
                                    <img
                                        src="/FotoLibro.jpeg"
                                        alt="Descripción de la imagen"
                                        className="imagen"
                                    />
                                </div>
                                <div className="card">
                                    <div className="contenido">
                                        <p>
                                            <span id="circulo">A</span>
                                            <span className="cleancode">
                                                Clean Code: A Handbook of Agile
                                                Software Craftsmanship
                                            </span>
                                        </p>
                                        <p className="small-text">
                                            18/09/2023 08:00 am
                                        </p>
                                    </div>
                                    <img
                                        src="/FotoLibro.jpeg"
                                        alt="Descripción de la imagen"
                                        className="imagen"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        />
    ); 
};

export default Inicio;
