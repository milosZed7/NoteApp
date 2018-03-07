import React from 'react';

const SearchNotes = props => {
    const setSearchTerm = evt => {
        const term = evt.target.value;
        props.setSearchTerm(term);
    };
    const reset = evt => {
        if (evt.button !== 0) return;
        props.resetSearch();
    };
    return (
        <div className="search-note-wrapper">
            <SearcByTextTitle setSearchTerm={setSearchTerm} value={props.searchTerm} />
            <div className="search-icon" onClick={reset}>
                {' '}
                <div>reset</div>{' '}
            </div>
            <SearchByDate setSearchTerm={setSearchTerm} placeholder="Date from..." />
            <SearchByDate setSearchTerm={setSearchTerm} placeholder="Date to..." aditionalStyleClass="note-search-date-to" />
        </div>
    );
};

const SearcByTextTitle = props => {
    return (
        <input
            type="text"
            value={props.value}
            placeholder="Search notes by title or text"
            className={`note-input-text note-search note-search-by-title-text`}
            onChange={props.setSearchTerm}
        />
    );
};

const SearchByDate = props => {
    return (
        <input
            type="text"
            placeholder={props.placeholder}
            className={`note-input-text note-search ${props.aditionalStyleClass ? props.aditionalStyleClass : ''}`}
            onChange={props.setSearchTerm}
            onFocus={evt => (evt.target.type = 'date')}
            onBlur={evt => (evt.target.type = 'type')}
        />
    );
};

export default SearchNotes;
