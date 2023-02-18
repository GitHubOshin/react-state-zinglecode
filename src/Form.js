import './App.css'

function Form(props) {
  const {
    submitNote,
    valueContent,
    valueAuthor,
    onChangeContent,
    onChangeAuthor
  } = props

  return (
    <form onSubmit={submitNote}>
      <p>
        <textarea
          rows="3"
          placeholder="Write what you want..."
          type="text"
          name="content"
          value={valueContent}
          onChange={onChangeContent}
        />
      </p>
      <p>
        <input
          placeholder="Author name"
          type="text"
          name="author"
          value={valueAuthor}
          onChange={onChangeAuthor}
        />
      </p>
      <p>
        <button type="submit">Add note</button>
      </p>
    </form>
  )
}

export default Form
