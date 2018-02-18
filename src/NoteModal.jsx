import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactDom from 'react-dom';

const NoteModal = ({ note, closeModal, ...props }) => {
    return ReactDom.createPortal(
        <div className="note-modal-wrapper">
            <CSSTransition classNames="show-modal" timeout={300} {...props}>
                <div className="note-modal">
                    <div className="note-modal-title">{note.title}</div>
                    <div className="note-modal-text">{note.text}</div>
                    <div className="note-modal-date">{note.date}</div>
                    <div className="close-modal" onClick={closeModal}>
                        x
                    </div>
                </div>
            </CSSTransition>
        </div>,
        document.body
    );
};

export default NoteModal;
