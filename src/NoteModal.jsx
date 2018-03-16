import React from 'react';
import ReactDom from 'react-dom';
import EditNote from './EditNote';

const NoteModal = ({
    saveNote,
    cancelEditingNote,
    noteEditMode,
    animationClass,
    editNote,
    note,
    addClosingAnim,
    changeEditNote,
    disposeModal
}) => {
    const editNoteClick = evt => {
        evt.preventDefault();
        evt.stopPropagation();
        editNote(note.id, note.title, note.text, 'modal');
    };

    const dispose = evt => {
        if (evt.animationName === 'close-modal') {
            disposeModal();
        }
    };
    return ReactDom.createPortal(
        <div className="note-modal-wrapper">
            <div className={`note-modal ${animationClass}`} onAnimationEnd={dispose}>
                {noteEditMode.inModal ? (
                    <React.Fragment>
                        <div />
                        <EditNote
                            id={note.id}
                            title={note.title}
                            text={note.text}
                            changeEditNote={changeEditNote}
                            noteEditMode={noteEditMode}
                            saveNote={saveNote}
                            cancelEditingNote={cancelEditingNote}
                            type="modal"
                        />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div className="note-modal-title" onClick={editNoteClick}>
                            {note.title}
                        </div>
                        <div className="note-modal-text" onClick={editNoteClick}>
                            {note.text}
                        </div>
                    </React.Fragment>
                )}
                <div className="note-modal-date">{note.date}</div>
                <div className="close-modal" onClick={addClosingAnim}>
                    ✖
                </div>
            </div>
        </div>,
        document.body
    );
};

export default NoteModal;
