import React from 'react';

const AddNote = props => {
    const btnClickedClass = !props.saveBtnOn ? 'off-on-btn-clicked' : '';
    const ballTranslateClass = !props.saveBtnOn ? 'translate-ball' : '';
    const opacitySaveBtnClass = !props.saveBtnOn ? 'add-note-btn-opacity' : '';
    const translateNoteInputClass = !props.saveBtnOn ? 'note-input-translate' : '';
    return (
        <div className={`add-note`}>
            <input
                type="text"
                className="note-input-title"
                placeholder="Note title"
                maxLength="50"
                value={props.note.title}
                onChange={props.noteTitleChange}
            />
            <textarea
                className={`note-input-text transition-margin ${translateNoteInputClass}`}
                placeholder="Add a note..."
                value={props.note.text}
                onKeyUp={props.addNote}
                onChange={props.noteTextChange}
            />
            <button className={`add-note-btn ${opacitySaveBtnClass}`} onClick={props.addNote}>
                Save note
            </button>
            <div className="save-type">
                <div className="press-enter">
                    Press <span>enter</span> to save
                </div>
                <div className={`off-on-btn ${btnClickedClass}`} onClick={props.showSaveBtn}>
                    <div className={`ball ${ballTranslateClass}`} />
                </div>
            </div>
            <div
                className={`note-title-error ${props.noteTitleError ? 'note-title-error-show' : ''}`}
                onAnimationEnd={props.errorAnimationEnd}>
                Title empty
            </div>
            <div
                className={`note-text-error ${props.noteTextError ? 'note-text-error-show' : ''}`}
                onAnimationEnd={props.errorAnimationEnd}>
                Note content empty
            </div>
        </div>
    );
};

export default AddNote;
