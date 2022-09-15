import React from 'react';
import Layout from "../components/Layout";
import {GatsbyImage} from "gatsby-plugin-image";
import Content from "../components/common/Content";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';

const Listing = ({pageContext: data}) => {
    return (
        <Layout>
            <div className="px-12">
                <header className="relative mb-8">
                    <GatsbyImage alt={data.featuredImage.node.altText}
                                 image={data.featuredImage.node.localFile.childImageSharp.gatsbyImageData}/>
                    sudo mv composer.phar /usr/local/bin/composer <div
                    className="absolute top-0 left-0 w-full h-full p-8 flex items-center bg-black bg-opacity-50">
                    <h1 className="text-6xl text-white">{data.title}</h1>
                </div>
                </header>
                <section>

                    <Content content={data.acfListing.description}/>

                    <div className="grid grid-cols-2 gap-12">

                        {data.acfListing.gallery && (
                            <Swiper spaceBetween={32} slidesPerView={3}>
                                {data.acfListing.gallery.map((item, key) => (
                                    <SwiperSlide key={key}>
                                        <GatsbyImage alt={item.altText}
                                                     image={item.localFile.childImageSharp.gatsbyImageData}/>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}

                        {data.acfListing.keyPoints && (
                            <div className="my-12">
                                <h2>Key points of this listing:</h2>
                                <ul className="list-disc pl-4">
                                    {data.acfListing.keyPoints.map((item, key) => (
                                        <li key={key}>{item.point}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>

                </section>
            </div>
        </Layout>
    )
};

export default Listing;