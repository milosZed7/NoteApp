import React from 'react';

const EditNote = props => {
    const changeNoteInput = evt => {
        props.changeEditNote(props.id, evt.target.value);
    };
    const saveNote = evt => {
        console.log(evt.keyCode, evt.button);
        if (!(evt.keyCode === 13 || evt.button === 0)) return;
        props.saveNote(props.id, props.noteEditMode.text);
    };
    return (
        <div className="edit-note">
            <textarea
                className={`note-input-text editing-note`}
                value={props.noteEditMode.text}
                onChange={changeNoteInput}
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
