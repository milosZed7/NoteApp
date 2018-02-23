import React from 'react';

const SearchNotes = props => {
    return (
        <div className="search-note-wrapper">
            <input type="text" placeholder="Search notes by title or text" class="note-input-text note-search" />
            <i class="fas fa-search search-icon" />
        </div>
    );
};

export default SearchNotes;
