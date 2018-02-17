import React from 'react';
import EditNote from './EditNote';
import ShowNote from './ShowNote';

const Note = props => {
    let renderingNote;
    if (props.editNoteId !== props.id) {
        renderingNote = (
            <ShowNote
                id={props.id}
                title={props.title}
                text={props.text}
                date={props.date}
                editNote={props.editNote}
                editNoteId={props.editNoteId}
            />
        );
    } else {
        renderingNote = <EditNote id={props.id} title={props.title} text={props.text} />;
    }

    return <div className="note-holder">{renderingNote}</div>;
};

export default Note;
