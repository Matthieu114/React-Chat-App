/** @jsxImportSource @emotion/react */
import { useState } from "react";
import "./App.css";
// Local
import Main from "./Main";
import Login from "./Login";

const styles = {
  root: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#565E71",
    marginTop: "50px"
    // padding: "50px"
  }
};

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App" css={styles.root}>
      {!user ? <Main /> : <Login onUser={setUser} />}
    </div>
  );
}
