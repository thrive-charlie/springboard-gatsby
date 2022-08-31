import React from 'react';
import {TbArrowRightCircle} from 'react-icons/tb';
import {Link} from "gatsby";
import {GatsbyImage} from "gatsby-plugin-image";

const PostCard = ({post}) => {
    return (
        <article className="shadow-md transition-opacity hover:opacity-70">
            <Link to={`/blog${post.uri}`}>
                {post.featuredImage.node && (
                    <figure>
                        <GatsbyImage alt={post.featuredImage.node.altText}
                                     image={post.featuredImage.node.localFile.childImageSharp.gatsbyImageData}/>
                    </figure>
                )}
                <div className="px-4 py-6 bg-gray-50">
                    <h2 className="text-2xl mb-4">{post.title}</h2>
                    <div className="mb-4" dangerouslySetInnerHTML={{__html: post.excerpt}}/>
                    <span className="flex items-center">
                        Read More
                        <TbArrowRightCircle className="ml-4 w-6 h-6"/>
                    </span>
                </div>
            </Link>
        </article>
    );
};

export default PostCard;