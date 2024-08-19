import React from 'react';

const ExternalLink = ({ href }) => {
    const openLink = (e) => {
        e.preventDefault();
        window.open(href, '_blank');
    };

    return (
        <a href={href} onClick={openLink} target="_blank" rel="noopener noreferrer">外部链接</a>
    );
};

export default ExternalLink;