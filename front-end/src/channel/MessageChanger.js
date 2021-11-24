/** @jsxImportSource @emotion/react */
import { useTheme } from '@mui/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import Context from '../Context';
import { useContext, useState } from 'react';

const useStyles = (theme) => ({
  root: {
    width: '20px'
  }
});

const MessageChanger = ({
  anchorEl,
  open,
  handleClose,
  message,
  channel,
  setMessages
}) => {
  const styles = useStyles(useTheme());
  const { oauth } = useContext(Context);

  const fetchMessages = async () => {
    const { data: messages } = await axios.get(
      `http://localhost:3001/channels/${channel.id}/messages`,
      {
        headers: {
          Authorization: `Bearer ${oauth.access_token}`
        }
      }
    );
    setMessages(messages);
  };

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
        <MenuItem onClick={handleClose}>Modify</MenuItem>
        <MenuItem
          onClick={function (event) {
            handleClose();
            deleteMessage(message, channel);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MessageChanger;
