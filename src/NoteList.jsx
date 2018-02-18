import React from 'react';
import Note from './Note';

const NoteList = props => {
    const mapNotes = note => {
        return (
            <Note
                key={note.id}
                id={note.id}
                title={note.title}
                text={note.text}
                date={note.date}
                editNote={props.onEditNote}
                noteEditMode={props.noteEditMode}
                saveNote={props.saveNote}
                cancelEditingNote={props.cancelEditingNote}
                deletedNotes={props.deletedNotes}
                deleteNote={props.deleteNote}
                undoDeletedNote={props.undoDeletedNote}
                showModal={props.showModal}
            />
        );
    };
    return <div className="note-list">{props.notes.map(mapNotes)}</div>;
};

export default NoteList;
