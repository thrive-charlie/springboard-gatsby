import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import PostCard from "../components/cards/PostCard";

const PostCategory = ({pageContext: data}) => {

    // State for the list
    const [list, setList] = useState([...data.posts.nodes.slice(0, 3)])

    // State to trigger oad more
    const [loadMore, setLoadMore] = useState(false)

    // State of whether there is more to load
    const [hasMore, setHasMore] = useState(data.posts.nodes.length > 3)

    // Load more button click
    const handleLoadMore = () => {
        setLoadMore(true)
    }

    // Handle loading more articles
    useEffect(() => {
        if (loadMore && hasMore) {
            const currentLength = list.length
            const isMore = currentLength < data.posts.nodes.length
            const nextResults = isMore
                ? data.posts.nodes.slice(currentLength, currentLength + 3)
                : []
            setList([...list, ...nextResults])
            setLoadMore(false)
        }
    }, [loadMore, hasMore])

    //Check if there is more
    useEffect(() => {
        const isMore = list.length < data.posts.nodes.length
        setHasMore(isMore)
    }, [list])

    return (
        <Layout>
            <section className="px-12 py-8">
                <div className="mb-8">
                    <h1 className="text-5xl mb-12">{data.name}</h1>
                    <p>See all {data.posts.nodes.length} posts below</p>
                </div>
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
    );
}

export default PostCategory;