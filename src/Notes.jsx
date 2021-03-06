import React from 'react';
// import { TransitionGroup } from 'react-transition-group';
import fire from './fire';
import NoteList from './NoteList';
import AddNote from './AddNote';
import NoteModal from './NoteModal';
import SearchNotes from './SearchNotes';
import { getUserUid } from './LocalStorageApi';
import notify from './NotificationManager';
import serverTimestamp from './ServerDateTime';
import filter from './filters';
import { easeInOutExpo } from './scroll';

const TIME_LEFT_TO_DELETE_NOTE = 4 * 1000;
const ADD_NOTE_ERROR_MESSAGE = 'Both Note Title and Note Text must be filled.';
const NOTE_DELETED = 'Note successfully deleted.';
const NOTE_EDITE = 'Note successfully edited';

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
        searchTerm: '',
        searchDateFrom: '',
        searchDateTo: '',
        modalAnimClass: ''
    };
    componentWillMount() {
        let notesRef = fire
            .database()
            .ref(`notes/${getUserUid()}`)
            .orderByChild('date');
        let notes = [];

        notesRef.once('value', snapshot => {
            snapshot.forEach(chidlSnap => {
                let chidlKey = chidlSnap.key;
                let childData = chidlSnap.val();
                let note = {
                    text: childData.text,
                    title: childData.title,
                    date: this.getDateFromTimeStamp(childData.date),
                    id: chidlKey
                };
                notes.push(note);
            });
            notes.reverse();
            this.setState({ notes });
        });
    }
    resetNote = () => {
        return {
            title: '',
            text: ''
        };
    };
    setNoteList = noteList => {
        this.noteList = noteList;
    };
    mapNotesToNotesWithMode = () => {
        const { searchTerm, searchDateFrom, searchDateTo, noteEditMode, deletedNotes } = this.state;
        const list =
            this.state.notesSearched.length || searchTerm || searchDateFrom || searchDateTo
                ? [...this.state.notesSearched]
                : [...this.state.notes];
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
    getDateFromTimeStamp(timestamp) {
        const date = new Date(timestamp);
        const day = date.getDate();
        const mounth = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}.${mounth < 10 ? '0' + mounth : mounth}.${year}.`;
    }
    smoothScroolUp = (el, duration) => {
        const startPosition = el.scrollTop;
        const range = -el.scrollTop;
        let startTime;

        function tick() {
            const elapsed = Date.now() - startTime;
            el.scrollTop = easeInOutExpo(elapsed, startPosition, range, duration);
            if (elapsed < duration) requestAnimationFrame(tick);
        }

        function animate() {
            startTime = Date.now();
            tick();
        }

        animate();
    };

    addNote = evt => {
        const newNote = Object.assign({}, this.state.newNote);
        newNote.text = newNote.text.trim();
        const titleEmpty = !newNote.title.trim();
        const textEmpty = !newNote.text.trim();
        if (titleEmpty || textEmpty) {
            notify('error', ADD_NOTE_ERROR_MESSAGE, 4000);
            return;
        }
        fire
            .database()
            .ref(`notes/${getUserUid()}`)
            .push({
                title: newNote.title,
                text: newNote.text,
                date: serverTimestamp
            })
            .then(data => {
                newNote.id = data.key;
                return fire
                    .database()
                    .ref(`notes/${getUserUid()}/${data.key}`)
                    .once('child_added', snap => {
                        newNote.date = this.getDateFromTimeStamp(snap.val());
                    });
            })
            .then(() => {
                const { searchTerm, searchDateFrom, searchDateTo } = this.state;
                const newNotes = [newNote].concat(this.state.notes);
                notify('success', `${newNote.title} added.`, 2000);
                this.setState({
                    newNote: this.resetNote(),
                    notes: newNotes,
                    notesSearched: this.getUpdatedSearchList({ searchTerm, searchDateFrom, searchDateTo }, newNotes)
                });
                this.smoothScroolUp(this.noteList, 1000);
            })
            .catch(err => notify('error', ADD_NOTE_ERROR_MESSAGE, 4000));
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
        fire
            .database()
            .ref(`notes/${getUserUid()}/${note.id}`)
            .update({ text: note.text, title: note.title })
            .then(() => {
                const { searchTerm, searchDateFrom, searchDateTo } = this.state;
                this.setState({
                    notes,
                    noteEditMode: { id: null, text: '', title: '' },
                    noteInModal: note,
                    notesSearched: this.getUpdatedSearchList({ searchTerm, searchDateFrom, searchDateTo })
                });
                notify('success', NOTE_EDITE);
            })
            .catch(err => notify('error', err.message, 4000));
    };

    cancelEditingNote = () => {
        this.setState({
            noteEditMode: { id: null, text: '', title: '' }
        });
    };

    deleteNote = id => {
        const timeOutId = setTimeout(() => {
            fire
                .database()
                .ref(`notes/${getUserUid()}/${id}`)
                .remove()
                .then(() => {
                    this.setState({
                        notes: this.state.notes.filter(note => note.id !== id),
                        notesSearched: this.state.notesSearched.filter(note => note.id !== id)
                    });
                    notify('success', NOTE_DELETED, 2000);
                })
                .catch(err => {
                    notify('error', err.message);
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

    showModal = (note, coord) => {
        document.documentElement.style.setProperty('--modal-x-pos', `${coord.x}px`);
        document.documentElement.style.setProperty('--modal-y-pos', `${coord.y}px`);
        this.setState({
            modalOn: true,
            noteInModal: note,
            modalAnimClass: 'note-modal-show',
            noteEditMode: Object.assign({}, this.state.noteEditMode, { inList: false, inModal: false })
        });
    };
    disposeModal = () => {
        this.setState({
            modalOn: false,
            noteInModal: {}
        });
    };
    addClosingAnim = () => {
        this.setState({
            modalAnimClass: 'note-modal-close'
        });
    };
    resetSearch = () => {
        this.setState({
            searchTerm: '',
            searchDateTo: '',
            searchDateFrom: '',
            notesSearched: this.getUpdatedSearchList({})
        });
    };
    setSearchValue = (searchValue, stateName) => {
        const { searchTerm, searchDateFrom, searchDateTo } = this.state,
            searchObj = Object.assign({}, { searchTerm, searchDateFrom, searchDateTo }, { [stateName]: searchValue }),
            newNotes = this.getUpdatedSearchList(searchObj);

        this.setState({
            [stateName]: searchValue,
            notesSearched: newNotes
        });
    };

    getUpdatedSearchList = ({ searchTerm: term, searchDateFrom: dateFrom, searchDateTo: dateTo }, notes) => {
        let notesCopy = notes ? notes : [...this.state.notes];
        return filter(
            {
                byTextAndTitle: term,
                from: dateFrom ? new Date(dateFrom) : '',
                to: dateTo ? new Date(dateTo) : ''
            },
            notesCopy
        );
    };
    render() {
        let showNoteModal;
        if (this.state.modalOn) {
            showNoteModal = (
                <NoteModal
                    note={this.state.noteInModal}
                    addClosingAnim={this.addClosingAnim}
                    editNote={this.editNote}
                    noteEditMode={this.state.noteEditMode}
                    saveNote={this.saveNote}
                    changeEditNote={this.changeEditNote}
                    cancelEditingNote={this.cancelEditingNote}
                    setNoteModal={this.setNoteModal}
                    animationClass={this.state.modalAnimClass}
                    disposeModal={this.disposeModal}
                />
            );
        }
        return (
            <React.Fragment>
                {showNoteModal}
                <div className="note-component">
                    <div className="note-wrapper">
                        <SearchNotes
                            searchTerm={this.state.searchTerm}
                            searchDateFrom={this.state.searchDateFrom}
                            searchDateTo={this.state.searchDateTo}
                            setSearchValue={this.setSearchValue}
                            resetSearch={this.resetSearch}
                        />
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
                            setNoteList={this.setNoteList}
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
