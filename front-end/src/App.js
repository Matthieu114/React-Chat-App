/** @jsxImportSource @emotion/react */
import { useContext } from "react";
import "./App.css";
// Local
import Main from "./Main";
import Login from "./Login";
import { Session } from "./SessionContext";

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
	const { user } = useContext(Session);

	return (
		<div className="App" css={styles.root}>
			{user ? <Main /> : <Login />}
		</div>
	);
}
