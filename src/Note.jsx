import React from 'react';

const Note = (props) => {
    return (
        <div className="note">
            <div className="note-content">
                <div className="text">
                    {props.text}
                </div>
                <div className="title">{props.title}</div>
                <div className="date">{props.date}</div>
            </div>
            <div className="note-slider">
                <div className="slider-item delete">delete</div>
                <div className="slider-item edit">edit</div>
            </div>
        </div>
    );
};

export default Note;