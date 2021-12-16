/** @jsxImportSource @emotion/react */
import {useContext, useEffect} from 'react';
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
        fullWidth
        className='oauth-button'>
        Login with Github
      </Button>
    </div>
  );
};

const LoginForm = ({config, codeVerifier}) => {
  return (
    <body>
      <LoginHeader />
      <div className='App-login'>
        <form className='Form'>
          <DialogTitle
            id='alert-dialog-title'
            sx={{
              textAlign: 'center',
              borderBottom: 'solid lightgrey 1px',
              marginBottom: '1rem'
            }}>
            Chat Anywhere Anytime
          </DialogTitle>
          <p>Log in to your account</p>
          <TextField
            label='Email'
            id='email'
            type='text'
            variant='outlined'
            color='info'
          />
          <br></br>
          <TextField
            label='Password'
            id='password'
            type='password'
            variant='outlined'
            color='info'
          />
          <Button
            type='button'
            variant='contained'
            color='info'
            className='login-button'>
            Log In
          </Button>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <hr style={{color: 'black', width: '40%'}} />
            <p style={{fontSize: 'small', color: 'grey'}}>or</p>
            <hr style={{color: 'black', width: '40%'}} />
          </div>
          <Redirect codeVerifier={codeVerifier} config={config} />
          <DialogContentText sx={{marginTop: '10px'}}>
            New to Brice Denis?
            <Link to='/signup'>Sign up!</Link>
          </DialogContentText>
        </form>
      </div>
    </body>
  );
};

const Tokens = ({oauth}) => {
  const {setOauth} = useContext(Context);
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
      Welcome {email}{' '}
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

export default function Login() {
  const styles = useStyles(useTheme());
  // const location = useLocation();
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
