import React from "react"
const styles = {
  header: {
    height: "60px",
    color: "blue",
    backgroundColor: "rgba(0,255,0,.3)",
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
    <header css={styles}>
      <h1>Welcome on our chat application</h1>
    </header>
  )
}
export default Header
