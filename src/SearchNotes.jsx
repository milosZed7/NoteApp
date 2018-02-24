import React from 'react';

const SearchNotes = props => {
    const setSearchTerm = evt => {
        const term = evt.target.value;
        props.setSearchTerm(term);
    };

    return (
        <div className="search-note-wrapper">
            <input
                type="text"
                placeholder="Search notes by title or text"
                className="note-input-text note-search"
                onChange={setSearchTerm}
            />
            <i className="fas fa-search search-icon" />
        </div>
    );
};

export default SearchNotes;
