import React from "react"
/** @jsx jsx */
import { jsx } from "@emotion/core"

const styles = {
  header: {
    height: "60px",
    color: "blue",
    flexShrink: 0
  },
  headerLogIn: {
    backgroundColor: "red"
  },
  headerLogOut: {
    backgroundColor: "blue"
  }
}
const Header = () => {
  return (
    <header css={styles} img src={require("./header.jpg")}>
      <h1>Welcome on our chat application</h1>
    </header>
  )
}
export default Header
