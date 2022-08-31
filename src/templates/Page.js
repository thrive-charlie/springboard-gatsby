import React from 'react';
import Layout from '../components/Layout';
import BlockBuilder from "../components/BlockBuilder";
import Seo from "../components/Seo";

const Page = ({pageContext: data}) => {
    return (
        <Layout>
            <div className="px-12">
                <h1 className="text-7xl">{data.title}</h1>
                <p>This is a page</p>
                {data.blocks.blocks && (
                    <BlockBuilder blocks={data.blocks.blocks}/>
                )}
            </div>
        </Layout>
    );
}

export default Page;

export const Head = ({pageContext: data, location}) => {
    return <Seo title={data.title} pathname={location} yoast={data.seo}/>
};