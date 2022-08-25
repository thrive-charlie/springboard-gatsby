import React from 'react';
import {GatsbyImage} from "gatsby-plugin-image";

const PageHead = ({title, content, image}) => {
    return (
        <header>
            <figure>
                <GatsbyImage alt={image.altText} image={image.localFile.childImageSharp.gatsbyImageData}/>
            </figure>
            <div className="absolute top-0 left-0">
                <h1>{title}</h1>
                {content !== '' && (
                    <p>{content}</p>
                )}
            </div>
        </header>
    );
}

export default PageHead;