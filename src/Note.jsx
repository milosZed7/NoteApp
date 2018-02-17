import React from 'react';
import EditNote from './EditNote';
import ShowNote from './ShowNote';
import DeleteNote from './DeleteNote';

const Note = props => {
    let renderingNote;
    if (props.noteEditMode.id !== props.id) {
        renderingNote = props.deletedNotes.some(note => note.id === props.id) ? (
            <DeleteNote undoDeletedNote={props.undoDeletedNote} id={props.id} />
        ) : (
            <ShowNote
                id={props.id}
                title={props.title}
                text={props.text}
                date={props.date}
                editNote={props.editNote}
                deleteNote={props.deleteNote}
            />
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
