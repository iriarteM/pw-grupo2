import Link from "next/link";
import Head from "next/head";
import Layout from "@/components/LayoutUsuario";

const Login = () => (
    <Layout
        content={
            <>
                <Head>
                    <title>Detalle Libro</title>
                </Head>
                <div className="login">
                    <form action="" className="indexForm">
                        <div className="contenido">
                            <h1 className="index_title">Citas</h1>

                            <div className="contexto">
                                <div
                                    className="description"
                                    type="text"
                                    maxLength="35"
                                    required
                                >
                                    Este libro sólo tiene un objetivo principa
                                    Este libro sólo tiene un objetivo principal:
                                    provocar el inicio de un nuevo campo de
                                    estudio: la programación informática como
                                    actividad humana o, en pocas palabras, la
                                    psicología de la programación informática.
                                    Todos los demás objetivos están subordinados
                                    a éste. Por ejemplo, he intentado que el
                                    libro sea interesante y no técnico, en la
                                    medida de lo posible, para animar al mayor
                                    número posible de personas a leerlo: no sólo
                                    programadores, sino gestores de programación
                                    y otras personas relacionadas con la
                                    programación en las muchas formas en que
                                    estamos relacionados con la programación hoy
                                    en día. Lo que intento conseguir es que el
                                    lector diga, al terminar el libro: "Sí, la
                                    programación no es sólo una cuestión de
                                    hardware y software. A partir de ahora
                                    tendré que ver las cosas de otra manera". l:
                                    provocar el inicio de un nuevo campo de
                                    estudio: la programación informática como
                                    actividad humana o, en pocas palabras, la
                                    psicología de la programación informática.
                                    Todos los demás objetivos están subordinados
                                    a éste. Por ejemplo, he intentado que el
                                    libro sea interesante y no técnico, en la
                                    medida de lo posible, para animar al mayor
                                    número posible de personas a leerlo: no sólo
                                    programadores, sino gestores de programación
                                    y otras personas relacionadas con la
                                    programación en las muchas formas en que
                                    estamos relacionados con la programación hoy
                                    en día. Lo que intento conseguir es que el
                                    lector diga, al terminar el libro: "Sí, la
                                    programación no es sólo una cuestión de
                                    hardware y software. A partir de ahora
                                    tendré que ver las cosas de otra manera".
                                </div>

                                <div className="ParteBaja">
                                    <div id="contenido-left">
                                        <div className="imagenLibro">
                                            <img
                                                src="/FotoLibro.jpeg"
                                                alt="No carga la imagen del libro"
                                            ></img>
                                        </div>

                                        <div className="dispoButton">
                                            Disponible
                                        </div>
                                    </div>
                                    <div className="contenido-right">
                                        <div className="fecha">
                                            <label
                                                htmlFor="fecha"
                                                className="fecha-label"
                                            >
                                                Fecha de reserva:
                                            </label>
                                            <input
                                                type="date"
                                                id="fecha"
                                                name="fecha"
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            className="reservarButton"
                                        >
                                            Reservar
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="topics">
                                <div class="topic1">Ingeniería de Software</div>
                                <div class="topic2">Programación Web</div>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        }
    />
);

export default Login;
