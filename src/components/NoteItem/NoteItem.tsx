import React, { useCallback, useState, useEffect, MouseEvent } from 'react'
import { Note } from 'src/types'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { addNote, deleteNote, editNote } from 'src/features/notes/notesSlice'
import { truncate } from 'src/utils/truncate'
import classNames from 'classnames'

const PREVIEW_LIMIT = 300

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

  const [limit, setLimit] = useState<number | undefined>(PREVIEW_LIMIT)
  const [isEditMode, setIsEditMode] = useState(!!shouldCreate)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Note>()

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

  const isNoteBodyBeyondLimit = noteBody.length > PREVIEW_LIMIT
  const readOnlyBodyText = truncate(noteBody, limit)
  const isTruncated = noteBody.length > readOnlyBodyText.length

  const handleShowMore = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setLimit(undefined)
  }, [])

  const handleShowLess = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setLimit(PREVIEW_LIMIT)
  }, [])

  return (
    <div
      onClick={handleClick}
      className={classNames('note-item', {
        ['cursor-pointer']: isNoteBodyBeyondLimit && isTruncated,
      })}
    >
      {isEditMode && (
        <form className="note-item__form" onSubmit={handleSave}>
          <input
            {...register('title', { required: true })}
            className="note-item__title note-item__input"
            placeholder="Title *"
            autoFocus
          />

          {errors.title && (
            <div className="note-item__required">This field is required</div>
          )}

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
      )}

      {!isEditMode && (
        <>
          <h2 className="note-item__title">{noteTitle}</h2>
          <p className="note-item__body">
            {readOnlyBodyText}

            {isNoteBodyBeyondLimit && (
              <>
                {isTruncated && (
                  <button
                    className="note-item__show-limit"
                    onClick={handleShowMore}
                  >
                    show more
                  </button>
                )}

                {!isTruncated && (
                  <button
                    className="note-item__show-limit"
                    onClick={handleShowLess}
                  >
                    show less
                  </button>
                )}
              </>
            )}
          </p>
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
