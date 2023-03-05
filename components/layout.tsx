import { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from "./navbar";
import Footer from "./footer";




const disconnectedL = (children: ReactNode, title: string) => {

    return (
        <>
            <Head>
                <title>{title || 'kodex'}</title>
            </Head>

            <main>
                <div className="row g-0">
                    <Navbar/>
                </div>
                {children}
                <div className="row g-0">
                    <Footer/>
                </div>
            </main>
        </>
    );
};


export default function Layout( {children,}: {
    children: ReactNode;
}) {

    const title = "Kodkodkod studio";


    return disconnectedL(children, title);
}
