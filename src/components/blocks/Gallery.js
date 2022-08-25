import React from 'react';
import {GatsbyImage} from "gatsby-plugin-image";

const Gallery = ({gallery}) => {
    return (
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-8">
            {gallery.map((item, key) => (
                <figure key={key}>
                    {item.image && (
                        <GatsbyImage image={item.image.localFile.childImageSharp.gatsbyImageData} alt="alt attr"/>
                    )}
                    {item.caption !== '' && (
                        <figcaption>{item.caption}</figcaption>
                    )}
                </figure>
            ))}
        </div>
    )
};

export default Gallery;