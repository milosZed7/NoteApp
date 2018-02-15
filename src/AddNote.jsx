import React from 'react';

class AddNote extends React.Component {
    render() {
        const btnClickedClass = !this.props.saveBtnOn ? 'off-on-btn-clicked' : '';
        const ballTranslateClass = !this.props.saveBtnOn ? 'translate-ball' : '';
        const opacitySaveBtnClass = !this.props.saveBtnOn ? 'add-note-btn-opacity' : '';
        const translateNoteInputClass = !this.props.saveBtnOn ? 'note-input-translate' : '';
        return (
            <div className={`add-note`}>
                <input
                    type="text"
                    className="note-input-title"
                    placeholder="Note title"
                    maxLength="50"
                    value={this.props.note.title}
                    onChange={this.props.noteTitleChange}
                />
                <textarea
                    className={`note-input-text ${translateNoteInputClass}`}
                    placeholder="Add a note..."
                    value={this.props.note.text}
                    onKeyUp={this.props.addNote}
                    onChange={this.props.noteTextChange}
                />
                <button className={`add-note-btn ${opacitySaveBtnClass}`} onClick={this.props.addNote}>
                    Save note
                </button>
                <div className="save-type">
                    <div className="press-enter">
                        Press <span>enter</span> to save
                    </div>
                    <div className={`off-on-btn ${btnClickedClass}`} onClick={this.props.showSaveBtn}>
                        <div className={`ball ${ballTranslateClass}`} />
                    </div>
                </div>
                <div className={`note-title-error ${this.props.noteTitleError ? 'note-title-error-show' : ''}`}>
                    Title empty
                </div>
                <div className={`note-text-error ${this.props.noteTextError ? 'note-text-error-show' : ''}`}>
                    Note content empty
                </div>
            </div>
        );
    }
}

export default AddNote;
