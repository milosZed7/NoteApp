import React from 'react';
import EditNote from './EditNote';
import ShowNote from './ShowNote';

const Note = props => {
    let renderingNote;
    if (props.noteEditMode.id !== props.id) {
        renderingNote = (
            <ShowNote id={props.id} title={props.title} text={props.text} date={props.date} editNote={props.editNote} />
        );
    } else {
        renderingNote = (
            <EditNote
                id={props.id}
                title={props.title}
                text={props.text}
                changeEditNote={props.editNote}
                noteEditMode={props.noteEditMode}
                saveNote={props.saveNote}
                cancelEditingNote={props.cancelEditingNote}
            />
        );
    }

    return <div className="note-holder">{renderingNote}</div>;
};

export default Note;
