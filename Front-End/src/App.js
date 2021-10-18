import { useState } from "react"
import "./App.css"
/** @jsx jsx */
import { jsx } from "@emotion/core"
import Header from "./Header.js"
import Footer from "./Footer.js"
import Main from "./Main.js"

const styles = {
  root: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#565E71",
    padding: "50px"
  }
}

export default ({
  channel = {
    name: "Fake channel"
  }
}) => {
  //addMessage
  return (
    <div className="App" css={styles.root}>
      <header className="App-header" css={Header.header}>
        <h1>Header</h1>
      </header>
      <main className="App-main" css={Main.main}>
        <div css={Main.channels}></div>
        <div css={Main.channel}>
          <div css={Main.Messages}>
            <h1>Messages for {channel.name}</h1>
            <ul>
              {messages.map((message, i) => (
                <li key={i} css={styles.message}>
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
          <MessageForm addMessage={Main.addMessage} />
        </div>
      </main>
      <footer className="App-footer" style={Footer.footer}>
        footer
      </footer>
    </div>
  )
}
