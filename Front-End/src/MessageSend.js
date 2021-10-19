/** @jsx jsx */
import { jsx } from "@emotion/core"
import MessageForm from "./MessageForm.js"

const MessageSend = ({ addMessage }) => <MessageForm addMessage={addMessage} />
export default MessageSend
