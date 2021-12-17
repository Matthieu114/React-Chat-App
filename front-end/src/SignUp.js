/** @jsxImportSource @emotion/react */
import {useContext, useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import crypto from 'crypto';
import qs from 'qs';
import axios from 'axios';
// Layout
import {useTheme} from '@mui/styles';
import {Link} from 'react-router-dom';
import {Button, TextField, DialogContentText, DialogTitle} from '@mui/material';

// Local
import Context from './Context';
import {useNavigate} from 'react-router-dom';
import LoginHeader from './LoginHeader';

const base64URLEncode = (str) => {
  return str
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

const sha256 = (buffer) => {
  return crypto.createHash('sha256').update(buffer).digest();
};

const useStyles = (theme) => ({
  root: {
    flex: '1 1 auto',
    background: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div': {
      margin: `${theme.spacing(1)}`,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    '& fieldset': {
      border: 'none',
      '& label': {
        marginBottom: theme.spacing(0.5),
        display: 'block'
      }
    }
  }
});

const Redirect = ({config, codeVerifier}) => {
  const styles = useStyles(useTheme());
  const redirect = (e) => {
    e.stopPropagation();
    const code_challenge = base64URLEncode(sha256(codeVerifier));
    const url = [
      `${config.authorization_endpoint}?`,
      `client_id=${config.client_id}&`,
      `scope=${config.scope}&`,
      `response_type=code&`,
      `redirect_uri=${config.redirect_uri}&`,
      `code_challenge=${code_challenge}&`,
      `code_challenge_method=S256`
    ].join('');
    window.location = url;
  };
  return (
    <div>
      <Button
        onClick={redirect}
        variant='contained'
        className='oauth-button'
        fullWidth>
        Sign Up with Github
      </Button>
    </div>
  );
};

const LoginForm = ({config, codeVerifier}) => {
  const {email, setEmail, password, setPassword, username, setUsername, setUser} =
    useContext(Context);
  const navigate = useNavigate();
  let userExists;

  const checkUsers = async () => {
    const {data: users} = await axios.get(`http://localhost:3001/users`);

    const userEmailExist = users.filter((user) => user.email === email);
    const userNameExist = users.filter((user) => user.username === username);

    if (userEmailExist.length === 0 && userNameExist.length === 0) {
      userExists = false;
    } else {
      userExists = true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await checkUsers();

    if (userExists) {
      const div = document.getElementById('error-message');
      div.innerHTML = 'Username or email already exists!';
      return;
    } else {
      const {data: newUser} = await axios.post(`http://localhost:3001/users`, {
        username: username,
        email: email,
        password: password
      });
      setUser(newUser);
      navigate(`/`);
    }
  };

  const validateForm = () => {
    return email.length > 0 && password.length > 6;
  };

  return (
    <body>
      <LoginHeader />
      <div className='App-login'>
        <form className='Form' onSubmit={handleSubmit}>
          <DialogTitle
            id='alert-dialog-title'
            sx={{
              textAlign: 'center',
              borderBottom: 'solid lightgrey 1px',
              marginBottom: '1rem'
            }}>
            Chat Anywhere Anytime
          </DialogTitle>

          <p style={{fontSize: 'small', textAlign: 'left', color: 'grey'}}>
            sign up to connect with your friends
          </p>

          <br></br>
          <TextField
            label='Name'
            id='name'
            type='text'
            variant='outlined'
            color='info'
            required
            size='small'
            onChange={(e) => setUsername(e.target.value)}
          />
          <br></br>
          <TextField
            label='Email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            variant='outlined'
            color='info'
            required
            size='small'
          />
          <br></br>
          <TextField
            label='Password'
            size='small'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            variant='outlined'
            color='info'
            required
          />
          <div
            id='error-message'
            style={{
              color: 'red',
              textAlign: 'left',
              fontSize: 'small',
              marginTop: '10px'
            }}></div>
          <Button
            type='submit'
            variant='contained'
            color='info'
            className='login-button'
            disabled={!validateForm()}
            onClick={(e) => {
              handleSubmit(e);
            }}>
            Get started, it's free!
          </Button>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <hr style={{color: 'grey', width: '40%'}} />
            <p style={{fontSize: 'small', color: 'grey'}}>or</p>
            <hr style={{color: 'grey', width: '40%'}} />
          </div>
          <Redirect codeVerifier={codeVerifier} config={config} />
          <p>
            By continuing you agree to BriceDenis's <a href='#'>terms of use</a>
          </p>
          <DialogContentText
            sx={{marginTop: '10px', textAlign: 'left', fontSize: 'small'}}>
            Already signed up? <Link to='/'>Log In!</Link>
          </DialogContentText>
        </form>
      </div>
    </body>
  );
};

const Tokens = ({oauth}) => {
  const {setOauth, setUser, removeCookie} = useContext(Context);
  const styles = useStyles(useTheme());
  const {id_token} = oauth;
  const id_payload = id_token.split('.')[1];
  const {email} = JSON.parse(atob(id_payload));
  const logout = (e) => {
    e.stopPropagation();
    setOauth(null);
  };

  return (
    <div css={styles.root}>
      Welcome {email}
      <Link onClick={logout} color='secondary'>
        logout blud
      </Link>
    </div>
  );
};

const LoadToken = ({code, codeVerifier, config, removeCookie, setOauth}) => {
  const styles = useStyles(useTheme());
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const {data} = await axios.post(
          config.token_endpoint,
          qs.stringify({
            grant_type: 'authorization_code',
            client_id: `${config.client_id}`,
            code_verifier: `${codeVerifier}`,
            redirect_uri: `${config.redirect_uri}`,
            code: `${code}`
          })
        );
        removeCookie('code_verifier');
        setOauth(data);
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  });
  return <div css={styles.root}>Loading tokens</div>;
};

export default function SignUp() {
  const styles = useStyles(useTheme());
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const {oauth, setOauth} = useContext(Context);
  const config = {
    authorization_endpoint: 'http://localhost:5556/dex/auth',
    token_endpoint: 'http://localhost:5556/dex/token',
    client_id: 'BriceDenis',
    redirect_uri: 'http://127.0.0.1:3000',
    scope: 'openid%20profile%20email%20offline_access'
  };
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  // is there a code query parameters in the url
  if (!code) {
    // no: we are not being redirected from an oauth server
    if (!oauth) {
      const codeVerifier = base64URLEncode(crypto.randomBytes(32));
      setCookie('code_verifier', codeVerifier);
      return (
        <div>
          <LoginForm codeVerifier={codeVerifier} config={config} css={styles.root} />
        </div>
      );
    } else {
      // yes: user is already logged in, great, is is working
      return <Tokens oauth={oauth} css={styles.root} />;
    }
  } else {
    return (
      <LoadToken
        code={code}
        codeVerifier={cookies.code_verifier}
        config={config}
        setOauth={setOauth}
        removeCookie={removeCookie}
      />
    );
  }
}
