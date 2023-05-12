import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Note } from '../../types'
import { nanoid } from 'nanoid'

export enum SORT_OPTIONS {
  'title' = 'title',
  'dateCreated' = 'dateCreated',
  'dateModified' = 'dateModified',
}

interface NotesState {
  notes: Note[]
  searchTerm: string
  sortOrder: SORT_OPTIONS
}

const initialState: NotesState = {
  notes: [],
  searchTerm: '',
  sortOrder: SORT_OPTIONS.dateCreated,
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push({
        ...action.payload,
        id: nanoid(),
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
      })
    },

    editNote: (state, action: PayloadAction<{ id: string; data: Note }>) => {
      const { id, data } = action.payload
      const existingNote = state.notes.find((note) => note.id === id)
      if (existingNote) {
        existingNote.title = data.title
        existingNote.body = data.body
        existingNote.modified = new Date().toISOString()
      }
    },

    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload)
    },

    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },

    setSortOrder: (state, action: PayloadAction<SORT_OPTIONS>) => {
      state.sortOrder = action.payload
    },
  },
})

export const { addNote, editNote, deleteNote, setSearchTerm, setSortOrder } =
  notesSlice.actions

export default notesSlice.reducer
