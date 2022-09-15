require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
        title: `Springboard`,
        description: `Example project for the Gatsby Head API`,
        twitterUsername: `@gatsbyjs`,
        image: `/gatsby-icon.png`,
        siteUrl: `https://www.yourdomain.tld`,
    },
    flags: {
        FAST_DEV: true,
        PARALLEL_SOURCING: true,
        DETECT_NODE_MUTATIONS: true,
    },
    plugins: [
        {
            resolve: 'gatsby-source-wordpress',
            options: {
                "url": process.env.WP_GRAPHQL
            }
        },
        {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
                "trackingId": "G-QMH4HLT3VK"
            }
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "images",
                "path": "./src/images/"
            },
            __key: "images"
        },
        {
            resolve: "gatsby-plugin-postcss",
            options: {
                postCssPlugins: [
                    require('postcss-import'),
                    require('tailwindcss'),
                    require('postcss-nested'),
                    require('autoprefixer'),
                ]
            }
        },
        {
            resolve: "gatsby-transformer-sharp",
            options: {
                checkSupportedExtensions: true,
            }
        },
        "gatsby-plugin-image",
        "gatsby-plugin-sitemap",
        "gatsby-plugin-sharp"
    ]
};