import React from 'react';
import {graphql, Link, useStaticQuery} from "gatsby";

const FooterNav = () => {
    const data = useStaticQuery(graphql`
        {
            allWpMenu(filter: {name: {eq: "Footer"}}) {
                nodes {
                    menuItems {
                        nodes {
                            uri
                            childItems {
                                nodes {
                                    title
                                    uri
                                }
                            }
                            parentId
                            cssClasses
                            label
                        }
                    }
                }
            }
        }
    `);

    const menu = data.allWpMenu.nodes[0];
    const menuLinks = menu.menuItems.nodes.filter(item => !item.parentId);

    return (
        <div className="flex items-center">
            {menuLinks.map((link, key) => (
                <Link key={key} to={link.uri} className="mr-4">{link.label}</Link>
            ))}
        </div>
    )
}

export default FooterNav;