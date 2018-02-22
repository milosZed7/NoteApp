import React from 'react';

const ShowNote = props => {
    const showNoteInModal = () => {
        const note = {
            id: props.id,
            text: props.text,
            title: props.title,
            date: props.date
        };
        props.showModal(note);
    };
    const deleteNoteClick = evt => {
        evt.preventDefault();
        evt.stopPropagation();
        props.deleteNote(props.id);
    };
    const editNoteClick = evt => {
        evt.preventDefault();
        evt.stopPropagation();
        props.editNote(props.id, props.title, props.text, 'list');
    };
    return (
        <div className="note" onClick={showNoteInModal}>
            <div className="note-content">
                <div className="text">{props.text}</div>
                <div className="title">{props.title}</div>
                <div className="date">{props.date}</div>
            </div>
            <div className="note-slider">
                <div className="slider-item delete" onClick={deleteNoteClick}>
                    delete
                </div>
                <div className="slider-item edit" onClick={editNoteClick}>
                    edit
                </div>
            </div>
        </div>
    );
};

export default ShowNote;
