import React from 'react';
import {graphql, useStaticQuery} from "gatsby";
import FooterNav from '../menus/FooterNav';

const Footer = () => {

    const data = useStaticQuery(graphql`
        {
            wp {
                acfOptionsThemeSettings {
                    globals {
                        footerTagline
                    }
                }
            }
        }
    `);

    return (
        <footer className="bg-slate-100 px-12 py-12 mt-10">
            <p className="mb-4">Page Footer - <span>{data.wp.acfOptionsThemeSettings.globals.footerTagline}</span></p>
            <FooterNav/>
        </footer>
    );
}

export default Footer;