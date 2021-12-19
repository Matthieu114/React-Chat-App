import React, {useContext, useState, useEffect} from 'react';
import {
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  ListItemAvatar,
  ListItemButton,
  Checkbox
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import UserSearchBar from './UserSearchBar';
import axios from 'axios';
import {useParams} from 'react-router-dom';
//Context
import Context from './Context';
import AvatarProfil from './Avatar';

const styles = {};

const AddUserModal = ({channelUsers}) => {
  const [open, setOpen] = useState(false);
  const [notInChannel, setNotInChannel] = useState([]);
  const [addUserId, setAddUserId] = useState([]);
  const {setUsers, users, user, channels} = useContext(Context);
  const {id} = useParams();
  const channel = channels.find((channel) => channel.id === id);

  const handleChildOpen = () => {
    setOpen(true);
  };
  const handleChildClose = () => {
    setOpen(false);
  };

  const onKeyPress = async ({nativeEvent: {key: keyValue}}) => {
    if (keyValue === 'Enter') {
      await handleChildClose();
    }
  };

  const filterUsersinChannel = () => {
    if (channelUsers != null) {
      const notInChannel = [].concat(
        users.filter((user) =>
          channelUsers?.every((userChan) => userChan.username !== user.username)
        )
      );
      const finalChannel = notInChannel?.filter((currentUser) => {
        return currentUser.username !== user.username;
      });
      setNotInChannel(finalChannel);
    } else {
      const finalChannel = users?.filter((currentUser) => {
        return currentUser.username !== user.username;
      });
      setNotInChannel(finalChannel);
    }
  };

  const handleCheckboxChange = (e) => {
    let newArray = [...addUserId, e.target.id];
    if (addUserId.includes(e.target.id)) {
      newArray = newArray.filter((user) => user !== e.target.id);
    }

    setAddUserId(newArray);
  };

  const handleSubmit = async () => {
    let userIds = [];

    addUserId.forEach((user) => {
      userIds.push(user);
    });

    const {data: channels} = await axios.put(
      `http://localhost:3001/channels/${channel.id}`,
      {
        name: channel.name,
        usersId: addUserId
      }
    );
    setAddUserId([]);
  };

  return (
    <div
      onClick={() => {
        handleChildOpen();
        filterUsersinChannel();
      }}>
      <form onSubmit={handleSubmit}>
        <ListItem button>
          <ListItemIcon>
            <AddCircleIcon color='info' />
          </ListItemIcon>
          <ListItemText primary={'Add new member'} />
        </ListItem>
        <Dialog
          open={open}
          onClose={handleChildClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'>
          <DialogTitle
            id='alert-dialog-title'
            sx={{
              textAlign: 'center',
              borderBottom: 'solid lightgrey 1px',
              marginBottom: '1rem'
            }}>
            Add friends to the group
            <IconButton
              sx={{float: 'right'}}
              onClick={async () => {
                await handleChildClose();
                setOpen(false);
              }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{overflowX: 'hidden'}}>
            <UserSearchBar setUsers={setUsers} />
            <DialogContentText
              id='alert-dialog-description'
              sx={{fontSize: 'medium', marginTop: '1rem'}}>
              Suggestions
            </DialogContentText>
          </DialogContent>
          <DialogContent sx={{maxHeight: '10rem'}}>
            <List component='div' disablePadding>
              {notInChannel?.map((user, key) => {
                return (
                  <div>
                    <ListItem button>
                      <ListItemAvatar>
                        <AvatarProfil userName={user} inUser={true}></AvatarProfil>
                      </ListItemAvatar>
                      <ListItemText primary={user.username} />
                      <Checkbox id={user.id} onClick={handleCheckboxChange} />
                    </ListItem>
                  </div>
                );
              })}
            </List>
          </DialogContent>
          <DialogActions css={styles.actions}>
            <Button
              type='submit'
              onClick={async () => {
                await handleChildClose();
                setOpen(false);
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
        </Dialog>
      </form>
    </div>
  );
};

export default AddUserModal;
