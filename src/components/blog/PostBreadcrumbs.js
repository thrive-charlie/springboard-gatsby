import React from 'react';
import {Link} from "gatsby";
import {BiChevronsRight} from "react-icons/bi";

const PostBreadcrumbs = ({currentPageTitle}) => {
    return (
        <div className="mb-8 flex items-center">
            <Link to="/" className="mr-2">Home</Link>
            <BiChevronsRight className="mr-2 w-6 h-6"/>
            <Link to="/blog" className="mr-2">Blog</Link>
            <BiChevronsRight className="mr-2 w-6 h-6"/>
            <span className="mr-2">{currentPageTitle}</span>
        </div>
    );
}

export default PostBreadcrumbs;