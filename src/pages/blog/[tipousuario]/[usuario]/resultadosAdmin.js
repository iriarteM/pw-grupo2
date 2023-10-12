import Link from "next/link";
import Head from "next/head";
import Layout from "@/components/LayoutAdmin";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Admins from "/administradores.json";
import libraryData from "/library.json";

const Resultados = () => {
    return (
        <>
            <Layout
                content={
                    <>
                        <p>PRESTAMOS</p>
                    </>
                }
            />
        </>
    );
};

export default Resultados;
