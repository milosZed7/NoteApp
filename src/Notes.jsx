import React from 'react';
import NoteList from './NoteList';
import AddNote from './AddNote';
class Notes extends React.Component {
    state = {
        notes: [
            { id: 1, text: 'first note', date: '14.02.2018.', title: 'Note title1' },
            { id: 2, text: 'second note', date: '14.02.2018.', title: 'Note title2' }
        ],
        saveBtnOn: true,
        noteTitleError: false,
        noteTextError: false,
        newNote: {
            title: '',
            text: '',
            date: '',
            id: ''
        }
    };
    resetNote = () => {
        return {
            title: '',
            text: '',
            date: '',
            id: ''
        };
    };

    showSaveBtn = evt => {
        if (evt.button !== 0) return;
        this.setState({
            saveBtnOn: !this.state.saveBtnOn
        });
    };

    noteTextChange = evt => {
        this.setState({
            newNote: Object.assign({}, this.state.newNote, { text: evt.target.value })
        });
    };
    noteTitleChange = evt => {
        this.setState({
            newNote: Object.assign({}, this.state.newNote, { title: evt.target.value })
        });
    };
    addNote = evt => {
        if ((this.state.saveBtnOn && evt.keyCode === 13) || evt.button === 0) {
            const newNote = Object.assign({}, this.state.newNote);
            const titleEmpty = !newNote.title.trim();
            const textEmpty = !newNote.text.trim();
            if (titleEmpty || textEmpty) {
                this.setState({
                    newNote: {
                        title: titleEmpty ? '' : newNote.title,
                        text: textEmpty ? '' : newNote.text
                    },
                    noteTextError: textEmpty,
                    noteTitleError: titleEmpty
                });
                return;
            }

            newNote.date = getDate();
            newNote.id = genId.bind(this)();
            this.setState({
                newNote: this.resetNote(),
                notes: [newNote].concat(this.state.notes),
                noteTextError: false,
                noteTitleError: false
            });

            //  const noteList = evt.target.parentElement.previousSibling;
            //  scrollNoteListToEnd(noteList);
        }

        function genId() {
            let number = Math.floor(Math.random() * 900);
            if (this.state.notes.some(note => note.id === number)) {
                number = genId.bind(this)();
            }
            return number;
        }

        function getDate() {
            const date = new Date();
            const day = date.getDate();
            const mounth = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day < 10 ? '0' + day : day}.${mounth < 10 ? '0' + mounth : mounth}.${year}.`;
        }
    };

    errorAnimationEnd = evt => {
        if (evt.animationName !== 'show-error') return;
        const classList = evt.target.classList;

        if (classList.contains('note-text-error')) {
            this.setState({
                noteTextError: false
            });
        } else if (classList.contains('note-title-error')) {
            this.setState({
                noteTitleError: false
            });
        }
    };

    render() {
        return (
            <div className="note-component">
                <div className="note-wrapper">
                    <NoteList notes={this.state.notes} />
                    <AddNote
                        showSaveBtn={this.showSaveBtn}
                        saveBtnOn={this.state.saveBtnOn}
                        note={this.state.newNote}
                        addNote={this.addNote}
                        noteTitleChange={this.noteTitleChange}
                        noteTextChange={this.noteTextChange}
                        noteTextError={this.state.noteTextError}
                        noteTitleError={this.state.noteTitleError}
                        errorAnimationEnd={this.errorAnimationEnd}
                    />
                </div>
            </div>
        );
    }
}

export default Notes;
