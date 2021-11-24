/** @jsxImportSource @emotion/react */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// Layout
import { Link } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

// Local
import Context from './Context';
import Discussions from './Discussions';
import ModifyChannelModal from './channel/ModifyChannelModal';

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
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();
	let canClick = true;

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setIsShown(false);
	};

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
				canClick === true
					? navigate(`/channels/${channel.id}`)
					: (canClick = false);
			}}>
			<Link
				sx={{ textDecoration: 'none', color: 'black' }}
				href={`/channels/${channel.id}`}>
				{channel.name}
			</Link>
			{isShown && (
				<MoreHorizIcon
					color='info'
					onClick={(e) => {
						canClick = false;
						handleClick(e);
					}}
					style={{ float: 'right' }}
				/>
			)}

			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button'
				}}>
				<MenuItem
					onClick={() => {
						canClick = false;
					}}>
					<ModifyChannelModal channel={channel} handleClose={handleClose} />
				</MenuItem>
				<MenuItem
					style={{ float: 'right' }}
					color='info'
					onClick={(e) => {
						canClick = false;
						handleClose();
						e.preventDefault();
						deleteChannel(channel);
					}}>
					Delete Channel <RemoveOutlinedIcon />
				</MenuItem>
			</Menu>
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
