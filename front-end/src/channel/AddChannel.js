/** @jsxImportSource @emotion/react */
import {
  Button,
  Box,
  Modal,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  DialogActions,
  DialogContent,
  DialogContentText,
  Checkbox,
  DialogTitle
} from '@mui/material';
import axios from 'axios';
//Context
import Context from '../Context';
import {useContext, useState} from 'react';
//local
import AddRounded from '@mui/icons-material/AddRounded';
import UserSearchBar from '../UserSearchBar';
import AvatarProfil from '../Avatar';

const styles = {
  userContainerRoot: {
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
    ':hover': {
      backgroundColor: '#d9d9d9'
    },
    width: '100%',
    justifyContent: 'space-between'
  },
  userContainer: {
    display: 'flex',
    alignItems: 'center'
  }
};

const UserComponent = ({user, key, channelUsers}) => {
  let check = false;

  const handleChange = (e) => {
    check = e.target.checked;
    console.log(check);
  };

  const removeArray = (channelUsers, userRemove) => {
    return channelUsers.filter((user) => {
      return user != userRemove;
    });
  };

  return (
    <div key={key} css={styles.userContainerRoot}>
      <span css={styles.userContainer}>
        <AvatarProfil userName={user} />
        {user.username}
      </span>
      <span>
        <Checkbox
          onClick={async (e) => {
            await handleChange(e);
            check ? channelUsers.push(user) : removeArray(channelUsers, user);
            console.log(channelUsers);
          }}
        />
      </span>
    </div>
  );
};

const AddChannel = () => {
  const {setChannels, oauth, users, setUsers, channels, user} = useContext(Context);
  const channelUsers = [];
  const [anchorEl, setAnchorEl] = useState(null);
  const checked = [];
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchUsers = async () => {
    const {data: users} = await axios.get('http://localhost:3001/users', {});
    setUsers(users);
  };

  const fetchChannels = async () => {
    const {data: channels} = await axios.get('http://localhost:3001/channels', {
      headers: {
        Authorization: `Bearer ${oauth.access_token}`
      }
    });
    setChannels(channels);
  };

  const onSubmit = async () => {
    const {data: channels} = await axios.post(`http://localhost:3001/channels`, {
      name: document.getElementById('newChannel').value
    });
    fetchChannels(channels);
    handleClose();
  };

  const onKeyPress = ({nativeEvent: {key: keyValue}}) => {
    if (keyValue === 'Enter') onSubmit();
  };

  const handleSubmit = () => {
    console.log(channels);
  };

  return (
    <div>
      <IconButton
        color='info'
        variant='outlined'
        onClick={(e) => {
          handleClick(e);
          fetchUsers();
        }}>
        <AddRounded />
      </IconButton>
      <form onSubmit={handleSubmit}>
        <Menu
          id='demo-positioned-menu'
          aria-labelledby='demo-positioned-button'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          sx={{boxShadow: '0px 0px 7px 1px grey'}}>
          <DialogTitle
            id='alert-dialog-title'
            sx={{
              textAlign: 'left',
              borderBottom: 'solid lightgrey 1px',
              marginBottom: '1rem'
            }}>
            Create new discussion
            <p style={{fontSize: 'small'}}>Select friends</p>
            <UserSearchBar setUsers={setUsers} />
          </DialogTitle>
          <DialogContent sx={{maxHeight: '10rem', minWidth: '400px'}}>
            {users.map((myuser, i) => {
              return (
                myuser.username !== user.username && (
                  <UserComponent
                    user={myuser}
                    checked={checked}
                    key={i}
                    channelUsers={channelUsers}
                  />
                )
              );
            })}
          </DialogContent>
          <DialogActions css={styles.actions}>
            <Button
              type='submit'
              onClick={() => {
                handleClose();
                handleSubmit();
              }}
              fullWidth
              sx={{padding: '5px 2rem'}}
              variant='contained'
              color='info'
              onKeyPress={onKeyPress}>
              Create Channel
            </Button>
          </DialogActions>
        </Menu>
      </form>
    </div>
  );
};

export default AddChannel;
