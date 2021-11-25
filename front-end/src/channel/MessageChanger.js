/** @jsxImportSource @emotion/react */
import { useTheme } from '@mui/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

//modal
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import AvatarProfil from '../Avatar';
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

  const clickable = false;
  return (
    <div onClick={handleClickOpen}>
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
              <AvatarProfil clickable={clickable} />
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
  editOpen,
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
    <div css={styles}>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            editOpen();
          }}
        >
          Edit Message
        </MenuItem>
        <MenuItem>
          <DeleteMessageConfirmation
            deleteMessage={deleteMessage}
            handleClose={handleClose}
            message={message}
            channel={channel}
            styles={styles}
          />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MessageChanger;
