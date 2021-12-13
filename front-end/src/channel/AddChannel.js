import {
	Button,
	Box,
	Modal,
	TextField,
	IconButton,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@mui/material';
import axios from 'axios';
//Context
import Context from '../Context';
import { useContext, useState } from 'react';
import AddRounded from '@mui/icons-material/AddRounded';

const styles = {
	box: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 'max-content',
		bgcolor: 'white',
		p: 4,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	box2: {
		justifyContent: 'center',
		color: 'white'
	}
};

const AddChannel = () => {
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	const handleOpen = () => setOpen(true);
	const { setChannels, oauth } = useContext(Context);

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

	const onSubmit = async () => {
		const { data: channels } = await axios.post(
			`http://localhost:3001/channels`,
			{
				name: document.getElementById('newChannel').value
			}
		);
		fetchChannels(channels);
		handleClose();
	};

	const onKeyPress = ({ nativeEvent: { key: keyValue } }) => {
		if (keyValue === 'Enter') onSubmit();
	};

	return (
		<div>
			<IconButton color='info' variant='outlined' onClick={handleOpen}>
				<AddRounded />
			</IconButton>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={styles.box}>
					<Box sx={styles.box2}>
						<TextField
							autoFocus
							fullWidth
							id='newChannel'
							label='New Channel Name'
							variant='standard'
							name='newChannel'
							onKeyPress={onKeyPress}
							helperText='New Channel Name'
						/>
						<Button
							variant='outlined'
							fullWidth
							sx={{
								marginTop: '15px',
								marginLeft: '10px',
								justifyContent: 'center'
							}}
							onClick={onSubmit}
							color='info'>
							ADD
						</Button>
						<Button
							variant='outlined'
							fullWidth
							sx={{
								marginTop: '15px',
								marginLeft: '10px',
								justifyContent: 'center'
							}}
							color='info'
							onClick={handleClose}>
							Cancel
						</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
};

export default AddChannel;
