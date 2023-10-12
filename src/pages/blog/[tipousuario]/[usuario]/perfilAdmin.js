import Link from "next/link";
import Head from "next/head";

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import Layout from "@/components/LayoutAdmin";
import Admins from "/administradores.json";

const Perfil = () => {
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

export default Perfil;
