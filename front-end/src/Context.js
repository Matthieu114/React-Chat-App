import React, {useState} from 'react';
import {useCookies} from 'react-cookie';
import axios from 'axios';

const Context = React.createContext();

export default Context;

export const Provider = ({children}) => {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [oauth, setOauth] = useState(cookies.oauth);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [user, setUser] = useState(cookies.user);

  const createUserInDB = async (oauth) => {
    try {
      const {data: user} = await axios.post(`http://localhost:3001/users`, {
        username: oauth.name,
        email: oauth.email,
        img: ''
      });
      setCookie('user', user);
    } catch (err) {
      console.log(err);
    }
  };
  const checkUserDb = async (oauth) => {
    const {data: users} = await axios.get(`http://localhost:3001/users`, {
      headers: {
        Authorization: `Bearer ${oauth.access_token}`
      }
    });
    const userFound = users.find((user) => user.email === oauth.email);
    userFound ? setCookie('user', userFound) : createUserInDB(oauth);
  };

  return (
    <Context.Provider
      value={{
        oauth: oauth,
        setOauth: (oauth) => {
          if (oauth !== null) {
            const payload = JSON.parse(
              Buffer.from(oauth.id_token.split('.')[1], 'base64').toString('utf-8')
            );
            oauth.email = payload.email;
            oauth.name = payload.name;
            checkUserDb(oauth);
            setCookie('oauth', oauth);
          } else {
            setCurrentChannel(null);
            setChannels([]);
            removeCookie('oauth');
          }
          setOauth(oauth);
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
        setUser: setUser,
        setCookie: setCookie,
        removeCookie: removeCookie
      }}>
      {children}
    </Context.Provider>
  );
};
