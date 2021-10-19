/** @jsx jsx */
import { jsx } from "@emotion/core"
import image from "./header.jpg"

const styles = {
  header: {
    height: "60px",
    color: "blue",
    flexShrink: 0,
    backgroundImage: `URL(${image})`,
    backgroundSize: "cover"
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
    <header css={styles.header}>
      <h1>Welcome on our chat application</h1>
    </header>
  )
}
export default Header
