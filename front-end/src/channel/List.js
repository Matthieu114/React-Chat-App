/** @jsxImportSource @emotion/react */
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  useContext
} from 'react';
import Context from '../Context';
// Layout
import { useTheme } from '@mui/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, TextField } from '@mui/material';
// Markdown
import { unified } from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';
// Time
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import updateLocale from 'dayjs/plugin/updateLocale';
//local
import MessageChanger from './MessageChanger';
import axios from 'axios';

dayjs.extend(calendar);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  calendar: {
    sameElse: 'DD/MM/YYYY hh:mm A'
  }
});

const useStyles = (theme) => ({
  rootdiv: { width: '100%' },
  root: {
    position: 'relative',
    flex: '1 1 auto',
    overflow: 'auto',
    '& ul': {
      margin: 0,
      padding: 0,
      textIndent: 0,
      listStyleType: 0
    }
  },
  message: {
    padding: '1px .8rem',
    ':hover': {
      backgroundColor: '#737373'
    },
    margin: '10px 5px',
    fontSize: 'small',
    borderRadius: '20px 15px 15px 0px',
    backgroundColor: '#999999',
    width: 'fit-content',
    color: 'white'
  },
  myMessage: {
    padding: '1px .8rem',
    ':hover': {
      backgroundColor: '#0099ff'
    },
    margin: '5px 15px 15px 0px',
    fontSize: 'small',
    borderRadius: '20px 15px 0px 15px',
    backgroundColor: '#33adff',
    width: 'fit-content',
    color: 'white'
  },
  contentdiv: { display: 'flex', alignItems: 'center' },
  myContentDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right'
  },
  myMessageInfo: {
    display: 'flex',
    justifyContent: 'right',
    margin: '10px 15px 5px 0px'
  },
  messageInfo: {},
  edit: {
    display: 'flex',
    alignItems: 'center'
  },
  info: {
    fontSize: '12px',
    color: '#4d4d4d',
    marginLeft: '6px'
  }
});

const LiMessage = ({ message, i, value, channel, setMessages, myMessage }) => {
  const [isShown, setIsShown] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const { oauth } = useContext(Context);
  const styles = useStyles(useTheme());
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setIsShown(false);
  };

  const toggleEdit = () => {
    setEditOpen(!editOpen);
  };

  const closeEdit = () => {
    setEditOpen(false);
  };

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

  const editMessage = async (message, channel) => {
    const { data: messages } = await fetch(
      `http://localhost:3001/channels/${channel.id}/messages/${message.creation}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${oauth.access_token}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          author: oauth.email,
          content: document.getElementById('editedMessage').value
        })
      }
    );

    fetchMessages(messages);
  };

  const onKeyPress = ({ nativeEvent: { key: keyValue } }) => {
    if (keyValue === 'Enter') {
      editMessage(message, channel);
      toggleEdit();
    }
  };

  return (
    <div css={styles.rootdiv}>
      <div css={myMessage ? styles.myMessageInfo : styles.messageInfo}>
        <span css={styles.info}>{message.author}</span>
        <span css={styles.info}>{dayjs().calendar(message.creation)}</span>
      </div>
      <div
        css={myMessage ? styles.myContentDiv : styles.contentdiv}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        {isShown && oauth.email === message.author ? (
          <MoreVertIcon
            color='info'
            onClick={handleClick}
            style={{ margin: '-10px 0px' }}
          />
        ) : (
          <></>
        )}
        <MessageChanger
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          message={message}
          channel={channel}
          setMessages={setMessages}
          toggleEdit={toggleEdit}
          fetchMessages={fetchMessages}
          oauth={oauth}
        />
        <li key={i} css={myMessage ? styles.myMessage : styles.message}>
          {!editOpen ? (
            <div
              style={{
                maxInlineSize: '500px',
                width: 'fit-content',
                overflowWrap: 'break-word'
              }}
              dangerouslySetInnerHTML={{ __html: value }}
            ></div>
          ) : (
            <div css={styles.edit}>
              <TextField
                autoFocus
                type='text'
                placeholder={message.content}
                id='editedMessage'
                onKeyPress={(e) => {
                  onKeyPress(e);
                }}
                variant='standard'
                color='primary'
                sx={{
                  input: { color: 'white' }
                }}
              ></TextField>
              <Button
                onClick={() => {
                  toggleEdit();
                  editMessage(message, channel);
                }}
                sx={{ color: 'white' }}
                size='small'
              >
                confirm
              </Button>
              <Button onClick={closeEdit} sx={{ color: 'white' }} size='small'>
                Cancel
              </Button>
            </div>
          )}
        </li>
      </div>
    </div>
  );
};

export default forwardRef(
  ({ messages, onScrollDown, channel, setMessages }, ref) => {
    const { oauth } = useContext(Context);
    const styles = useStyles(useTheme());
    let myMessage = true;
    // Expose the `scroll` action
    useImperativeHandle(ref, () => ({
      scroll: scroll
    }));
    const rootEl = useRef(null);
    const scrollEl = useRef(null);

    const scroll = () => {
      scrollEl.current.scrollIntoView();
    };
    // See https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
    const throttleTimeout = useRef(null); // react-hooks/exhaustive-deps

    useLayoutEffect(() => {
      const rootNode = rootEl.current; // react-hooks/exhaustive-deps
      const handleScroll = () => {
        if (throttleTimeout.current === null) {
          throttleTimeout.current = setTimeout(() => {
            throttleTimeout.current = null;
            const { scrollTop, offsetHeight, scrollHeight } = rootNode; // react-hooks/exhaustive-deps
            onScrollDown(scrollTop + offsetHeight < scrollHeight);
          }, 200);
        }
      };

      handleScroll();
      rootNode.addEventListener('scroll', handleScroll);
      return () => rootNode.removeEventListener('scroll', handleScroll);
    });
    return (
      <div css={styles.root} ref={rootEl}>
        <ul>
          {messages.map((message, i) => {
            const { value } = unified()
              .use(markdown)
              .use(remark2rehype)
              .use(html)
              .processSync(message.content);
            return (
              <LiMessage
                message={message}
                i={i}
                value={value}
                channel={channel}
                setMessages={setMessages}
                myMessage={
                  message.author === oauth.email
                    ? (myMessage = true)
                    : console.log('lol')
                }
              />
            );
          })}
        </ul>
        <div ref={scrollEl} />
      </div>
    );
  }
);
