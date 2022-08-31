import React from 'react';
import Layout from "../components/Layout";
import {graphql, useStaticQuery} from "gatsby";
import ListingCard from "../components/cards/ListingCard";

const Listings = () => {

    const data = useStaticQuery(graphql`
        {
            allWpListing {
                nodes {
                    title
                    slug
                    seo {
                        canonical
                        title
                        metaDesc
                        metaKeywords
                    }
                    featuredImage {
                        node {
                            localFile {
                                childImageSharp {
                                    gatsbyImageData(formats: [AVIF, WEBP, AUTO])
                                }
                            }
                        }
                    }
                    acfListing {
                        relatedListings {
                            __typename
                            ... on WpListing {
                                id
                                title
                                slug
                                featuredImage {
                                    node {
                                        altText
                                        localFile {
                                            childImageSharp {
                                                gatsbyImageData
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        keyPoints {
                            point
                        }
                        gallery {
                            altText
                            localFile {
                                childImageSharp {
                                    gatsbyImageData(formats: [AVIF, WEBP, AUTO], width: 1200, height: 800)
                                }
                            }
                        }
                        description
                        brochure {
                            filename
                            publicUrl
                        }
                    }
                }
            }
        }
    `);

    return (
        <Layout>
            <section className="px-12 py-8">
                <p className="mb-8">Listings go here</p>
                <div className="grid grid-cols-3 gap-8">
                    {data.allWpListing.nodes.map((item, index) => (
                        <ListingCard listing={item} key={index}/>
                    ))}
                </div>
            </section>
        </Layout>
    )
}

export default Listings;