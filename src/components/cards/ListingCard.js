import React from 'react';
import {TbArrowRightCircle} from 'react-icons/tb';
import {Link} from "gatsby";
import {GatsbyImage} from "gatsby-plugin-image";

const ListingCard = ({listing}) => {
    return (
        <article className="shadow-md transition-opacity hover:opacity-70">
            <Link to={`/listings/${listing.slug}`}>
                {listing.featuredImage.node && (
                    <figure>
                        <GatsbyImage alt={listing.featuredImage.node.altText}
                                     image={listing.featuredImage.node.localFile.childImageSharp.gatsbyImageData}/>
                    </figure>
                )}
                <div className="px-4 py-6 bg-gray-50">
                    <h2 className="text-2xl mb-4">{listing.title}</h2>
                    <span className="flex items-center">
                        Read More
                        <TbArrowRightCircle className="ml-4 w-6 h-6"/>
                    </span>
                </div>
            </Link>
        </article>
    );
};

export default ListingCard;