import React from 'react';

const ShowNote = props => {
    return (
        <div className="note">
            <div className="note-content">
                <div className="text">{props.text}</div>
                <div className="title">{props.title}</div>
                <div className="date">{props.date}</div>
            </div>
            <div className="note-slider">
                <div className="slider-item delete" onClick={() => props.deleteNote(props.id)}>
                    delete
                </div>
                <div
                    className="slider-item edit"
                    onClick={() => {
                        props.editNote(props.id, props.text);
                    }}>
                    edit
                </div>
            </div>
        </div>
    );
};

export default ShowNote;
