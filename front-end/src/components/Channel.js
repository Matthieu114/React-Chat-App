/** @jsxImportSource @emotion/react */
import { useRef, useState, useContext } from 'react';
import axios from 'axios';
// Layout
import { useTheme } from '@mui/styles';
import { Fab } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// Local
import Form from '../channel/Form';
import List from '../channel/List';
import { Session } from '../SessionContext';
//width
import { drawerWidth } from '../Main';

const useStyles = (theme) => ({
  root: {
    height: '100%',
    width: `calc(100vw - ${drawerWidth}px)`,
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(0,0,0,.2)',
    position: 'fixed',
    bottom: '0',
    overflow: 'auto'
  },

  mobile: {
    height: '100%',
    width: '100vw',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(0,0,0,.2)',
    position: 'fixed',
    bottom: '0',
    overflow: 'auto'
  },
  fab: {
    position: 'absolute !important',
    // position: 'fixed !important',
    top: theme.spacing(2),
    // width: '50px',
    // bottom: '0',
    // marginLeft: '100%',
    // bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  fabDisabled: {
    display: 'none !important'
  }
});

export default function Channel({ open }) {
  const styles = useStyles(useTheme());
  const listRef = useRef();
  const channelId = useRef();
  const [scrollDown, setScrollDown] = useState(false);

  const { messages, setMessages, channel } = useContext(Session);

  const fetchMessages = async () => {
    const { data: messages } = await axios.get(
      `http://localhost:3001/channels/${channel.id}/messages`
    );
    setMessages(messages);
    if (listRef.current) listRef.current.scroll();
  };

  const addMessage = (message) => {
    fetchMessages();
  };

  if (channelId.current !== channel.id) {
    fetchMessages();
    channelId.current = channel.id;
  }
  const onScrollDown = (scrollDown) => {
    setScrollDown(scrollDown);
  };
  const onClickScroll = () => {
    listRef.current.scroll();
  };
  return (
    <div css={!open ? styles.root : styles.mobile}>
      <List
        channel={channel}
        messages={messages}
        onScrollDown={onScrollDown}
        ref={listRef}
      />
      <Form addMessage={addMessage} />
      <Fab
        color='primary'
        aria-label='Latest messages'
        css={[styles.fab, scrollDown || styles.fabDisabled]}
        onClick={onClickScroll}
      >
        <ArrowDropDownIcon />
      </Fab>
    </div>
  );
}
