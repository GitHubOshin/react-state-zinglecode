import { useState } from 'react'
import './App.css'

function App() {
  const startNote = {
    content: '',
    author: ''
  }

  // States

  const [note, setNote] = useState(startNote)
  const [allNotes, setAllNotes] = useState([])

  // Functions

  function onNoteValueChange(e) {
    // console.log(e.target)
    const { name, value } = e.target
    // console.log('name: ' + name, ' value: ' + value)
    setNote((prevNote) => ({ ...prevNote, [name]: [value] }))
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

  // Elements

  const noteElements = allNotes.map((theNote) => {
    return (
      <div key={theNote.id} className="app-note">
        <p>{theNote.content}</p>
        <h5>{theNote.author}</h5>
      </div>
    )
  })

  return (
    <section className="app-section">
      <div className="app-container">
        <h3>Smile</h3>
        <form onSubmit={onNoteSubmit}>
          <p>
            <textarea
              rows="3"
              placeholder="Write what you want..."
              type="text"
              name="content"
              value={note.content}
              onChange={onNoteValueChange}
            />
          </p>
          <p>
            <input
              placeholder="Author name"
              type="text"
              name="author"
              value={note.author}
              onChange={onNoteValueChange}
            />
          </p>
          <p>
            <button type="submit">Add note</button>
          </p>
        </form>
        <div className="app-notes"> {noteElements}</div>
      </div>
    </section>
  )
}

export default App

