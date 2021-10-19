/** @jsx jsx */
import { jsx } from "@emotion/core"
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
const Channel = ({ channel, messages, addMessage }) => {
  return (
    <div css={styles.channel}>
      <Messages channel={channel} messages={messages} />
      <MessageSend addMessage={addMessage} />
    </div>
  )
}
export default Channel
