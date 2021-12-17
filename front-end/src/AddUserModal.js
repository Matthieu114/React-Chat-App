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

const UserComponent = ({
  user,
  key,
  channelUser,
  setChannelUser,
  channelName,
  setChannelName
}) => {
  const handleCheckboxChange = (e) => {
    let newArray = [...channelUser, e.target.id];
    if (channelUser.includes(e.target.id)) {
      newArray = newArray.filter((user) => user !== e.target.id);
    }

    setChannelUser(newArray);
  };

  const handleNames = (e) => {
    let newArray = [...channelName, e.target.value];
    if (channelName.includes(e.target.value)) {
      newArray = newArray.filter((name) => name !== e.target.value);
    }

    setChannelName(newArray);
  };

  return (
    <div key={key} css={styles.userContainerRoot}>
      <span css={styles.userContainer}>
        <AvatarProfil userName={user} inUser={true} />
        {user.username}
      </span>
      <span>
        <Checkbox
          onChange={(e) => {
            handleCheckboxChange(e);
            handleNames(e);
          }}
          value={user.username}
          id={user.id}
        />
      </span>
    </div>
  );
};

const AddChannel = () => {
  const {setChannels, oauth, users, setUsers, channels, user} = useContext(Context);
  const [channelUser, setChannelUser] = useState([]);
  const [channelName, setChannelName] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
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
        Authorization: `Bearer ${oauth?.access_token}`
      }
    });
    setChannels(channels);
  };

  const onKeyPress = ({nativeEvent: {key: keyValue}}) => {
    if (keyValue === 'Enter') handleSubmit();
  };

  const handleSubmit = async () => {
    let channelNames = [];

    channelName.forEach((user) => {
      channelNames.push(user);
    });

    const {data: channels} = await axios.post(`http://localhost:3001/channels`, {
      usersId: channelUser,
      name: channelNames.toString()
    });
    fetchChannels(channels);
    setChannelName([]);
    setChannelUser([]);
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
                myuser?.username !== user?.username && (
                  <UserComponent
                    user={myuser}
                    key={i}
                    channelUser={channelUser}
                    setChannelUser={setChannelUser}
                    channelName={channelName}
                    setChannelName={setChannelName}
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
