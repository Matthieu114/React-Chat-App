/** @jsxImportSource @emotion/react */
import { styled, alpha } from '@mui/material/styles';
import { useState, useContext } from 'react';
import axios from 'axios';
// Layout
import { IconButton, InputBase } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/styles';
import Context from '../Context';

const useStyles = (theme) => {
  // See https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/OutlinedInput/OutlinedInput.js
  const borderColor =
    theme.palette.mode === 'dark'
      ? 'rgba(0, 0, 0, 0.23)'
      : 'rgba(255, 255, 255, 0.23)';
  return {
    form: {
      borderTop: `2px solid ${borderColor}`,
      padding: '.5rem',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    content: {
      color: 'black',
      width: '85%',
      flex: '1 1 auto',
      '&.MuiTextField-root': {
        marginRight: theme.spacing(1)
      }
    },
    send: {
      float: 'right'
    }
  };
};

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    transition: theme.transitions.create('width'),
    width: '100%',
    paddingLeft: '10px',
    paddingTop: '5px'
  }
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '25px',
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1)
  },
  width: '100vw'
}));

export default function Form({ addMessage, channel, onClickScroll }) {
  const { oauth } = useContext(Context);
  const [content, setContent] = useState('');
  const styles = useStyles(useTheme());
  const onSubmit = async () => {
    const { data: message } = await axios.post(
      `http://localhost:3001/channels/${channel.id}/messages`,
      {
        content: content,
        author: oauth.email
      }
    );
    addMessage(message);
    setContent('');
  };
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const onKeyPress = ({ nativeEvent: { key: keyValue } }) => {
    if (keyValue === 'Enter') {
      onSubmit();
      onClickScroll();
    }
  };

  return (
    <form css={styles.form} onSubmit={onSubmit} noValidate>
      <Search>
        <StyledInputBase
          id='outlined-multiline-flexible'
          label='Message'
          multiline
          maxRows={4}
          value={content}
          onChange={handleChange}
          variant='outlined'
          css={styles.content}
          onKeyPress={onKeyPress}
          placeholder='Send message...'
        />
        <IconButton onClick={onSubmit} css={styles.send} color='info'>
          <SendIcon />
        </IconButton>
      </Search>
    </form>
  );
}
