import React from "react"
const styles = {
  message: {
    margin: ".2rem",
    padding: ".2rem",
    // backgroundColor: '#66728E',
    ":hover": {
      backgroundColor: "rgba(255,255,255,.2)"
    }
  },
  form: {
    borderTop: "2px solid #373B44",
    padding: ".5rem",
    display: "flex"
  },
  content: {
    flex: "1 1 auto",
    marginRight: ".5rem"
  },
  send: {
    backgroundColor: "#D6DDEC",
    padding: ".2rem .5rem",
    border: "none",
    ":hover": {
      backgroundColor: "#2A4B99",
      cursor: "pointer",
      color: "#fff"
    }
  }
}
const MessageForm = ({ addMessage }) => {
  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    addMessage({
      content: data.get("content"),
      author: "david",
      creation: Date.now()
    })
    e.target.elements.content.value = ""
  }
  return (
    <form css={styles.form} onSubmit={onSubmit}>
      <input type="input" name="content" css={styles.content} />
      <input type="submit" value="Send" css={styles.send} />
    </form>
  )
}

export default MessageForm
