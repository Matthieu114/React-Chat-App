/** @jsxImportSource @emotion/react */
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
// Layout
import { Link as RouterLink } from 'react-router-dom';
import { Link, IconButton } from '@mui/material';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
// Local
import Context from './Context';
import { useNavigate } from 'react-router-dom';
import Discussions from './Discussions';

const styles = {
  root: {
    minWidth: '200px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    backgroundColor: 'white'
  },
  list: {
    overflow: 'auto'
  },
  channel: {
    padding: '1.2rem',
    whiteSpace: 'nowrap',
    ':hover': {
      backgroundColor: 'lightgrey'
    }
  }
};

export default function Channels() {
  const { oauth, channels, setChannels } = useContext(Context);
  const [isShown, setIsShown] = useState(false);
  const [currentChannel, setCurrentChannel] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: channels } = await axios.get(
          'http://localhost:3001/channels',
          {
            headers: {
              Authorization: `Bearer ${oauth.access_token}`
            }
          }
        );
        setChannels(channels);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [oauth, setChannels]);

  return (
    <div css={styles.root}>
      <Discussions />
      <ul css={styles.list}>
        {/* <li css={styles.channel}>
          <Link to='/channels' component={RouterLink}>
            Welcome
          </Link>
        </li> */}
        {channels.map((channel, i) => (
          <li
            key={i}
            css={styles.channel}
            onMouseEnter={(e) => {
              setIsShown(true);
              setCurrentChannel(e.target.innerText);
            }}
            onMouseLeave={(e) => setIsShown(false)}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/channels/${channel.id}`);
            }}
          >
            <Link
              sx={{ textDecoration: 'none', color: 'black' }}
              href={`/channels/${channel.id}`}
            >
              {channel.name}
            </Link>
            {currentChannel === channel.name.trim() && isShown && (
              <IconButton
                style={{ float: 'right', margin: '-15px' }}
                color='info'
              >
                <RemoveOutlinedIcon />
              </IconButton>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
