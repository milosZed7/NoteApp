import React from 'react';
import Note from './Note';

class NoteList extends React.Component {
    mapNotes = note => {
        return (
            <Note
                key={note.id}
                id={note.id}
                title={note.title}
                text={note.text}
                date={note.date}
                editNote={this.props.onEditNote}
                changeEditNote={this.props.changeEditNote}
                noteEditMode={this.props.noteEditMode}
                saveNote={this.props.saveNote}
                cancelEditingNote={this.props.cancelEditingNote}
                deleteNote={this.props.deleteNote}
                undoDeletedNote={this.props.undoDeletedNote}
                showModal={this.props.showModal}
                mode={note.mode}
            />
        );
    };
    render() {
        return (
            <div className="note-list" ref={this.props.setNoteList}>
                {this.props.notes.map(this.mapNotes)}
            </div>
        );
    }
}

export default NoteList;
