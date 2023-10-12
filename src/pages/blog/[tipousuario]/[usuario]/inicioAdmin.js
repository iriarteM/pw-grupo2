import Link from "next/link";
import Head from "next/head";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Layout from "@/components/LayoutAdmin";
import Admins from "/administradores.json";

const Inicio = () => {
    return (
        <>
            <Layout
                content={
                    <>
                        <p>Hola</p>
                    </>
                }
            />
        </>
    );
};

export default Inicio;
