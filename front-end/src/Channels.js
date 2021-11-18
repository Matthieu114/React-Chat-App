/** @jsxImportSource @emotion/react */
// Layout
import { Button, Link, Box, Typography, Modal, TextField } from "@mui/material";
import axios from "axios";
//Context
import { Session } from "./SessionContext";
import { useContext, useEffect, useState } from "react";

const styles = {
	root: {
		minWidth: "200px"
	},
	channel: {
		padding: ".2rem .5rem",
		whiteSpace: "nowrap"
	},
	modal: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4
	},
	AddChannel: {
		position: "fixed",
		bottom: "10px"
	}
};

function AddChannel() {
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	const handleOpen = () => setOpen(true);
	const { setChannels } = useContext(Session);
	const onSubmit = async () => {
		const { data: channels } = await axios.post(
			`http://localhost:3001/channels`,
			{
				name: document.getElementById("newChannel").value
			}
		);
		setChannels(channels);
	};
	return (
		<div>
			<Button
				color="secondary"
				variant="outlined"
				position="fixed"
				marginTop="300px"
				onClick={handleOpen}
			>
				{" "}
				+{" "}
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={styles.modal}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Create a new Channel
					</Typography>
					<TextField
						color="secondary"
						id="newChannel"
						label="Name of Channel"
						variant="standard"
						name="newChannel"
					/>
					<Button onClick={onSubmit}>Push</Button>
				</Box>
			</Modal>
		</div>
	);
}

export default function Channels() {
	const { user, setChannels, channels, setChannel } = useContext(Session);
	useEffect(() => {
		const fetchChannels = async () => {
			const { data: channels } = await axios.get(
				"http://localhost:3001/channels"
			);
			setChannels(channels);
		};
		if (user) fetchChannels();
	}, [user, setChannels, setChannel]);

	return (
		<ul style={styles.root}>
			{channels.map((channel, i) => (
				<li key={i} css={styles.channel}>
					<Link
						href="#"
						onClick={(e) => {
							e.preventDefault();
							setChannel(channel);
						}}
					>
						{channel.name}
					</Link>
				</li>
			))}
			<AddChannel style={styles.AddChannel} />
		</ul>
	);
}
