# Springboard - Gatsby Edition
Springboard is a WordPress starter for Gatsby with support for ACF Flexible content fields.
Features:
- Basic GraphQL query setup for pulling posts and pages from WordPress
- Uses image sharp plugin to resize, optimize and lazy load images
- Has an extendable 'Block Builder' to take ACF flexible content fields and output them as Components
- Pulls in a header and footer navigation from WP Menus
- Supports ACF Options pages (see footer for example)
- Uses Yoast SEO data and outputs in custom SEO component (see ./src/components/Seo.js)
- Tailwind and PostCSS support
- Post archives with categories and load more
- 
Upcoming features:
- Example custom post type query for gatsby-node.js
- Forms and handlers
- WordPress companion theme to help setup WordPress ready for Gatsby use
- Google Analytics integration

## Things to note:
- When adding new posts to a category, you may need to save the category again for Gatsby to pick up the change
- New queries need to be added to gatsby-node for each post type, post type archive and custom taxonomies