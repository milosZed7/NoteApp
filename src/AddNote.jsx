import React from 'react';

class AddNote extends React.Component {
    render() {
        const btnClickedClass = this.props.saveBtnOn ? 'off-on-btn-clicked' : '';
        const ballTranslateClass = this.props.saveBtnOn ? 'translate-ball' : '';
        const opacitySaveBtnClass = this.props.saveBtnOn ? 'add-note-btn-opacity' : '';
        const translateNoteInputClass = this.props.saveBtnOn ? 'note-input-translate' : '';
        return (
            <div className={`add-note`}>
                <textarea className={`note-input ${translateNoteInputClass}`} placeholder="Add a note..."></textarea>
                <button className={`add-note-btn ${opacitySaveBtnClass}`}>Save note</button>
                <div className="save-type">
                    <div className="press-enter">Press <span>enter</span> to save</div>
                    <div className={`off-on-btn ${btnClickedClass}`} onClick={this.props.showSaveBtn}>
                        <div className={`ball ${ballTranslateClass}`}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNote;