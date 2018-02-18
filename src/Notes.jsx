import React from 'react';
import NoteList from './NoteList';
import AddNote from './AddNote';
import NoteModal from './NoteModal';
import { TransitionGroup } from 'react-transition-group';

const TIME_LEFT_TO_DELETE_NOTE = 4 * 1000;

class Notes extends React.Component {
    state = {
        notes: [
            { id: 1, text: 'first note', date: '14.02.2018.', title: 'Note title1' },
            { id: 2, text: 'second note', date: '14.02.2018.', title: 'Note title2' }
        ],
        saveBtnOn: true,
        noteTitleError: false,
        noteTextError: false,
        noteEditMode: { id: null, text: '' },
        deletedNotes: [],
        modalOn: false,
        noteInModal: {},
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
            text: ''
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
            newNote.text = newNote.text.trim();
            this.setState({
                newNote: this.resetNote(),
                notes: [newNote].concat(this.state.notes),
                noteTextError: false,
                noteTitleError: false
            });
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
    editNote = (id, text) => {
        const newEditNote = Object.assign({}, this.state.noteEditMode, { id, text });
        this.setState({
            noteEditMode: newEditNote
        });
    };
    saveNote = (id, text) => {
        console.log(id);
        const notes = [...this.state.notes];
        const note = notes.find(note => note.id === id);
        note.text = text.trim();
        this.setState({
            notes,
            noteEditMode: { id: null, text: '' }
        });
    };

    cancelEditingNote = () => {
        this.setState({
            noteEditMode: { id: null, text: '' }
        });
    };

    deleteNote = id => {
        const timeOutId = setTimeout(() => {
            this.setState({
                notes: this.state.notes.filter(note => note.id !== id)
            });
        }, TIME_LEFT_TO_DELETE_NOTE);

        const note = {
            id,
            timeOutId
        };
        this.setState({
            deletedNotes: this.state.deletedNotes.concat(note)
        });
    };
    undoDeletedNote = undoId => {
        const note = this.state.deletedNotes.find(note => note.id === undoId);
        clearTimeout(note.timeOutId);
        this.setState({
            deletedNotes: this.state.deletedNotes.filter(note => note.id !== undoId)
        });
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
    showModal = note => {
        this.setState({
            modalOn: true,
            noteInModal: note
        });
    };
    closeModal = () => {
        this.setState({
            modalOn: false,
            noteInModal: {}
        });
    };
    render() {
        let showNoteModal;
        if (this.state.modalOn) {
            showNoteModal = <NoteModal note={this.state.noteInModal} closeModal={this.closeModal} />;
        }
        return (
            <React.Fragment>
                <TransitionGroup> {showNoteModal}</TransitionGroup>

                <div className="note-component">
                    <div className="note-wrapper">
                        <NoteList
                            notes={this.state.notes}
                            noteEditMode={this.state.noteEditMode}
                            onEditNote={this.editNote}
                            saveNote={this.saveNote}
                            cancelEditingNote={this.cancelEditingNote}
                            deletedNotes={this.state.deletedNotes}
                            deleteNote={this.deleteNote}
                            undoDeletedNote={this.undoDeletedNote}
                            showModal={this.showModal}
                        />
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
            </React.Fragment>
        );
    }
}

export default Notes;
