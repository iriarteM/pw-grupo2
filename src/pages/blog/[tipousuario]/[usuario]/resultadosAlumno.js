import Link from "next/link";
import Head from "next/head";

import { useState } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/LayoutUsuario";
import Usuario from "/usuarios.json";

const Resultados = () => {
    const [recurso, setRecurso] = useState(""); // Estado para el valor del input
  
    return (
      <>
        <Layout
          content={
            <>
              <div className="titulo_resultados">
                <div className="titulo">
                  <h2>Búsqueda</h2>
                </div>
              </div>
              <div className="resultados">
                <div className="caja_texto">
                  <label className="label1">
                    <h2>Palabras clave</h2>
                  </label>
                  <input
                    className="busqueda"
                    type="text"
                    id="recurso"
                    name="recurso"
                    placeholder="Buscar por título"
                    value={recurso} // Utiliza el estado para el valor del input
                    onChange={(e) => setRecurso(e.target.value)} // Actualiza el estado al escribir
                  />
                </div>
                <div className="checkbox_boton">
                  <div className="checkbox_titulo">
                    <div className="subtitulo">Incluir búsqueda en:</div>
                    <div className="checbox_">
                      <input type="checkbox" name="titulo" />
                      Título
                    </div>
                    <div className="checbox_">
                      <input type="checkbox" name="autor" />
                      Autor, Autores
                    </div>
                    <div className="checbox_">
                      <input type="checkbox" name="serie" />
                      Serie
                    </div>
                    <div className="checbox_">
                      <input type="checkbox" name="isbn" />
                      ISBN
                    </div>
                  </div>
                  <div className="botones">
                    <button className="boton_limpiar">Limpiar</button>
                    <button className="boton_buscar">Buscar</button>
                  </div>
                </div>
              </div>
            </>
          }
        />
      </>
    );
};

export default Resultados;
