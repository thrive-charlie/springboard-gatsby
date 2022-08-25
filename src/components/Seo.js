import React from 'react';
import {useSiteMetadata} from "../hooks/useSiteMetadata";

const Seo = ({title, pathname, children, yoast}) => {
    // Pull default data from gatsby-config.js
    const {title: defaultTitle, description: defaultDescription, image, siteUrl, twitterUsername} = useSiteMetadata();
    const seo = {
        title: title || defaultTitle,
        description: yoast.metaDesc || defaultDescription,
        keywords: yoast.keywords || null,
        image: `${siteUrl}${image}`,
        url: `${siteUrl}${pathname || ``}`,
        twitterUsername,
    }
    return (
        <>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description}/>
            {seo.keywords && <meta name="keywords" content={seo.keywords}/>}
            <meta name="image" content={seo.image}/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content={seo.title}/>
            <meta name="twitter:url" content={seo.url}/>
            <meta name="twitter:description" content={seo.description}/>
            <meta name="twitter:image" content={seo.image}/>
            <meta name="twitter:creator" content={seo.twitterUsername}/>
            <link rel="icon"
                  href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>"/>
            {children}
        </>
    )
};

export default Seo;