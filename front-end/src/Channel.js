/** @jsxImportSource @emotion/react */
import {useContext, useRef, useState, useEffect} from 'react';
import axios from 'axios';
// Layout
import {useTheme} from '@mui/styles';
import {Fab} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// Local
import Form from './channel/Form';
import List from './channel/List';
import Context from './Context';
import {useNavigate, useParams} from 'react-router-dom';
import Header from './Header';

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflowX: 'auto',
    backgroundColor: 'white',
    color: 'black'
  },
  fab: {
    position: 'absolute !important',
    bottom: theme.spacing(10),
    left: theme.spacing(2)
  },
  fabDisabled: {
    display: 'none !important'
  }
});

export default function Channel() {
  const navigate = useNavigate();
  const {id} = useParams();
  const {channels, oauth} = useContext(Context);
  const channel = channels.find((channel) => channel.id === id);
  const styles = useStyles(useTheme());
  const listRef = useRef();
  const [messages, setMessages] = useState([]);
  const [scrollDown, setScrollDown] = useState(false);
  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false);

  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible);
  };
  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const {data: messages} = await axios.get(
          `http://localhost:3001/channels/${id}/messages`,
          {
            headers: {
              Authorization: `Bearer ${oauth?.access_token}`
            }
          }
        );
        setMessages(messages);
        if (listRef.current) {
          listRef.current.scroll();
        }
      } catch (err) {
        navigate('/oups');
      }
    };

    fetch();
  }, [id, oauth, navigate]);

  const onScrollDown = (scrollDown) => {
    setScrollDown(scrollDown);
  };
  const onClickScroll = () => {
    listRef.current.scroll();
  };

  // On refresh, context.channel is not yet initialized
  if (!channel) {
    return <div>loading</div>;
  }
  return (
    <div css={styles.root}>
      <Header channel={channel} drawerToggleListener={drawerToggleListener} />
      <List
        messages={messages}
        onScrollDown={onScrollDown}
        ref={listRef}
        channel={channel}
        setMessages={setMessages}
      />
      <Form
        addMessage={addMessage}
        channel={channel}
        onClickScroll={onClickScroll}
      />
      <Fab
        color='blue'
        aria-label='Latest messages'
        css={[styles.fab, scrollDown || styles.fabDisabled]}
        onClick={onClickScroll}>
        <ArrowDropDownIcon />
      </Fab>
    </div>
  );
}
