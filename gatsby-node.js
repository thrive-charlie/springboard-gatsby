exports.createPages = async ({actions, graphql, reporter}) => {
    // Run Async functions that fetch data from WP and import into Gatsby.
    await createWpPages(actions, graphql, reporter);
    await createWpPostPages(actions, graphql, reporter);
    await createWpPostCategories(actions, graphql, reporter);
    await createWpListingPages(actions, graphql, reporter);
};

// Create Pages Functions

/**
 * Create WordPress pages as Gatsby Pages
 *
 * @param actions
 * @param graphql
 * @param reporter
 * @returns {Promise<void>}
 */
const createWpPages = async (actions, graphql, reporter) => {
    const pageResult = await graphql(`
        {
          allWpPage {
            nodes {
              id
              title
              uri
              template {
                templateName
              }
              header {
                title
                content
                image {
                    altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData(width: 1800, placeholder: BLURRED, formats: [AUTO, WEBP])
                    }
                  }
                }
              }
              blocks {
                blocks {
                  ... on WpPage_Blocks_Blocks_ContentImage {
                    fieldGroupName
                    title
                    content
                    ctaText
                    cta {
                      url
                    }
                    image {
                      localFile {
                        childImageSharp {
                          gatsbyImageData(width: 1200, placeholder: BLURRED, formats: [AUTO, WEBP])
                        }
                      }
                    }
                  }
                  ... on WpPage_Blocks_Blocks_Gallery {
                    fieldGroupName
                    gallery {
                      caption
                      image {
                        localFile {
                          childImageSharp {
                            gatsbyImageData(width: 1200, placeholder: BLURRED, formats: [AUTO, WEBP])
                          }
                        }
                      }
                    }
                  }
                  ... on WpPage_Blocks_Blocks_ContentTestimonials {
                    fieldGroupName
                    title
                    content
                    testimonials {
                      name
                      company
                      testimonial
                    }
                  }
                }
              }
              seo {
                canonical
                title
                metaDesc
                metaKeywords
                twitterTitle
                twitterImage {
                  mediaItemUrl
                  altText
                }
              }
            }
          }
        }
    `);

    if (pageResult.errors) {
        reporter.error('There was an error fetching pages', pageResult.errors);
    }

    const {allWpPage} = pageResult.data;

    // Define the page templates to use
    const pageTemplate = require.resolve(`./src/templates/Page.js`);

    if (allWpPage.nodes.length) {
        allWpPage.nodes.map((page) => {
            actions.createPage({
                path: page.uri,
                component: pageTemplate,
                context: page,
            });
        });
    }
};

/**
 * Create WordPress posts as Gatsby Pages
 *
 * @param actions
 * @param graphql
 * @param report
 * @returns {Promise<void>}
 */
const createWpPostPages = async (actions, graphql, reporter) => {
    const postResult = await graphql(`
        {
            allWpPost {
                nodes {
                    id
                    title
                    content
                    date
                    uri
                    featuredImage {
                        node {
                            altText
                            localFile {
                                childImageSharp {
                                    gatsbyImageData(formats: [WEBP, AUTO], width: 2000, height: 400)
                                }
                            }
                        }
                    }
                    seo {
                        canonical
                        title
                        metaDesc
                        metaKeywords
                        twitterTitle
                        twitterImage {
                            mediaItemUrl
                            altText
                        }
                    }
                }
            }
        }
    `);

    if (postResult.errors) {
        reporter.error('There was an error fetching posts', postResult.errors);
    }

    const {allWpPost} = postResult.data;

    // Define the work template to use
    const postTemplate = require.resolve('./src/templates/Post.js');

    if (allWpPost.nodes.length) {
        allWpPost.nodes.map((page) => {
            actions.createPage({
                path: `/blog${page.uri}`,
                component: postTemplate,
                context: page,
            });
        });
    }
};

/**
 * Creates category pages as Gatsby Pages
 *
 * @param actions
 * @param graphql
 * @param reporter
 * @returns {Promise<void>}
 */
const createWpPostCategories = async (actions, graphql, reporter) => {

    const postCategories = await graphql(`
        {
          allWpCategory {
            nodes {
              id
              name
              slug
              posts {
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
                }
              }
            }
          }
        }
    `);

    if (postCategories.errors) {
        reporter.error('There was an error fetching posts', postCategories.errors);
    }

    const {allWpCategory} = postCategories.data;

    // Define the work template to use
    const postTemplate = require.resolve('./src/templates/PostCategory.js');

    if (allWpCategory.nodes.length) {
        allWpCategory.nodes.map((category) => {
            actions.createPage({
                path: `/blog/${category.slug}`,
                component: postTemplate,
                context: category,
            });
        });
    }

};


const createWpListingPages = async (actions, graphql, reporter) => {
    const listingsResult = await graphql(`
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

    if (listingsResult.errors) {
        reporter.error('There was an error fetching listings', listingsResult.errors);
    }

    const {allWpListing} = listingsResult.data;

    // Define the work template to use
    const template = require.resolve('./src/templates/Listing.js');

    if (allWpListing.nodes.length) {
        allWpListing.nodes.map((page) => {
            actions.createPage({
                path: `/listings/${page.slug}`,
                component: template,
                context: page,
            });
        });
    }
}