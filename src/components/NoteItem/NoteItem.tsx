import React, {
  useCallback,
  useState,
  useEffect,
  MouseEvent,
  useRef,
  MutableRefObject,
} from 'react'
import { Note } from 'src/types'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { addNote, deleteNote, editNote } from 'src/features/notes/notesSlice'
import { truncate } from 'src/utils/truncate'

interface NoteItemProps {
  note?: Note
  handleHideCreateForm?: () => void
  shouldCreate?: boolean
}

export const NoteItem: React.FC<NoteItemProps> = ({
  note,
  handleHideCreateForm,
  shouldCreate,
}) => {
  const noteTitle = note?.title || ''
  const noteBody = note?.body || ''
  const noteId = note?.id || ''

  const dispatch = useAppDispatch()

  const [limit, setLimit] = useState<number | undefined>(300)
  const [isEditMode, setIsEditMode] = useState(!!shouldCreate)

  const { register, handleSubmit, setValue } = useForm<Note>()

  useEffect(() => {
    setValue('title', noteTitle)
    setValue('body', noteBody)
  }, [noteBody, noteTitle, setValue])

  const handleDelete = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      dispatch(deleteNote(noteId))
    },
    [dispatch, noteId]
  )

  const handleClick = useCallback(() => {
    setLimit(undefined)
  }, [])

  const handleEdit = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsEditMode(true)
  }, [])

  const handleClickCancel = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      setIsEditMode(false)
      if (handleHideCreateForm) handleHideCreateForm()
    },
    [handleHideCreateForm]
  )

  const handleSave = handleSubmit((data: Note) => {
    if (shouldCreate && handleHideCreateForm) {
      dispatch(addNote(data))
      handleHideCreateForm()
    }

    if (!shouldCreate) {
      dispatch(editNote({ id: noteId, data }))
      setIsEditMode(false)
    }
  })

  return (
    <div onClick={handleClick} className="note-item">
      {isEditMode ? (
        <form className="note-item__form" onSubmit={handleSave}>
          <input
            {...register('title')}
            className="note-item__title note-item__input"
            placeholder="Title"
            autoFocus
          />

          <textarea
            {...register('body')}
            className="note-item__body note-item__textarea"
            placeholder="Note body..."
          />

          <div className="note-item__action">
            <button className="me-2" type="submit">
              Save
            </button>
            <button onClick={handleClickCancel}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="note-item__title">{noteTitle}</h2>
          <p className="note-item__body">{truncate(noteBody, limit)}</p>
          <div className="note-item__action">
            <button className="me-2" onClick={handleDelete}>
              Delete
            </button>
            <button onClick={handleEdit}>Edit</button>
          </div>
        </>
      )}
    </div>
  )
}
