/** @jsxImportSource @emotion/react */
import { useTheme } from '@mui/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, useContext } from 'react';
import axios from 'axios';
//Context
import { Session } from '../SessionContext';

const useStyles = (theme) => ({
	root: {
		width: '20px'
	}
});

const deleteMess = (fetchMessages, messages, channel) => {
	axios
		.delete(`http://localhost:3001/channels/${channel.id}/messages `, {
			data: messages
		})
		.then(fetchMessages);
};

const Propriety = ({ anchorEl, open, handleClose }) => {
	const styles = useStyles(useTheme());
	const { messages, setMessages, channel } = useContext(Session);
	const fetchMessages = async () => {
		const { data: messages } = await axios.get(
			`http://localhost:3001/channels/${channel.id}/messages`
		);
		setMessages(messages);
	};
	return (
		<div css={styles}>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button'
				}}>
				<MenuItem onClick={handleClose}>Modify</MenuItem>
				<MenuItem
					onClick={function (event) {
						deleteMess(fetchMessages(), messages, channel);
						handleClose();
					}}>
					Delete
				</MenuItem>
			</Menu>
		</div>
	);
};

export default Propriety;
