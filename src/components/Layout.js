import React from 'react';
import MainNav from "./menus/MainNav";
import Footer from "./common/Footer";

const Layout = ({children}) => {
    return (
        <>
            <header className="px-12 py-8 mb-10 shadow-md flex items-center justify-between">
                <p className="text-lg">Page header</p>
                <MainNav/>
            </header>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    )
}

export default Layout;