import React from 'react';
import Layout from '../components/Layout';
import Seo from "../components/Seo";
import Content from "../components/common/Content";
import {GatsbyImage} from "gatsby-plugin-image";
import PostBreadcrumbs from "../components/blog/PostBreadcrumbs";

const Post = ({pageContext: data}) => {
    return (
        <Layout>
            <div className="px-12">
                <PostBreadcrumbs currentPageTitle={data.title}/>
                <header className="relative mb-8">
                    <GatsbyImage alt={data.featuredImage.node.altText}
                                 image={data.featuredImage.node.localFile.childImageSharp.gatsbyImageData}/>
                    <div className="absolute top-0 left-0 w-full h-full p-8 flex items-center bg-black bg-opacity-50">
                        <h1 className="text-6xl text-white">{data.title}</h1>
                    </div>
                </header>
                <Content content={data.content}/>
            </div>
        </Layout>
    );
}

export default Post;

export const Head = ({pageContext: data, location}) => {
    return <Seo title={data.title} pathname={location} yoast={data.seo}/>
};