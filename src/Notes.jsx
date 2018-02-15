import React from 'react';
import NoteList from './NoteList';
import AddNote from './AddNote';
class Notes extends React.Component {

    state = {
        notes: [
            { id: 1, text: 'first note', date: '14.02.2018.', title: 'Note title1' },
            { id: 2, text: 'second note', date: '14.02.2018.', title: 'Note title2' },
            { id: 3, text: 'third note', date: '14.02.2018.', title: 'Note title3' },
            { id: 4, text: 'third note', date: '14.02.2018.', title: 'Note title3' },
            { id: 5, text: 'third note', date: '14.02.2018.', title: 'Note title3' },
            { id: 6, text: 'third note', date: '14.02.2018.', title: 'Note title3' },
            { id: 7, text: 'third note', date: '14.02.2018.', title: 'Note title3' }
        ],
        saveBtnOn: false,
    };

    showSaveBtn = (evt) => {
        if (evt.button !== 0) return;
        this.setState({
            saveBtnOn: !this.state.saveBtnOn
        });
    }

    render() {
        return (
            <div className="note-component">
                <div className="note-wrapper">
                    <NoteList notes={this.state.notes} />
                    <AddNote showSaveBtn={this.showSaveBtn} saveBtnOn={this.state.saveBtnOn} />
                </div>
            </div>
        );
    }
}

export default Notes;