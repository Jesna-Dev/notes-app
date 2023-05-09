import './App.css'

import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

export default function NotesList() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes')
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const [newNoteText, setNewNoteText] = useState('')

  const handleNewNoteChange = event => {
    setNewNoteText(event.target.value)
  }

  const handleNewNoteSubmit = event => {
    event.preventDefault()
    if (newNoteText.trim() === '') {
      return
    }
    const newNote = {
      id: Date.now(),
      text: newNoteText.trim()
    }
    setNotes([...notes, newNote])
    setNewNoteText('')
  }

  const handleNoteEdit = (id, newText) => {
    setNotes(
      notes.map(note => {
        if (note.id === id) {
          return {
            ...note,
            text: newText.trim()
          }
        }
        return note
      })
    )
  }

  const handleNoteDelete = id => {
    setNotes(notes.filter(note => note.id !== id))
  }

  return (
    <div
      className="App"
      style={{
        height: '100vh',
        maxWidth: '30vw',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        flexGrow: 1,
        padding: '1rem'
      }}>
      <h1>GI TASK | Notes App</h1>
      <form onSubmit={handleNewNoteSubmit}>
        <input
          type="text"
          placeholder="Add new note"
          value={newNoteText}
          onChange={handleNewNoteChange}
          style={{
            border: '1px solid black',
            borderRadius: '0.2rem',
            height: '2rem',
            marginRight: '1rem'
          }}
        />
        <button
          type="submit"
          style={{
            width: '4rem',
            height: '2rem'
          }}>
          Add
        </button>
      </form>
      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <div
          style={{
            marginTop: '3rem'
          }}>
          <ul
            style={{
              paddingLeft: 0
            }}>
            {notes.map(note => (
              <NoteItem
                key={note.id}
                note={note}
                onEdit={handleNoteEdit}
                onDelete={handleNoteDelete}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function NoteItem({ note, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(note.text)

  const handleEditButtonClick = () => {
    setIsEditing(true)
  }

  const handleEditTextChange = event => {
    setEditText(event.target.value)
  }

  const handleEditFormSubmit = event => {
    event.preventDefault()
    onEdit(note.id, editText)
    setIsEditing(false)
  }

  const handleDeleteButtonClick = () => {
    onDelete(note.id)
  }

  return (
    <li>
      {isEditing ? (
        <form onSubmit={handleEditFormSubmit}>
          <input type="text" value={editText} onChange={handleEditTextChange} />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            spacing: '1rem',
            margin: '1rem 0'
          }}>
          <Link to={`/notes/${note.id}`}>{note.text}</Link>
          <div>
            <button
              onClick={handleEditButtonClick}
              style={{ marginRight: '12px' }}>
              Edit
            </button>
            <button onClick={handleDeleteButtonClick}>Delete</button>
          </div>
        </div>
      )}
    </li>
  )
}
