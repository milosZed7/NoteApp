import React from 'react';

const EditNote = props => {
    const changeNoteText = evt => {
        props.changeEditNote(props.id, evt.target.value, props.type, 'text');
    };
    const changeNoteTitle = evt => {
        props.changeEditNote(props.id, evt.target.value, props.type, 'title');
    };
    const saveNote = evt => {
        if (!(evt.keyCode === 13 || evt.button === 0)) return;
        props.saveNote(props.id, props.noteEditMode.text, props.noteEditMode.title);
    };
    return (
        <div className={`edit-note ${props.type === 'modal' ? 'edit-note-modal' : ''}`}>
            {props.type === 'modal' ? (
                <input
                    type="text"
                    className="note-input-title editing-note"
                    placeholder="Edit Note Title"
                    maxLength="50"
                    value={props.noteEditMode.title}
                    onChange={changeNoteTitle}
                />
            ) : (
                <React.Fragment />
            )}
            <textarea
                placeholder="Edit Note Text"
                className={`note-input-text editing-note`}
                value={props.noteEditMode.text}
                onChange={changeNoteText}
                onKeyUp={saveNote}
            />
            <div className="cancel-edit" onClick={props.cancelEditingNote}>
                cancel
            </div>
            <div className="save-edited-note">
                Press <span>enter</span> to <span onClick={saveNote}>save</span>
            </div>
        </div>
    );
};

export default EditNote;
