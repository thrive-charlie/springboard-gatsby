exports.createPages = async ({actions, graphql, reporter}) => {
    // Run Async functions that fetch data from WP and import into Gatsby.
    await createWpPages(actions, graphql, reporter);
    await createWpPostPages(actions, graphql, reporter);
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
    const pageTemplate = require.resolve(`./src/templates/page.js`);

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
const createWpPostPages = async (actions, graphql, report) => {
    const postResult = await graphql(`
        {
            allWpPost {
                nodes {
                    id
                    title
                    content
                    date
                    uri
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
    const postTemplate = require.resolve('./src/templates/post.js');

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
