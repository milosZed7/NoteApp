import React from 'react';

import EditNote from './EditNote';
import ShowNote from './ShowNote';
import DeleteNote from './DeleteNote';

const Note = ({
    id,
    title,
    text,
    date,
    editNote,
    changeEditNote,
    saveNote,
    cancelEditingNote,
    noteEditMode,
    undoDeletedNote,
    deleteNote,
    showModal,
    mode,
    ...props
}) => {
    let renderingNote;
    renderingNote =
        mode === 'edit' ? (
            <EditNote
                id={id}
                title={title}
                text={text}
                changeEditNote={changeEditNote}
                noteEditMode={noteEditMode}
                saveNote={saveNote}
                cancelEditingNote={cancelEditingNote}
                type="list"
            />
        ) : mode === 'delete' ? (
            <DeleteNote undoDeletedNote={undoDeletedNote} id={id} />
        ) : (
            <ShowNote
                id={id}
                title={title}
                text={text}
                date={date}
                editNote={editNote}
                deleteNote={deleteNote}
                showModal={showModal}
            />
        );

    return <div className="note-holder">{renderingNote}</div>;
};

export default Note;
