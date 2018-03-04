import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import fire from './fire';
import NoteList from './NoteList';
import AddNote from './AddNote';
import NoteModal from './NoteModal';
import Menu from './Menu';
import SearchNotes from './SearchNotes';
import { getUserUid } from './LocalStorageApi';
import notify from './NotificationManager';

const TIME_LEFT_TO_DELETE_NOTE = 4 * 1000;

class Notes extends React.Component {
    state = {
        notes: [],
        notesSearched: [],
        saveBtnOn: true,
        noteEditMode: { id: null, text: '', title: '', inModal: false, inList: false },
        deletedNotes: [],
        modalOn: false,
        noteInModal: {},
        newNote: {
            title: '',
            text: '',
            date: ''
        },
        searchTerm: ''
    };
    componentWillMount() {
        let notesRef = fire.database().ref(`notes/${getUserUid()}`);
        let notes = [];
        notesRef.once('value', snapshot => {
            snapshot.forEach(chidlSnap => {
                let chidlKey = chidlSnap.key;
                let childData = chidlSnap.val();
                let note = { text: childData.text, title: childData.title, date: childData.date, id: chidlKey };
                notes.push(note);
            });
            this.setState({ notes });
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

    showSaveBtn = () => {
        this.setState({
            saveBtnOn: !this.state.saveBtnOn
        });
    };

    noteTitleTextChange = (name, value) => {
        this.setState({
            newNote: Object.assign({}, this.state.newNote, { [name]: value })
        });
    };

    addNote = evt => {
        const newNote = Object.assign({}, this.state.newNote);
        newNote.date = getDate();
        newNote.text = newNote.text.trim();

        const titleEmpty = !newNote.title.trim();
        const textEmpty = !newNote.text.trim();
        if (titleEmpty || textEmpty) {
            notify('error', 'Both field must be filled.', 4000);
            return;
        }

        fire
            .database()
            .ref(`notes/${getUserUid()}`)
            .push(newNote)
            .then(data => {
                newNote.id = data.key;
                const newNotes = [newNote].concat(this.state.notes);
                notify('success', `${newNote.title} added.`, 2000);
                this.setState({
                    newNote: this.resetNote(),
                    notes: newNotes,
                    notesSearched: this.getUpdatedSearchList(this.state.searchTerm, newNotes)
                });
            });

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
                <Menu {...this.props} />
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
                            noteTitleTextChange={this.noteTitleTextChange}
                            errorAnimationEnd={this.errorAnimationEnd}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Notes;
