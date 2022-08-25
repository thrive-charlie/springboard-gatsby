import React from 'react';
import Layout from '../components/Layout';
import Seo from "../components/Seo";

const Post = ({pageContext}) => {
    return (
        <Layout>
            <div className="px-12">
                <p>This is a post</p>
            </div>
        </Layout>
    );
}

export default Post;

export const Head = ({pageContext: data, location}) => {
    return <Seo title={data.title} pathname={location} yoast={data.seo}/>
};