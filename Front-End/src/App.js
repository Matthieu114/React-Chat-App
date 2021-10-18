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
const App = () => {
  //const [user,setUser]= useState(null)
  return (
    //dans header { user ? <Main/> : <Login onUser={setUser}/> }
    <div className="App" css={styles.root}>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App
