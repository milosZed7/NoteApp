import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactDom from 'react-dom';
import EditNote from './EditNote';

const NoteModal = ({ saveNote, cancelEditingNote, noteEditMode, editNote, note, closeModal, changeEditNote, ...props }) => {
    const editNoteClick = evt => {
        evt.preventDefault();
        evt.stopPropagation();
        editNote(note.id, note.title, note.text, 'modal');
    };

    return ReactDom.createPortal(
        <div className="note-modal-wrapper">
            <CSSTransition classNames="show-modal" timeout={300} {...props}>
                <div className="note-modal">
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
                    <div className="close-modal" onClick={closeModal}>
                        ✖
                    </div>
                </div>
            </CSSTransition>
        </div>,
        document.body
    );
};

export default NoteModal;
