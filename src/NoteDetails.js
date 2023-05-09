import { useParams } from 'react-router-dom'
import { useState } from 'react'

export default function NoteDetails() {
  const notes = JSON.parse(localStorage.getItem('notes'))
  const { id } = useParams()
  const note = notes?.find(note => note?.id === parseInt(id))

  const [noteText, setNoteText] = useState(note?.text)
  const [isEditing, setIsEditing] = useState(false)

  const handleDelete = () => {
    const updatedNotes = notes?.filter(note => note?.id !== parseInt(id))
    localStorage.setItem('notes', JSON.stringify(updatedNotes))
    // Redirect to note list
    window.location.href = '/'
  }

  const handleSave = () => {
    const updatedNotes = notes?.map(note => {
      if (note.id === parseInt(id)) {
        return { ...note, text: noteText }
      } else {
        return note
      }
    })
    localStorage.setItem('notes', JSON.stringify(updatedNotes))
    setIsEditing(false)
  }

  return (
    <div
      style={{
        height: '100vh',
        maxWidth: '30vw',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        flexGrow: 1,
        padding: '1rem'
      }}>
      <h2>Note Details</h2>
      {note ? (
        <div>
          <p>{`Note id: ${note?.id}`}</p>
          {isEditing ? (
            <form onSubmit={handleSave}>
              <input
                type="text"
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
              />
              <button type="submit">Save</button>
            </form>
          ) : (
            <p style={{ margin: 0 }}>
              {`Note: `}
              <span>{noteText}</span>
              <button
                onClick={() => setIsEditing(true)}
                style={{ marginLeft: '12px' }}>
                Edit
              </button>
            </p>
          )}
          <div style={{ marginTop: '1rem' }}>
            <button onClick={handleDelete} style={{ marginRight: '12px' }}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <p>Note not found</p>
      )}
    </div>
  )
}
