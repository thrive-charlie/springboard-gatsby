import React from 'react';
import ContentImage from "./blocks/ContentImage";
import ContentTestimonials from "./blocks/ContentTestimonials";
import Gallery from "./blocks/Gallery";

const BlockBuilder = ({blocks}) => {
    return (
        <>
            {blocks.map((block, index) => {
                switch (block.fieldGroupName) {
                    case 'Page_Blocks_Blocks_ContentImage':
                        return <ContentImage key={index} {...block} />;
                    case 'Page_Blocks_Blocks_Gallery':
                        return <Gallery key={index} {...block} />;
                    case 'Page_Blocks_Blocks_ContentTestimonials':
                        return <ContentTestimonials key={index} {...block} />;
                    default:
                        return <p>Block missing: {block.fieldGroupName}</p>;
                }
            })}
        </>
    );
}

export default BlockBuilder;