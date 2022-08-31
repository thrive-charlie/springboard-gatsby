import React from 'react';

const Content = ({content}) => {
    return (
        <div className="content"
             dangerouslySetInnerHTML={{__html: content}}
        />
    )
};

export default Content;