import React from 'react';

const EditNote = props => {
    return (
        <div className="edit-note">
            <textarea className={`note-input-text editing-note`} value={props.text} />
            <div className="cancel-edit">cancel</div>
            <div className="save-edited-note">
                Press <span>enter</span> to <span>save</span>
            </div>
        </div>
    );
};

export default EditNote;
