import React from 'react';
import {Link, useStaticQuery, graphql} from "gatsby";

const MainNav = () => {

    // Get menu links for main menu location
    const data = useStaticQuery(graphql`
        {
            allWpMenu(filter: {name: {eq: "Main Menu"}}) {
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
        <nav>
            <ul className="flex items-center justify-end">
                {menuLinks.map((link, key) => (
                    <li key={key} className="ml-6">
                        <Link to={link.uri}>{link.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
};

export default MainNav;