import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
	name: "journal",
	initialState: {
		isSaving: false,
		messageSaved: "",
		notes: [],
		active: null,
		// active: {
		//     id:'',
		//     title:'',
		//     body:'',
		//     date:123457,
		//     imageUrls:[],
		// }
	},
	reducers: {
		addNewEmptyNote: (state, action) => {
			state.notes.push(action.payload);
			state.isSaving = false;
		},

		setActiveNote: (state, action) => {
			state.active = action.payload;
			state.messageSaved = "";
		},

		savingNewNote: (state) => {
			state.isSaving = true;
		},
		setNotes: (state, action) => {
			state.notes = action.payload;
		},

		setSaving: (state) => {
			state.isSaving = true;
		},
		updateNote: (state, action) => {
			state.isSaving = false;
			state.notes = state.notes.map((note) =>
				note.id === action.payload.id ? action.payload : note
			);

			state.messageSaved = `${action.payload.title}, actualizado correctamente`;
		},
		setPhotosToActiveNote: (state, action) => {
			state.isSaving = false;
			state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
		},
		clearNotesLogout: (state) => {
			state.isSaving = false;
			state.messageSaved = "";
			state.notes = [];
			state.active = null;
		},
		deleteNodeById: (state, action) => {
			state.isSaving = false;
			state.messageSaved = `Nota eliminada correctamente`;
			state.active = null;
			state.notes = state.notes.filter((note) => note.id !== action.payload);
		},
	},
});

export const {
	addNewEmptyNote,
	setActiveNote,
	setNotes,
	setSaving,
	updateNote,
	deleteNodeById,
	savingNewNote,
	setPhotosToActiveNote,
	clearNotesLogout,
} = journalSlice.actions;
