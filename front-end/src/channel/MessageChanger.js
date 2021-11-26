/** @jsxImportSource @emotion/react */
import { useTheme } from '@mui/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

//modal
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box
} from '@mui/material';
import AvatarProfil from '../Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
//
import { useState } from 'react';
//time
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import updateLocale from 'dayjs/plugin/updateLocale';
import { style } from '@mui/system';

dayjs.extend(calendar);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  calendar: {
    sameElse: 'DD/MM/YYYY'
  }
});

const useStyles = (theme) => ({
  root: {
    width: '20px',
    fontFamily: 'Poppins'
  },

  box: {
    p: 2,
    marginTop: '20px',
    padding: '6px',
    boxShadow: '0px 0px 3px 1px grey',
    display: 'flex',
    backgroundColor: 'lightGrey',
    alignItems: 'center'
  },
  actions: {
    backgroundColor: 'lightGrey'
  }
});

const DeleteMessageConfirmation = ({
  handleClose,
  message,
  styles,
  channel,
  deleteMessage
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChildClose = () => {
    setOpen(false);
  };

  return (
    <div onClick={handleClickOpen}>
      <DeleteIcon
        fontSize='small'
        sx={{ marginRight: '5px', marginBottom: '-5px' }}
      />
      Delete Message
      <Dialog
        open={open}
        onClose={handleChildClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Delete Message'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            are you sure you want to delete this message?
          </DialogContentText>
          <Box css={styles.box}>
            <div style={{ marginRight: '1rem' }}>
              <AvatarProfil clickable={false} />
            </div>
            <div>
              <p style={{ fontSize: 'small', clear: 'both', color: '#4d4d4d' }}>
                {message.author} - {dayjs().calendar(message.creation)}
              </p>
              <p style={{ fontSize: 'small' }}>{message.content}</p>
            </div>
          </Box>
        </DialogContent>
        <DialogActions css={styles.actions}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              deleteMessage(message, channel);
              handleClose();
            }}
            autoFocus
            sx={{
              backgroundColor: 'red',
              color: 'white',
              padding: '5px 2rem',
              ':hover': {
                backgroundColor: '#cc0000'
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const MessageChanger = ({
  anchorEl,
  open,
  handleClose,
  message,
  channel,
  toggleEdit,
  fetchMessages,
  oauth
}) => {
  const styles = useStyles(useTheme());

  const deleteMessage = async (message, channel) => {
    console.log('deleted message = ' + JSON.stringify(message));

    const config = {
      headers: {
        Authorization: `Bearer ${oauth.access_token}`
      },
      data: {
        author: message.author,
        content: message.content,
        channelId: message.channelId,
        creation: message.creation
      }
    };

    const { data: messages } = await axios.delete(
      `http://localhost:3001/channels/${channel.id}/messages/${message.creation}`,
      { config }
    );

    fetchMessages(messages);
  };

  return (
    <div>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            toggleEdit();
          }}
          sx={{
            ':hover': {
              backgroundColor: 'white'
            }
          }}
        >
          <Button
            sx={{
              fontSize: 'small',
              ':hover': {
                backgroundColor: '#0099ff',
                color: 'white'
              }
            }}
          >
            <ModeEditOutlineIcon fontSize='small' sx={{ marginRight: '5px' }} />
            Edit Message
          </Button>
        </MenuItem>
        <MenuItem
          sx={{
            ':hover': {
              backgroundColor: 'white'
            }
          }}
        >
          <Button
            sx={{
              color: 'red',
              fontSize: 'small',
              ':hover': {
                backgroundColor: 'red',
                color: 'white'
              }
            }}
          >
            <DeleteMessageConfirmation
              deleteMessage={deleteMessage}
              handleClose={handleClose}
              message={message}
              channel={channel}
              styles={styles}
            />
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MessageChanger;
