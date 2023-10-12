import "../styles/login.css";
import "../styles/sidebar.css";
import "../styles/Principal.css";
import "../styles/DetalleLibro.css";
import "../styles/perfil.css";
import "../styles/resultados.css";
import "../styles/vistaPrevia.css";
import"../styles/nuevoLibro.css";   

import { AppProps } from "next/app";
import { DemoProvider } from "./context/demo";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
export default function MyApp({ Component, pageProps }) {
    return (
        <DemoProvider>
            <Component {...pageProps} />
        </DemoProvider>
    );
}
