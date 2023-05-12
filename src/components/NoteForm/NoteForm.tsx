import React, { useCallback, useState } from 'react'
import { NoteItem } from '../NoteItem'

export const NoteForm: React.FC = () => {
  const [isAddFormVisible, setIsAddFormVisible] = useState(false)

  const handleClickAdd = useCallback(() => {
    setIsAddFormVisible(true)
  }, [])

  const handleHideCreateForm = useCallback(() => {
    setIsAddFormVisible(false)
  }, [])

  return (
    <div className="note-form">
      {!isAddFormVisible && <button onClick={handleClickAdd}>Add Note</button>}

      {isAddFormVisible && (
        <NoteItem
          handleHideCreateForm={handleHideCreateForm}
          shouldCreate={true}
        />
      )}
    </div>
  )
}
