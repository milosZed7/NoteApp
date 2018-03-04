import React from 'react';
import Menu from './Menu';
import authorImate from './images/authorImage.jpg';
const AboutAuthor = props => {
    return (
        <React.Fragment>
            <Menu {...props} />
            <div className="author-wrapper">
                <h1 className="author-title">Milos Zjajic</h1>
                <div className="author-content">
                    <img className="author-img" src={authorImate} alt={'Author'} />
                    <div className="author-text">O autoru</div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AboutAuthor;
