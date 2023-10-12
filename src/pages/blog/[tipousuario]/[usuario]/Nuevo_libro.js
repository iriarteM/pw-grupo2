import Link from "next/link";
import Head from "next/head";
import Layout from "@/components/LayoutUsuario";
import React, { useState } from "react";

const nuevo_libro = () => {
    const [nuevoLibro, setNuevoLibro] = useState({
        titulo: "",
        autor: "",
        isbn: "",
        serieTipo: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoLibro({ ...nuevoLibro, [name]: value });
    };

    const handleGuardarClick = () => {
        // Obtén la información actual en el almacenamiento local
        const librosActuales =
            JSON.parse(localStorage.getItem("library")) || [];

        // Crea un nuevo libro con la estructura adecuada
        const nuevoLibroEstructurado = {
            autor: nuevoLibro.autor,
            ISBN: nuevoLibro.isbn,
            ISBN13: "978" + nuevoLibro.isbn,
            titulo: nuevoLibro.titulo,
        };

        // Agrega el nuevo libro a la lista
        librosActuales.push(nuevoLibroEstructurado);

        // Sobrescribe la información en el almacenamiento local
        localStorage.setItem("library", JSON.stringify(librosActuales));

        // Opcional: Muestra un mensaje para indicar que la información se ha actualizado
        alert("Registro Completo");
    };

    return (
        <Layout
          content={
            <>
              <Head>
                <title>Sistema de biblioteca</title>
              </Head>
      
              <div className="interconexion">
                <form action="" className="formulario_de_conexion">
                  <h1 className="titulo_de_acceso">
                    Sistema de Reservas de Textos Bibliográficos
                  </h1>
                  <div className="campos_de_ingreso">
                    <div className="contenedor_de_conexion">
                      <input
                        type="text"
                        placeholder="Título"
                        name="titulo"
                        value={nuevoLibro.titulo}
                        onChange={handleInputChange}
                        className="campo_de_ingreso"
                        maxLength="35"
                        required
                      />
                    </div>
                    <div className="contenedor_de_conexion">
                      <input
                        type="text"
                        placeholder="Autor"
                        name="autor"
                        value={nuevoLibro.autor}
                        onChange={handleInputChange}
                        className="campo_de_ingreso"
                        maxLength="35"
                        required
                      />
                    </div>
                    <div className="contenedor_de_conexion">
                      <input
                        type="text"
                        placeholder="ISBN"
                        name="isbn"
                        value={nuevoLibro.isbn}
                        onChange={handleInputChange}
                        className="campo_de_ingreso"
                        maxLength="35"
                        required
                      />
                    </div>
      
                    <div className="contenedor_de_conexion">
                      <input
                        id="input4"
                        type="text"
                        placeholder="Serie, Tipo"
                        name="serieTipo"
                        value={nuevoLibro.serieTipo}
                        onChange={handleInputChange}
                        className="campo_de_ingreso"
                        maxLength="35"
                        required
                      />
                    </div>
                  </div>
      
                  <button
                    type="submit"
                    className="boton_de_ingreso"
                    onClick={handleGuardarClick}
                  >
                    Guardar
                  </button>
                </form>
              </div>
            </>
          }
        />
      );
};

export default nuevo_libro;
