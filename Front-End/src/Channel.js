import React from "react"
import Messages from "./Messages.js"
import MessageSend from "./MessageSend.js"
const styles = {
  channel: {
    height: "100%",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  }
}
const Channel = ({ messages, addMessages }) => {
  return (
    <div style={styles.channel}>
      <Messages channel={this} messages={messages} />
      <MessageSend addMessages={addMessages} />
    </div>
  )
}
export default Channel
