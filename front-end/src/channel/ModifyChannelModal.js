import { Button, Box, Modal, TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';
//Context
import Context from '../Context';
import React, { useContext, useState } from 'react';

const styles = {
	modal: {
		display: 'flex',
		flexDirection: 'column',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
		backgroundColor: 'white'
	}
};

const ModifyChannelModal = ({ channel, handleClose }) => {
	const [open, setOpen] = useState(false);
	const handleChildOpen = () => {
		setOpen(true);
	};
	const handleChildClose = () => {
		setOpen(false);
	};
	const { setChannels, oauth } = useContext(Context);

	const onKeyPress = ({ nativeEvent: { key: keyValue } }) => {
		if (keyValue === 'Enter') {
			updateChannel(channel);
			handleClose();
		}
	};

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

	const updateChannel = async (channel) => {
		const { data: channels } = await fetch(
			`http://localhost:3001/channels/${channel.id}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${oauth.access_token}`,
					'Content-type': 'application/json'
				},
				body: JSON.stringify({
					name: document.getElementById('modifyChannel').value
				})
			}
		);
		fetchChannels(channels);
	};

	return (
		<div onClick={handleChildOpen}>
			Modify Me
			<Modal
				open={open}
				onClose={handleChildClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={styles.modal}>
					<TextField
						sx={{
							Input: { color: 'black' },
							InputLabel: { color: 'primary' }
						}}
						fullWidth
						color='primary'
						id='modifyChannel'
						label='Name of Channel'
						name='modifyChannel'
						variant='outlined'
						onKeyPress={onKeyPress}
						helperText='Enter the new channel name'
					/>
					<Button
						onClick={() => {
							updateChannel(channel);
							handleClose();
						}}
						sx={{ justifyContent: 'center' }}>
						Modify
					</Button>
				</Box>
			</Modal>
		</div>
	);
};

export default ModifyChannelModal;
