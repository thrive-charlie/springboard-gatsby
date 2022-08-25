import {graphql, useStaticQuery} from "gatsby"

export const useSiteMetadata = () => {
    const data = useStaticQuery(graphql`
        {
            site {
                siteMetadata {
                    title
                    description
                    twitterUsername
                    image
                    siteUrl
                }
            }
        }
    `)
    return data.site.siteMetadata
}