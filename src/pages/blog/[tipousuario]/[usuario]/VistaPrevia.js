import React from "react";
import Link from "next/link";
import Layout from "@/components/LayoutUsuario";

function ResultadosBusqueda() {
    return (
        <Layout
            content={
                <>
                    <div className="indexForm">
                        <h1 className="index_title">Resultados de Búsqueda</h1>

                        <div className="result-item">
                            <div className="imagenLibro">
                                <img src="imagen1.jpg" alt="Libro 1" />
                            </div>
                            <div className="contenido-left">
                                <h2>Título del Libro 1</h2>
                                <p className="description">
                                    Descripción del libro 1. Lorem ipsum dolor
                                    sit amet, consectetur adipiscing elit.
                                </p>
                                <p className="topics">
                                    <span className="topic1">Tema 1</span>
                                    <span className="topic2">Tema 2</span>
                                </p>
                            </div>
                            <div className="contenido-right">
                                <p className="fecha">
                                    <span className="fecha-label">
                                        Fecha de Publicación:
                                    </span>
                                    <span id="fecha">
                                        12 de Octubre de 2023
                                    </span>
                                </p>
                                <a
                                    href="/DetalleLibro"
                                    className="reservarButton"
                                >
                                    Detalles
                                </a>
                            </div>
                        </div>

                        <div className="result-item">
                            <div className="imagenLibro">
                                <img src="imagen2.jpg" alt="Libro 2" />
                            </div>
                            <div className="contenido-left">
                                <h2>Título del Libro 2</h2>
                                <p className="description">
                                    Descripción del libro 2. Lorem ipsum dolor
                                    sit amet, consectetur adipiscing elit.
                                </p>
                                <p className="topics">
                                    <span className="topic1">Tema 3</span>
                                    <span className="topic2">Tema 4</span>
                                </p>
                            </div>
                            <div className="contenido-right">
                                <p className="fecha">
                                    <span className="fecha-label">
                                        Fecha de Publicación:
                                    </span>
                                    <span id="fecha">
                                        18 de Octubre de 2023
                                    </span>
                                </p>
                                <a
                                    href="/DetalleLibro"
                                    className="reservarButton"
                                >
                                    Detalles
                                </a>
                            </div>
                        </div>
                    </div>
                </>
            }
        />
    );
}
export default ResultadosBusqueda;
