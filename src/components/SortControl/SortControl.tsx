import React, { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { SORT_OPTIONS, setSortOrder } from 'src/features/notes/notesSlice'

export const SortControl: React.FC = () => {
  const dispatch = useDispatch()

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOrder(event.target.value as SORT_OPTIONS))
  }

  return (
    <select className="sort-option-select" onChange={handleSortChange}>
      <option value={SORT_OPTIONS.title}>Title</option>
      <option value={SORT_OPTIONS.dateCreated}>Date Created</option>
      <option value={SORT_OPTIONS.dateModified}>Date Modified</option>
    </select>
  )
}
