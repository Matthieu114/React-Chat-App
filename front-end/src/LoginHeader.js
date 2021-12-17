/** @jsxImportSource @emotion/react */
import {Button} from '@mui/material';
import {height} from '@mui/system';
import {Link} from 'react-router-dom';
import logo from './icons/logo.svg';

const styles = {
  root: {
    backgroundColor: 'transparent',
    padding: '1em 0px',
    display: 'flex',
    flexDirection: 'row',
    '& a': {
      color: 'white',
      textDecoration: 'none',
      fontWeight: 'bold'
    }
  },
  headerOptions: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    minWidth: '200px',
    '& a:hover': {
      color: '#e6e6e6'
    }
  },
  headerInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '50%',
    minWidth: '100px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '50px',
    width: '50%',
    '& img': {}
  },
  github: {paddingRight: '1rem'},
  resume: {padding: '0 4rem'},
  button: {
    backgroundColor: 'white'
  },
  buttons: {
    color: 'white'
  },
  about: {}
};

const LoginHeader = () => {
  return (
    <header css={styles.root}>
      <div css={styles.logo}>
        <a href=''>
          <img
            src={logo}
            alt='logo'
            style={{
              margin: '0',
              maxWidth: '100px',
              maxHeight: '50px',
              width: 'auto',
              height: 'auto'
            }}
          />
        </a>
      </div>
      <div css={styles.headerOptions}>
        <a href='#'>
          <span css={styles.about}>About</span>
        </a>
        <a href='#'>
          <span css={styles.about}>Functionalities</span>
        </a>
        <a href='#'>
          <span css={styles.about}>Mobile App</span>
        </a>
        <a href='#'>
          <span css={styles.about}>Confidentiality & Security</span>
        </a>
      </div>

      <div css={styles.headerInfo}>
        <div css={styles.resume}>
          <span style={{marginRight: '1rem'}}>
            <Button variant='outlined' color='info' css={styles.buttons}>
              <Link to='/signup'>Sign Up</Link>
            </Button>
          </span>
          <span>
            <Button variant='outlined' color='info' css={styles.buttons}>
              <Link to='/'>Login </Link>
            </Button>
          </span>
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;
