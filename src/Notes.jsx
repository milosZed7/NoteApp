import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import fire from './fire';
import NoteList from './NoteList';
import AddNote from './AddNote';
import NoteModal from './NoteModal';
import Menu from './Menu';
import SearchNotes from './SearchNotes';
const TIME_LEFT_TO_DELETE_NOTE = 4 * 1000;

class Notes extends React.Component {
    state = {
        notes: [
            { id: 1, text: 'first note', date: '14.02.2018.', title: 'Note title1' },
            { id: 2, text: 'second note', date: '14.02.2018.', title: 'Note title2' }
        ],
        notesSearched: [],
        saveBtnOn: true,
        noteTitleError: false,
        noteTextError: false,
        noteEditMode: { id: null, text: '', title: '', inModal: false, inList: false },
        deletedNotes: [],
        modalOn: false,
        noteInModal: {},
        newNote: {
            title: '',
            text: '',
            date: '',
            id: ''
        },
        searchTerm: ''
    };
    componentWillMount() {
        let notesRef = fire
            .database()
            .ref('notes')
            .orderByKey();
        notesRef.on('child_added', snapshot => {
            /* Update React state when message is added at Firebase Database */
            let note = { text: snapshot.val(), id: snapshot.key };
            console.log(note);
            this.setState({ notes: [note.text].concat(this.state.notes) });
        });
    }
    resetNote = () => {
        return {
            title: '',
            text: ''
        };
    };
    mapNotesToNotesWithMode = () => {
        const list =
            this.state.notesSearched.length || this.state.searchTerm ? [...this.state.notesSearched] : [...this.state.notes];
        // console.log([...this.state.notesSearched], [...this.state.notes]);
        const { noteEditMode, deletedNotes } = this.state;
        return list.map(note => {
            let mode =
                noteEditMode.id === note.id && noteEditMode.inList
                    ? 'edit'
                    : deletedNotes.some(n => n.id === note.id) ? 'delete' : 'show';
            note['mode'] = mode;
            return note;
        });
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
            const newNotes = [newNote].concat(this.state.notes);
            fire
                .database()
                .ref('notes')
                .push(newNote);
            this.setState({
                newNote: this.resetNote(),
                notes: newNotes,
                noteTextError: false,
                noteTitleError: false,
                notesSearched: this.getUpdatedSearchList(this.state.searchTerm, newNotes)
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
    editNote = (id, title, text, type) => {
        const newEditNote = Object.assign({}, this.state.noteEditMode, {
            id,
            title,
            text,
            inList: type === 'list',
            inModal: type === 'modal'
        });
        this.setState({
            noteEditMode: newEditNote
        });
    };

    changeEditNote = (id, value, type, propName) => {
        const newEditNote = Object.assign({}, this.state.noteEditMode, {
            id,
            [propName]: value,
            inList: type === 'list',
            inModal: type === 'modal'
        });
        this.setState({
            noteEditMode: newEditNote
        });
    };

    saveNote = (id, text, title) => {
        const notes = [...this.state.notes];
        const note = notes.find(note => note.id === id);
        note.text = text.trim() ? text.trim() : note.text;
        note.title = title.trim() ? title.trim() : note.title;
        this.setState({
            notes,
            noteEditMode: { id: null, text: '', title: '' },
            noteInModal: note,
            notesSearched: this.getUpdatedSearchList(this.state.searchTerm)
        });
    };

    cancelEditingNote = () => {
        this.setState({
            noteEditMode: { id: null, text: '', title: '' }
        });
    };

    deleteNote = id => {
        const timeOutId = setTimeout(() => {
            this.setState({
                notes: this.state.notes.filter(note => note.id !== id),
                notesSearched: this.state.notesSearched.filter(note => note.id !== id)
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
            noteInModal: note,
            noteEditMode: Object.assign({}, this.state.noteEditMode, { inList: false, inModal: false })
        });
    };
    closeModal = () => {
        this.setState({
            modalOn: false,
            noteInModal: {}
        });
    };
    setSearchTerm = term => {
        const newNotes = this.getUpdatedSearchList(term);
        this.setState({
            searchTerm: term,
            notesSearched: newNotes
        });
    };
    getUpdatedSearchList = (term, notes) => {
        let notesCopy = notes ? notes : [...this.state.notes];
        const newNotes = notesCopy.filter(note => {
            if (!term) return false;
            return `${note.title} ${note.text}`.toLowerCase().indexOf(term.toLowerCase()) !== -1;
        });
        return newNotes;
    };
    render() {
        let showNoteModal;
        if (this.state.modalOn) {
            showNoteModal = (
                <NoteModal
                    note={this.state.noteInModal}
                    closeModal={this.closeModal}
                    editNote={this.editNote}
                    noteEditMode={this.state.noteEditMode}
                    saveNote={this.saveNote}
                    changeEditNote={this.changeEditNote}
                    cancelEditingNote={this.cancelEditingNote}
                />
            );
        }
        return (
            <React.Fragment>
                <Menu />
                <TransitionGroup> {showNoteModal}</TransitionGroup>
                <div className="note-component">
                    <div className="note-wrapper">
                        <SearchNotes setSearchTerm={this.setSearchTerm} />
                        <NoteList
                            notes={this.mapNotesToNotesWithMode()}
                            noteEditMode={this.state.noteEditMode}
                            onEditNote={this.editNote}
                            changeEditNote={this.changeEditNote}
                            saveNote={this.saveNote}
                            cancelEditingNote={this.cancelEditingNote}
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
