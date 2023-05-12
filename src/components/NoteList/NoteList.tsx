import React, { useMemo } from 'react'
import { useAppSelector } from 'src/hooks/useAppSelector'
import { NoteItem } from '../NoteItem'
import { matchSorter } from 'match-sorter'
import { SORT_OPTIONS } from 'src/features/notes/notesSlice'

export const NoteList: React.FC = () => {
  const notes = useAppSelector((state) => state.notes.notes)
  const searchTerm = useAppSelector((state) => state.notes.searchTerm)
  const sortOrder = useAppSelector((state) => state.notes.sortOrder)

  const filteredAndSortedNotes = useMemo(() => {
    const filteredNotes = matchSorter(notes, searchTerm, {
      keys: ['title', 'body'],
      threshold: matchSorter.rankings.CONTAINS,
    })

    const sortedNotes = searchTerm
      ? filteredNotes
      : [...filteredNotes].sort((a, b) => {
          if (sortOrder === 'title') {
            return a.title.localeCompare(b.title)
          } else if (sortOrder === SORT_OPTIONS.dateCreated) {
            return new Date(b.created).getTime() - new Date(a.created).getTime()
          } else if (sortOrder === SORT_OPTIONS.dateModified) {
            return (
              new Date(b.modified).getTime() - new Date(a.modified).getTime()
            )
          } else {
            return 0
          }
        })

    return sortedNotes
  }, [notes, searchTerm, sortOrder])

  return (
    <div className="note-list">
      <div className="note-list__notes">
        {filteredAndSortedNotes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
}
