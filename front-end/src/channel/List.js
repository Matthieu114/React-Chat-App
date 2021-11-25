/** @jsxImportSource @emotion/react */
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
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
import Context from '../Context';
import { useContext } from 'react';

dayjs.extend(calendar);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  calendar: {
    sameElse: 'DD/MM/YYYY hh:mm A'
  }
});

const useStyles = (theme) => ({
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
    padding: '.2rem .5rem',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,.05)'
    }
  },
  fabWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50px'
  },
  fab: {
    position: 'fixed !important',
    top: '0',
    width: '50px'
  },

  edit: {
    display: 'flex',
    alignItems: 'center'
  }
});

const LiMessage = ({ message, i, value, channel, setMessages }) => {
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
    <li
      key={i}
      css={styles.message}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <p>
        <span>{message.author}</span>
        {' - '}
        <span>{dayjs().calendar(message.creation)}</span>
        {isShown && oauth.email === message.author ? (
          <MoreVertIcon
            color='info'
            onClick={handleClick}
            style={{ margin: '-10px 0px' }}
          />
        ) : (
          console.log('not yourmessage')
        )}
        <MessageChanger
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          message={message}
          channel={channel}
          setMessages={setMessages}
          editOpen={toggleEdit}
          fetchMessages={fetchMessages}
          oauth={oauth}
        />
      </p>
      {!editOpen ? (
        <div dangerouslySetInnerHTML={{ __html: value }}></div>
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
            color='info'
            sx={{
              input: { color: 'white' }
            }}
          ></TextField>
          <Button
            onClick={() => {
              toggleEdit();
              editMessage(message, channel);
            }}
            color='info'
          >
            confirm
          </Button>
          <Button onClick={closeEdit} color='info'>
            Cancel
          </Button>
        </div>
      )}
    </li>
  );
};

export default forwardRef(
  ({ messages, onScrollDown, channel, setMessages }, ref) => {
    const styles = useStyles(useTheme());
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
              />
            );
          })}
        </ul>
        <div ref={scrollEl} />
      </div>
    );
  }
);
