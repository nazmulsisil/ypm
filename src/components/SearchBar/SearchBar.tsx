import React, { ChangeEvent, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchTerm } from 'src/features/notes/notesSlice'

export const SearchBar: React.FC = () => {
  const dispatch = useDispatch()

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchTerm(event.target.value))
    },
    [dispatch]
  )

  return (
    <div className="search-bar">
      <span
        className="search-bar__icon"
        role="img"
        aria-label="magnifying glass"
      >
        🔍
      </span>
      <input
        className="search-bar__input"
        type="text"
        onChange={handleChange}
        placeholder="Search..."
      />
    </div>
  )
}
