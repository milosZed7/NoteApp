import React from 'react';

const DeleteNote = props => {
    return (
        <div className="delete-note">
            <div>
                Note deleted. <span onClick={() => props.undoDeletedNote(props.id)}>Undo</span>
            </div>
        </div>
    );
};

export default DeleteNote;
