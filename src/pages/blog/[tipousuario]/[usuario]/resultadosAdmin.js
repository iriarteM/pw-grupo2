import Link from "next/link";
import Head from "next/head";
import Layout from "@/components/LayoutAdmin";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Admins from "/administradores.json";
import libraryData from "/library.json";

const Resultados = () => {
    const router = useRouter();
    const { usuario } = router.query;

    const [inputText, setInputText] = useState("");
    const [coincidencias, setCoincidencias] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const resultadosPorPagina = 3;

    useEffect(() => {
        if (inputText.trim() === "") {
            setCoincidencias([]);
        } else {
            const coincidenciasFiltradas = libraryData.filter((libro) =>
                libro.titulo.toLowerCase().includes(inputText.toLowerCase())
            );
            setCoincidencias(coincidenciasFiltradas);
            setPaginaActual(1);
        }
    }, [inputText]);

    const irPaginaSiguiente = () => {
        if ((paginaActual + 1) * resultadosPorPagina <= coincidencias.length) {
            setPaginaActual(paginaActual + 1);
        }
    };

    const irPaginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    };

    const indiceInicio = (paginaActual - 1) * resultadosPorPagina;
    const indiceFin = indiceInicio + resultadosPorPagina;

    const [flag, setFlag] = useState(false);
    const [libroSeleccionado, setLibroSeleccionado] = useState(null);
    const [reservas, setReservas] = useState([]);

    async function obtenerReservas() {
        const opciones = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        const peticion = await fetch("/api/actualizarReserva/leer", opciones);
        let data = await peticion.json();
        console.log("Peticion_data:", JSON.stringify(data));
        setReservas(data);
    }

    useEffect(() => {
        obtenerReservas();
    }, []);

    const eliminarReserva = (libro) => {
        if (libro) {
            const reservasActualizadas = reservas.filter(
                (reserva) => reserva.ISBN13 !== libro.ISBN13
            );

            setReservas(reservasActualizadas);

            fetch("/api/actualizarReserva/escribir", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservasActualizadas),
            })
                .then((response) => response.json())
                .then(() => {
                    obtenerReservas();
                    setLibroSeleccionado(null);
                    setFlag(false);
                })
                .catch((error) => {
                    console.error("Error al eliminar la reserva:", error);
                });
        }
    };
    const doEscribir = async () => {
        window.location.href = `/blog/admin/${usuario}/paginaInsertarNuevoLibroAdmin`;
    };
    return (
        <>
            <Layout
                content={
                    <>
                        <div className="titulo-resultados">
                            <div className="titulo">
                                <h2>BIBLIOTECA</h2>
                            </div>
                            <button
                                className="boton-añadir"
                                onClick={doEscribir}
                            >
                                Añadir un nuevo recurso
                            </button>
                        </div>
                        <div className="linea"></div>
                        <div className="cuadro-texto">
                            <label className="label">
                                Ingresar palabra clave
                                <div className="icono-busqueda">
                                    <img
                                        src="/busqueda.png"
                                        alt="Icono de busqueda"
                                    />
                                </div>
                            </label>
                            <input
                                className="input-box"
                                type="text"
                                id="recurso"
                                name="recurso"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Buscar título"
                            />
                        </div>
                        <div className="paginacion">
                            <button
                                onClick={irPaginaAnterior}
                                disabled={paginaActual === 1}
                            >
                                {"<<<"}
                            </button>
                            <button
                                onClick={irPaginaSiguiente}
                                disabled={
                                    paginaActual ===
                                    Math.ceil(coincidencias.length / 3) - 1
                                }
                            >
                                {">>>"}
                            </button>
                        </div>
                        <div className="resultados-libros">
                            {coincidencias
                                .slice(indiceInicio, indiceFin)
                                .map((libro, index) => {
                                    const reservaExistente = reservas.find(
                                        (reserva) =>
                                            reserva &&
                                            reserva.ISBN13 === libro.ISBN13
                                    );
                                    const isBotonDeshabilitado =
                                        !!reservaExistente &&
                                        reservaExistente.disponibilidad === 1;
                                    return (
                                        <div
                                            className="bloque-libro"
                                            key={index}
                                        >
                                            <div className="titulo-libro">
                                                <h3>{libro.titulo}</h3>
                                            </div>
                                            <div className="imagenes-libro">
                                                {!isBotonDeshabilitado && (
                                                    <>
                                                        <img
                                                            src="/media.png"
                                                            alt="Default"
                                                            className="icono"
                                                        />
                                                        <img
                                                            src={
                                                                libro[
                                                                    "imagen-portada-url"
                                                                ]
                                                            }
                                                            alt="Portada del libro"
                                                            className="portada-libro"
                                                        />
                                                    </>
                                                )}
                                                {isBotonDeshabilitado && (
                                                    <>
                                                        <img
                                                            src="/media.png"
                                                            alt="Icono"
                                                            className="icono"
                                                        />
                                                        <img
                                                            src={
                                                                libro[
                                                                    "imagen-portada-url"
                                                                ]
                                                            }
                                                            alt="Portada del libro"
                                                            className="portada-libro"
                                                        />
                                                    </>
                                                )}
                                            </div>
                                            <div className="informacion-libro">
                                                <p>
                                                    <b>ISBN: {libro.ISBN}</b>
                                                </p>
                                                <p>
                                                    <b>Autor:</b>{" "}
                                                    <u>{libro.autor}</u>
                                                </p>
                                                <p>
                                                    <b>Editorial:</b>{" "}
                                                    {libro.editorial}
                                                </p>
                                            </div>
                                            {isBotonDeshabilitado && (
                                                <>
                                                    <div>No disponible</div>
                                                    <button
                                                        onClick={() =>
                                                            eliminarReserva(
                                                                libro
                                                            )
                                                        }
                                                    >
                                                        Cancelar
                                                    </button>
                                                </>
                                            )}
                                            {!isBotonDeshabilitado && (
                                                <button disabled>
                                                    Reservar
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                    </>
                }
            />
        </>
    );
};

export default Resultados;
