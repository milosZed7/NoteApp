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
                editNoteId={props.editNoteId}
            />
        );
    };
    return <div className="note-list">{props.notes.map(mapNotes)}</div>;
};

export default NoteList;
