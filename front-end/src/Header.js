/** @jsxImportSource @emotion/react */
import { useContext } from 'react';
// Layout
import { useTheme } from '@mui/styles';
import { IconButton, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Context from './Context';

const useStyles = (theme) => ({
  header: {
    padding: theme.spacing(1),
    backgroundColor: 'black',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center'
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

export default function Header({ channel, drawerToggleListener }) {
  const styles = useStyles(useTheme());
  const { oauth, setOauth, drawerVisible, setDrawerVisible } =
    useContext(Context);
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible);
  };
  const onClickLogout = (e) => {
    e.stopPropagation();
    setOauth(null);
  };
  return (
    <header css={styles.header}>
      <IconButton
        color='inherit'
        aria-label='open drawer'
        onClick={drawerToggle}
        css={styles.menu}
      >
        <MenuIcon />
      </IconButton>
      <h3>{channel.name}</h3>
      {oauth ? (
        <span>
          <Link
            onClick={onClickLogout}
            sx={{ color: 'white', justifyContent: 'right' }}
          >
            logout
          </Link>
        </span>
      ) : (
        <span>new user</span>
      )}
    </header>
  );
}
