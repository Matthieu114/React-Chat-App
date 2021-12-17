/** @jsxImportSource @emotion/react */
import {useContext, useState} from 'react';
// Layout
import {useTheme} from '@mui/styles';
import {IconButton, Link, Button} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Context from './Context';
import ModifyChannelModal from './channel/ModifyChannelModal';
import EditChannelDrawer from './EditChannelDrawer';

const useStyles = (theme) => ({
  header: {
    padding: theme.spacing(1),
    backgroundColor: 'white',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0px 0px 7px 1px grey'
  },
  headerLogIn: {
    backgroundColor: 'red'
  },
  headerLogOut: {
    backgroundColor: 'blue'
  },
  menu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none !important'
    }
  }
});

export default function Header({channel}) {
  const styles = useStyles(useTheme());
  const [isShown, setIsShown] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  let canClick = true;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const {oauth, setOauth, drawerVisible, setDrawerVisible, removeCookie, setUser} =
    useContext(Context);
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible);
  };
  const onClickLogout = (e) => {
    e.stopPropagation();
    setOauth(null);
    setUser(null);
    removeCookie('oauth');
    removeCookie('user');
    removeCookie('code_verifier');
  };
  const handleClose = () => {
    setAnchorEl(null);
    setIsShown(false);
  };

  return (
    <header css={styles.header}>
      <IconButton
        color='inherit'
        aria-label='open drawer'
        onClick={drawerToggle}
        css={styles.menu}>
        <MenuIcon />
      </IconButton>
      <h3 style={{whiteSpace: 'nowrap', color: 'black'}}>{channel.name}</h3>
      {oauth ? (
        <span style={{width: '100%'}}>
          <Link onClick={onClickLogout} sx={{color: 'black', float: 'right'}}>
            <IconButton>
              <LogoutIcon />
            </IconButton>
          </Link>
          <span style={{float: 'right'}}>
            <EditChannelDrawer channel={channel} />
          </span>
        </span>
      ) : (
        <span>new user</span>
      )}
    </header>
  );
}
