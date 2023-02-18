import { useState } from 'react'
import './App.css'
import Form from './Form.js'

function App() {
  const startNote = {
    content: '',
    author: ''
  }

  // States

  const [note, setNote] = useState(startNote)
  const [editNote, setEditNote] = useState(null)
  const [allNotes, setAllNotes] = useState([])

  // Functions: form inputs

  function onNoteValueChange(e) {
    // console.log(e.target)
    const { name, value } = e.target
    // console.log('name: ' + name, ' value: ' + value)
    setNote((prevNote) => ({ ...prevNote, [name]: [value] }))
  }

  function onEditNoteValueChange(e) {
    const { name, value } = e.target
    setEditNote((prevNote) => ({ ...prevNote, [name]: [value] }))
  }

  function onEditNoteSubmit(e) {
    e.preventDefault()

    setAllNotes((prevAllNotes) => {
      return prevAllNotes.map((theNote) => {
        if (theNote.id !== editNote.id) {
          return theNote
        } else {
          return editNote
        }
      })
    })
    setEditNote(null)
  }

  function onNoteSubmit(e) {
    e.preventDefault()

    setAllNotes((prevAllNotes) => {
      const newNotes = { ...note }
      newNotes.id = Date.now().toString()
      return [newNotes, ...prevAllNotes]
    })

    setNote(startNote)
  }

  function onNoteDelete(id) {
    setAllNotes((prevAllNotes) => {
      return prevAllNotes.filter((theNote) => theNote.id !== id)
    })
  }

  // Elements

  const noteElements = allNotes.map((theNote) => {
    return (
      <div key={theNote.id} className="app-note">
        <p>{theNote.content}</p>
        <h5>{theNote.author}</h5>
        <p>
          <a onClick={() => setEditNote(theNote)}>Edit</a>
          <span> | </span>
          <a onClick={() => onNoteDelete(theNote.id)}>Delete</a>
        </p>
      </div>
    )
  })

  let editNoteElement = null

  if (!!editNote) {
    editNoteElement = (
      <div className="app-edit-note">
        <Form
          submitNote={onEditNoteSubmit}
          valueContent={editNote.content}
          onChangeContent={onEditNoteValueChange}
          valueAuthor={editNote.author}
          onChangeAuthor={onEditNoteValueChange}
        />
      </div>
    )
  }

  return (
    <section className="app-section">
      <div className="app-container">
        <h3>Smile</h3>
        <Form
          submitNote={onNoteSubmit}
          valueContent={note.content}
          onChangeContent={onNoteValueChange}
          valueAuthor={note.author}
          onChangeAuthor={onNoteValueChange}
        />
        <div className="app-notes">{noteElements}</div>
      </div>
      {editNoteElement}
    </section>
  )
}

export default App
