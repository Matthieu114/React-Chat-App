import React from "react"

const styles = {
  messages: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
    "& ul": {
      margin: 0,
      padding: 0,
      textIndent: 0,
      listStyleType: 0
    }
  }
}
const messages = ({ channel, messages }) => {
  return (
    <div style={styles.messages}>
      <h1>Messages from {channel.name}</h1>
      <ul>
        {messages.map((message, i) => (
          <li key={i} style={styles.messages}>
            <p>
              <span>{message.author}</span>{" "}
              <span>{new Date(message.creation).toString()}</span>
            </p>
            <div>
              {message.content
                .split(/(\n +\n)/)
                .filter((el) => el.trim())
                .map((el) => (
                  <p>{el}</p>
                ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default messages
