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

export default function Header({ channel }) {
	const styles = useStyles(useTheme());
	const {
		oauth,
		setOauth,
		drawerVisible,
		setDrawerVisible,
		removeCookie,
		cookies
	} = useContext(Context);
	const drawerToggle = (e) => {
		setDrawerVisible(!drawerVisible);
	};
	const onClickLogout = (e) => {
		e.stopPropagation();
		setOauth(null);
		removeCookie('user');
		removeCookie('oauth');
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
			<h3 style={{ whiteSpace: 'nowrap', color: 'black' }}>{channel.name}</h3>
			{oauth ? (
				<span style={{ width: '100%' }}>
					<Link onClick={onClickLogout} sx={{ color: 'black', float: 'right' }}>
						logout
					</Link>
				</span>
			) : (
				<span>new user</span>
			)}
		</header>
	);
}
