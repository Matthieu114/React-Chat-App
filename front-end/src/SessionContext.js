import React, { useState } from "react";

export const Session = React.createContext();

export const SessionProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [channels, setChannels] = useState([]);
	const [channel, setChannel] = useState({});
	const [messages, setMessages] = useState([]);
	return (
		<Session.Provider
			value={{
				// User information
				user,
				setUser,
				logout: () => {
					setUser(null);
				},
				//Channels information
				channels,
				setChannels,
				//Active channel
				channel,
				setChannel,
				//Messages information
				messages,
				setMessages
			}}
		>
			{children}
		</Session.Provider>
	);
};
