import React from 'react';
import MainNav from "./menus/MainNav";
import Footer from "./common/Footer";
import {Link} from "gatsby";

const Layout = ({children}) => {
    return (
        <>
            <header className="px-12 py-8 mb-10 shadow-md flex items-center justify-between">
                <Link to="/" className="text-lg">Page header</Link>
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