/** @jsxImportSource @emotion/react */
//Local
import {useContext, useState} from 'react';
import {IconButton, Link, Button} from '@mui/material';
import Context from './Context';
import SearchBar from './SearchBar';
import AddChannel from './channel/AddChannel.js';
import AvatarProfil from './Avatar';
import ModifyChannelModal from './channel/ModifyChannelModal';
import EditChannelDrawer from './EditChannelDrawer';
import LogoutIcon from '@mui/icons-material/Logout';

const styles = {
  root: {
    marginTop: '0px',
    position: 'sticky',
    top: '0',
    backgroundColor: 'White'
  },
  text: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '-5px',
    color: 'black',
    clear: 'both'
  },
  avatar: {
    marginRight: '10px'
  }
};

const Discussions = ({setChannels, oauth}) => {
  const {setOauth, removeCookie, setUser, user, channel} = useContext(Context);

  const onClickLogout = (e) => {
    e.stopPropagation();
    setOauth(null);
    setUser(null);
    removeCookie('oauth');
    removeCookie('user');
    removeCookie('code_verifier');
  };
  return (
    <div css={styles.root}>
      <h2 css={styles.text}>
        <AvatarProfil sx={styles.avatar} clickable={true} inUser={false} />
        <p style={{margin: '0 5px'}}>Discussions</p> <AddChannel />
        {oauth || user !== null ? (
          <span style={{width: '100%'}}>
            <Link onClick={onClickLogout} sx={{color: 'black'}}>
              <IconButton color='info'>
                <LogoutIcon fontSize='small' />
              </IconButton>
            </Link>
          </span>
        ) : (
          <div>
            <span>new user</span>
          </div>
        )}
      </h2>

      <SearchBar setChannels={setChannels} oauth={oauth} />
    </div>
  );
};

export default Discussions;
