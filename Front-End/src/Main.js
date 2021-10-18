import React from "react"
import { useState } from "react"
import Channels from "./Channels.js"
import Channel from "./Channel.js"
const styles = {
  main: {
    color: "pink",
    backgroundColor: "#373B44",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden"
  }
}
const channel = {
  name: "Fake channel"
}
const Main = () => {
  const [messages, setMessages] = useState([
    {
      author: "david",
      creation: 1602832138892,
      content: `
  ## 2 - Styles - Level easy
  
  Give it some styles, use CSS to make it looks good. Possible source of
  improvements include changing the colors, replacing the HTML "send" button
  with an icon, working on the header, providing day/night themes ... be creative
  `
    },
    {
      author: "sergei",
      creation: 1602840139202,
      content: `
  ## 3 - Use an external library - Level medium
  
  Format the date in a human readable format. While the date is generated on
  the server side to ensure its relevance and prevent from forgery, it must be
  displayed according to the user browser local. The
  [Moment.js](https://momentjs.com/) library has been the library of choice
  for many years to accomplish date formatting. Read what is displayed on the
  top right corner of their homepage, it is now depreciated. Read the reasons
  and act accordingly.
  `
    },
    {
      author: "david",
      creation: 1602844139200,
      content: `
  ## 4 - Support message contents in Markdown - Level hard
  
  Markdown is the most popular syntax to format text into HTML. It is used
  by the majority of the project Readme files, to write documentation and to
  generate websites.
  
  I recommand you to use the [unified](https://unifiedjs.com/) which is very
  powerful and comes with a lot of plugins. You can read the Markdown to HTML
  guide in the learn section and enrich it with your selection of relevant
  plugins.
  
  Consider adding syntax highlight support with a library like
  [Prism](https://prismjs.com/).
  `
    }
  ])

  const addMessage = (message) => {
    setMessages([...messages, message])
  }
  return (
    <div css={styles.main}>
      <Channels />
      <Channel channel={channel} messages={messages} addMessage={addMessage} />
    </div>
  )
}
export default Main
