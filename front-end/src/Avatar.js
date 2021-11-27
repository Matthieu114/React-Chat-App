/** @jsxImportSource @emotion/react */
import Avatar from '@mui/material/Avatar';
import { useContext, useState } from 'react';
//Layout
import {
	Modal,
	Typography,
	TextField,
	Box,
	Button,
	IconButton
} from '@mui/material';
//Local
import Context from './Context';

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
		display: 'flex',
		alignItems: 'center',
		color: 'white'
	},
	boxAvatar: {
		display: 'flex',
		alignItems: 'center',
		color: 'white',
		marginLeft: '150px'
	}
};
export default function AvatarProfil({ clickable }) {
	const [open, setOpen] = useState(false);
	const { ifAvatar, oauth, setIfAvatar, user } = useContext(Context);
	const handleClose = () => setOpen(false);
	const handleOpen = () => setOpen(true);

	const DefaultAvatar = () => {
		//Set default Avatar to the first letter of the email
		if (ifAvatar === false) {
			const str = oauth.email.charAt(0);
			return <Avatar sx={{ bgcolor: 'grey' }}>{str.toUpperCase()}</Avatar>;
		}
		//Use the Avatar database after the first modification
		else {
			return;
		}
	};

	const setImg = () => {
		const img = document.getElementById('imgAvatar');

		//setIfAvatar(true);
	};

	return (
		<div>
			{clickable ? (
				<IconButton
					onClick={() => {
						handleOpen();
					}}>
					<DefaultAvatar />
				</IconButton>
			) : (
				<DefaultAvatar />
			)}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={styles.box}>
					<Typography
						color='black'
						id='modal-modal-title'
						variant='h6'
						component='h6'>
						Welcome on your profil !
					</Typography>
					<Box sx={styles.boxAvatar}>
						<DefaultAvatar />
						<input type='file' id='imgAvatar' />
					</Box>
					<Box sx={styles.box2}>
						<TextField id='UserName' variant='standard' label='set Username' />
					</Box>
					<Box sx={styles.box2}>
						<Typography
							color='black'
							id='modal-modal-title'
							variant='h6'
							component='h6'>
							Username:
						</Typography>
						<TextField
							id='UserName'
							variant='standard'
							sx={{ marginLeft: '20px' }}
						/>
					</Box>
					<Button variant='outlined'>Save</Button>
				</Box>
			</Modal>
		</div>
	);
}
