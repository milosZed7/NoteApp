import React from 'react';

const SearchNotes = props => {
    const setSearchValue = evt => {
        const searchValue = evt.target.value;
        const name = evt.target.name;
        props.setSearchValue(searchValue, name);
    };
    const reset = evt => {
        if (evt.button !== 0) return;
        props.resetSearch();
    };

    return (
        <div className="search-note-wrapper">
            <SearcByTextTitle setSearchValue={setSearchValue} value={props.searchTerm} name="searchTerm" />
            <div className="search-icon" onClick={reset}>
                {' '}
                <div>reset</div>{' '}
            </div>
            <SearchByDate
                setSearchValue={setSearchValue}
                name="searchDateFrom"
                value={props.searchDateFrom}
                placeholder="Date from..."
            />
            <SearchByDate
                setSearchValue={setSearchValue}
                name="searchDateTo"
                value={props.searchDateTo}
                placeholder="Date to..."
                aditionalStyleClass="note-search-date-to"
            />
        </div>
    );
};

const SearcByTextTitle = props => {
    return (
        <input
            type="text"
            name={props.name}
            value={props.value}
            placeholder="Search notes by title or text"
            className={`note-input-text note-search note-search-by-title-text`}
            onChange={props.setSearchValue}
        />
    );
};

const SearchByDate = props => {
    return (
        <input
            value={props.value}
            type="text"
            name={props.name}
            placeholder={props.placeholder}
            className={`note-input-text note-search note-search-by-date ${
                props.aditionalStyleClass ? props.aditionalStyleClass : ''
            }`}
            onChange={props.setSearchValue}
            onFocus={evt => (evt.target.type = 'date')}
            onBlur={evt => (evt.target.type = 'type')}
        />
    );
};

export default SearchNotes;
