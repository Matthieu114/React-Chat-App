import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Context = React.createContext();

export default Context;

export const Provider = ({ children }) => {
	const [cookies, setCookie, removeCookie] = useCookies([]);
	const [oauth, setOauth] = useState(cookies.oauth);
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [channels, setChannels] = useState([]);
	const [currentChannel, setCurrentChannel] = useState(null);
	const [user, setUser] = useState(null);

	const createUserInDB = async () => {};
	const checkUserDb = async () => {
		const { data: users } = await axios.get(`http://localhost:3001/users`, {
			headers: {
				Authorization: `Bearer ${oauth.access_token}`
			}
		});
		users.forEach((user) => {
			user.email === oauth.email ? setUser(user) : createUserInDB();
		});
	};

	return (
		<Context.Provider
			value={{
				oauth: oauth,
				setOauth: (oauth) => {
					if (oauth) {
						const payload = JSON.parse(
							Buffer.from(oauth.id_token.split('.')[1], 'base64').toString(
								'utf-8'
							)
						);
						oauth.email = payload.email;
						oauth.name = payload.name;
						setCookie('oauth', oauth);
					} else {
						setCurrentChannel(null);
						setChannels([]);
						removeCookie('oauth');
					}
					setOauth(oauth);
					checkUserDb();
				},
				channels: channels,
				drawerVisible: drawerVisible,
				setDrawerVisible: setDrawerVisible,
				setChannels: setChannels,
				currentChannel: currentChannel,
				setCurrentChannel: (channelId) => {
					const channel = channels.find((channel) => channel.id === channelId);
					setCurrentChannel(channel);
				},
				user: user,
				setUser: setUser
			}}>
			{children}
		</Context.Provider>
	);
};
