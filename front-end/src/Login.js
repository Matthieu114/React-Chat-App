/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import crypto from "crypto";
import qs from "qs";
import axios from "axios";
// Layout
import { useTheme } from "@mui/styles";
import { Box, TextField, Button } from "@mui/material";
//import { Link } from "@mui/material";

const base64URLEncode = (str) => {
	return str
		.toString("base64")
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=/g, "");
};

const sha256 = (buffer) => {
	return crypto.createHash("sha256").update(buffer).digest();
};

const useStyles = (theme) => ({
	root: {
		flex: "1 1 auto",
		background: theme.palette.background.default,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		"& > div": {
			margin: `${theme.spacing(1)}`,
			marginLeft: "auto",
			marginRight: "auto"
		},
		"& fieldset": {
			border: "none",
			"& label": {
				marginBottom: theme.spacing(0.5),
				display: "block"
			}
		}
	}
});

const Redirect = ({ config, codeVerifier }) => {
	const styles = useStyles(useTheme());
	const redirect = (e) => {
		e.stopPropagation();
		const code_challenge = base64URLEncode(sha256(codeVerifier));
		const url = [
			`${config.authorization_endpoint}?`,
			`client_id=${config.client_id}&`,
			`scope=${config.scope}&`,
			`response_type=code&`,
			`redirect_uri=${config.redirect_uri}&`,
			`code_challenge=${code_challenge}&`,
			`code_challenge_method=S256`
		].join("");
		window.location = url;
	};
	return (
		<Box
			component="form"
			sx={{
				"& .MuiTextField-root": { m: 1, width: "25ch" }
			}}
			noValidate
			autoComplete="off"
		>
			<div css={styles.root}>
				<div>
					<fieldset>
						<TextField
							color="secondary"
							id="standard-required"
							label="Username"
							variant="standard"
						/>
					</fieldset>
					<fieldset>
						<TextField
							color="secondary"
							id="standard-password-input"
							label="Password"
							type="password"
							autoComplete="current-password"
							variant="standard"
						/>
					</fieldset>
					<fieldset>
						{/* <Button
							color="secondary"
							variant="outlined"
							onClick={(e) => {
								e.stopPropagation();
								onUser({ username: "david" });
							}}
						>
							Login
						</Button> */}
						<Button color="secondary" variant="outlined" onClick={redirect}>
							Login with external account
						</Button>
					</fieldset>
				</div>
			</div>
		</Box>
	);
};

const Tokens = ({ oauth }) => {
	const [, , removeCookie] = useCookies([]);
	const styles = useStyles(useTheme());
	const { id_token } = oauth;
	const id_payload = id_token.split(".")[1];
	const { email } = JSON.parse(atob(id_payload));
	const logout = (e) => {
		e.stopPropagation();
		removeCookie("oauth");
	};
	return (
		<div css={styles.root}>
			Welcome {email}{" "}
			<Button onClick={logout} color="secondary" variant="outlined">
				logout
			</Button>
		</div>
	);
};

const LoadToken = function ({
	code,
	codeVerifier,
	config,
	cookies,
	removeCookie,
	setCookie,
	onUser
}) {
	const styles = useStyles(useTheme());
	useEffect(() => {
		const fetch = async () => {
			try {
				const { data: oauth } = await axios.post(
					config.token_endpoint,
					qs.stringify({
						grant_type: "authorization_code",
						client_id: `${config.client_id}`,
						code_verifier: `${codeVerifier}`,
						redirect_uri: `${config.redirect_uri}`,
						code: `${code}`
					})
				);
				removeCookie("code_verifier");
				setCookie("oauth", oauth);
				window.location = "/";
			} catch (err) {
				console.error(err);
			}
		};
		fetch();
	});
	return (
		<Button
			onClick={(e) => {
				e.stopPropagation();
				const { id_token } = cookies.oauth;
				const id_payload = id_token.split(".")[1];
				const { email } = JSON.parse(atob(id_payload));
				onUser({ username: `${email}` });
			}}
			css={styles.root}
			color="secondary"
			variant="outlined"
		>
			Go to channel
		</Button>
	);
};

export default function Login({ onUser }) {
	const styles = useStyles(useTheme());
	const [cookies, setCookie, removeCookie] = useCookies([]);
	const config = {
		authorization_endpoint: "http://127.0.0.1:5556/dex/auth",
		token_endpoint: "http://127.0.0.1:5556/dex/token",
		client_id: "webtech-frontend",
		redirect_uri: "http://127.0.0.1:3000",
		scope: "openid%20email%20offline_access"
	};
	const params = new URLSearchParams(window.location.search);
	const code = params.get("code");
	// Is there a code query parameters in the url
	if (!code) {
		// No: we are no being redirected from an oauth server
		if (!cookies.oauth) {
			const codeVerifier = base64URLEncode(crypto.randomBytes(32));
			setCookie("code_verifier", codeVerifier);

			return (
				<Redirect
					codeVerifier={codeVerifier}
					config={config}
					css={styles.root}
				/>
			);
		} else {
			// Yes: user is already logged in, great, it is working
			return <Tokens oauth={cookies.oauth} css={styles.root} />;
		}
	} else {
		// Yes, we are coming from an oauth server
		return (
			<LoadToken
				cookies={cookies}
				code={code}
				codeVerifier={cookies.code_verifier}
				config={config}
				setCookie={setCookie}
				removeCookie={removeCookie}
				onUser={onUser}
			/>
		);
	}
}
