/** @jsxImportSource @emotion/react */
// Layout
import { Link } from "@mui/material";
import axios from "axios";
//Context
import { Session } from "./SessionContext";
import { useContext, useEffect } from "react";

const styles = {
	root: {
		minWidth: "200px"
	},
	channel: {
		padding: ".2rem .5rem",
		whiteSpace: "nowrap"
	}
};

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
		</ul>
	);
}
