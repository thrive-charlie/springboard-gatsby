import React, {useEffect, useState} from 'react';
import {graphql, useStaticQuery, Link} from "gatsby";
import Layout from "../components/Layout";
import PostCard from "../components/cards/PostCard";

const Blog = () => {

    const {allWpPost: posts, allWpCategory: categories, wp} = useStaticQuery(graphql`
        {
            allWpPost(sort: {fields: dateGmt, order: ASC}) {
                nodes {
                    title
                    dateGmt
                    excerpt
                    content
                    featuredImage {
                        node {
                            altText
                            localFile {
                                childImageSharp {
                                    gatsbyImageData(formats: [AVIF, WEBP, AUTO], width: 800, height: 500)
                                }
                            }
                        }
                    }
                    uri
                    categories {
                        nodes {
                            name
                        }
                    }
                }
            }
            allWpCategory {
                nodes {
                    id
                    name
                    slug
                }
            }
            wp {
                acfOptionsThemeSettings {
                    globals {
                        footerTagline
                        postsPageTitle
                        postsPageImage {
                            localFile {
                                childImageSharp {
                                    gatsbyImageData(formats: [AVIF, WEBP, AUTO])
                                }
                            }
                        }
                    }
                }
            }
        }

    `);

    console.log(categories);

    // State for the list
    const [list, setList] = useState([...posts.nodes.slice(0, 3)])

    // State to trigger oad more
    const [loadMore, setLoadMore] = useState(false)

    // State of whether there is more to load
    const [hasMore, setHasMore] = useState(posts.nodes.length > 3)

    // Load more button click
    const handleLoadMore = () => {
        setLoadMore(true)
    }

    // Handle loading more articles
    useEffect(() => {
        if (loadMore && hasMore) {
            const currentLength = list.length
            const isMore = currentLength < posts.nodes.length
            const nextResults = isMore
                ? posts.nodes.slice(currentLength, currentLength + 3)
                : []
            setList([...list, ...nextResults])
            setLoadMore(false)
        }
    }, [loadMore, hasMore])

    //Check if there is more
    useEffect(() => {
        const isMore = list.length < posts.nodes.length
        setHasMore(isMore)
    }, [list])

    return (
        <Layout>
            <section className="px-12 py-8">
                <div className="mb-8">
                    <h1 className="text-5xl mb-12">{wp.acfOptionsThemeSettings.globals.postsPageTitle}</h1>
                    <p>See all {posts.nodes.length} posts below</p>
                </div>
                {categories.nodes && (
                    <div className="mb-8">
                        {categories.nodes.map((link, key) => (
                            <Link to={link.slug} key={key} className="mr-4">{link.name}</Link>
                        ))}
                    </div>
                )}
                <div className="grid grid-cols-3 gap-8">
                    {list.map((item, index) => (
                        <PostCard key={index} post={item}/>
                    ))}
                </div>
                {hasMore ? (
                    <div className="flex items-center justify-center py-12">
                        <button onClick={handleLoadMore}>Load More</button>
                    </div>
                ) : (
                    <div></div>
                )}
            </section>
        </Layout>
    )
}

export default Blog;