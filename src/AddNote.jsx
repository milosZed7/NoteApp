import React from 'react';

const AddNote = props => {
    const btnClickedClass = !props.saveBtnOn ? 'off-on-btn-clicked' : '';
    const ballTranslateClass = !props.saveBtnOn ? 'translate-ball' : '';
    const opacitySaveBtnClass = !props.saveBtnOn ? 'add-note-btn-opacity' : '';
    const translateNoteInputClass = !props.saveBtnOn ? 'note-input-translate' : '';
    const onChange = evt => {
        let value = evt.target.value;
        const name = evt.target.name;
        if (props.saveBtnOn) {
            value = evt.target.value.replace(/(\r\n|\n|\r)/gm, '');
        }
        props.noteTitleTextChange(name, value);
    };

    const showSaveBtn = evt => {
        if (evt.button !== 0) return;
        props.showSaveBtn();
    };
    const addNote = evt => {
        if ((props.saveBtnOn && evt.keyCode === 13) || evt.button === 0) {
            props.addNote();
        }
    };
    return (
        <div className={`add-note`}>
            <input
                type="text"
                className="note-input-title"
                placeholder="Note title"
                maxLength="50"
                name="title"
                value={props.note.title}
                onChange={onChange}
            />
            <textarea
                className={`note-input-text transition-margin ${translateNoteInputClass}`}
                placeholder="Add a note..."
                name="text"
                value={props.note.text}
                onKeyUp={addNote}
                onChange={onChange}
            />
            <button className={`add-note-btn ${opacitySaveBtnClass}`} onClick={addNote}>
                Add note
            </button>
            <div className="save-type">
                <div className="press-enter">
                    Press <span>enter</span> to add
                </div>
                <div className={`off-on-btn ${btnClickedClass}`} onClick={showSaveBtn}>
                    <div className={`ball ${ballTranslateClass}`} />
                </div>
            </div>
        </div>
    );
};

export default AddNote;
