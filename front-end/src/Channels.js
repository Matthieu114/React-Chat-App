/** @jsxImportSource @emotion/react */
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
// Layout
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

const ChannelComponent = ({ i, channel, deleteChannel }) => {
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();
  let canClick = true;

  return (
    <li
      key={i}
      css={styles.channel}
      onMouseEnter={(e) => {
        setIsShown(true);
      }}
      onMouseLeave={(e) => setIsShown(false)}
      onClick={(e) => {
        e.preventDefault();
        canClick == true
          ? navigate(`/channels/${channel.id}`)
          : (canClick = false);
      }}
    >
      <Link
        sx={{ textDecoration: 'none', color: 'black' }}
        href={`/channels/${channel.id}`}
      >
        {channel.name}
      </Link>
      {isShown && (
        <IconButton
          style={{ float: 'right', margin: '-15px' }}
          color='info'
          onClick={(e) => {
            canClick = false;
            e.preventDefault();
            deleteChannel(channel);
          }}
        >
          <RemoveOutlinedIcon />
        </IconButton>
      )}
    </li>
  );
};

export default function Channels() {
  const { oauth, channels, setChannels, setCurrentChannel } =
    useContext(Context);
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

  const fetchChannels = async () => {
    const { data: channels } = await axios.get(
      'http://localhost:3001/channels',
      {
        headers: {
          Authorization: `Bearer ${oauth.access_token}`
        }
      }
    );
    setChannels(channels);
  };

  const removeChannel = (channel) => {
    const arr = channels.filter(function (item) {
      return item.id !== channel.id;
    });

    setChannels(arr);
    setCurrentChannel({});
  };

  const deleteChannel = async (channel) => {
    const config = {
      headers: {
        Authorization: `Bearer ${oauth.access_token}`
      },
      data: {
        name: channel.name,
        id: channel.id
      }
    };

    const { data: channels } = await axios.delete(
      `http://localhost:3001/channels/${channel.id}`,
      { config }
    );

    removeChannel(channel);
    fetchChannels(channels);
  };

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
          <ChannelComponent
            i={i}
            channel={channel}
            deleteChannel={deleteChannel}
          />
        ))}
      </ul>
    </div>
  );
}
