import {
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import axios from 'axios';
//Context
import Context from '../Context';
import React, {useContext, useState} from 'react';

const styles = {};

const ModifyChannelModal = ({channel, handleClose}) => {
  const [open, setOpen] = useState(false);
  const handleChildOpen = () => {
    setOpen(true);
  };
  const handleChildClose = () => {
    setOpen(false);
  };
  const {setChannels, oauth} = useContext(Context);

  const onKeyPress = ({nativeEvent: {key: keyValue}}) => {
    if (keyValue === 'Enter') {
      updateChannel(channel);
      handleClose();
    }
  };

  const fetchChannels = async () => {
    const {data: channels} = await axios.get('http://localhost:3001/channels', {
      headers: {
        Authorization: `Bearer ${oauth.access_token}`
      }
    });
    setChannels(channels);
  };

  const updateChannel = async (channel) => {
    const {data: channels} = await fetch(
      `http://localhost:3001/channels/${channel.id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${oauth.access_token}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: document.getElementById('modifyChannel').value
        })
      }
    );
    fetchChannels(channels);
  };

  return (
    <div onClick={handleChildOpen}>
      <ModeEditOutlineIcon
        fontSize='small'
        sx={{marginRight: '5px', marginBottom: '-5px'}}
      />
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
          {'Modify the Discussion'}
          <IconButton sx={{float: 'right'}} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description' sx={{fontSize: 'small'}}>
            When you modify the name of the channel it is modified for everybody
          </DialogContentText>
          <TextField
            fullWidth
            margin='dense'
            id='modifyChannel'
            label='Name of Channel'
            name='modifyChannel'
            variant='outlined'
            color='info'
            onKeyPress={onKeyPress}
          />
        </DialogContent>
        <DialogActions css={styles.actions}>
          <Button
            onClick={() => {
              updateChannel(channel);
              handleChildClose();
            }}
            sx={{padding: '5px 2rem'}}
            variant='outlined'
            color='info'>
            Modify
          </Button>
          <Button
            onClick={handleChildClose}
            sx={{padding: '5px 2rem'}}
            variant='outlined'
            color='info'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModifyChannelModal;
