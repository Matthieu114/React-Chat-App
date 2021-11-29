import { styled, alpha } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Box, AppBar, Toolbar, InputBase } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: '16px',
	backgroundColor: alpha(theme.palette.common.black, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.black, 0.1)
	},
	width: '100vw'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'black',
	'& .MuiInputBase-input': {
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%'
	}
}));

export default function SearchBar({ setChannels, oauth }) {
	const searchChannels = async () => {
		const { data: channels } = await axios.get(
			'http://localhost:3001/channels',
			{
				headers: {
					Authorization: `Bearer ${oauth.access_token}`
				}
			}
		);
		const query = document.getElementById('channel-search').value;
		setChannels(
			channels.filter((channel) => {
				const name = channel.name;
				return name.toLowerCase().includes(query.toLowerCase());
			})
		);
	};

	const onKeyPress = ({ nativeEvent: { key: keyValue } }) => {
		if (keyValue === 'Enter') searchChannels();
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static' sx={{ bgcolor: 'white', boxShadow: 'none' }}>
				<Toolbar>
					<Search>
						<SearchIconWrapper onClick={searchChannels}>
							<SearchIcon color='primary' />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder='Search…'
							inputProps={{ 'aria-label': 'search' }}
							id='channel-search'
							name='channel-search'
							onKeyPress={onKeyPress}
							onInput={searchChannels}
						/>
					</Search>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
