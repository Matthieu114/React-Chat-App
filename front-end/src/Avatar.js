/** @jsxImportSource @emotion/react */
import Avatar from '@mui/material/Avatar';
import { useContext, useState } from 'react';
import axios from 'axios';

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
import { borderColor } from '@mui/system';

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

export default function AvatarProfil({ clickable, userName, inUser }) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');
	const { user, setCookie, cookies, removeCookie } = useContext(Context);
	const handleClose = () => setOpen(false);
	const handleOpen = () => setOpen(true);

	const DefaultAvatar = () => {
		//Use the Avatar database after the first modification
		if (user?.img !== '') {
			const str = user?.username?.charAt(0);
			return <Avatar src={user?.img}>{str?.toUpperCase()}</Avatar>;
		} else {
			const str = user?.username?.charAt(0);
			return <Avatar src={user?.img}>{str?.toUpperCase()}</Avatar>;
		}
	};

	const DefaultAvatarUsers = () => {
		if (userName !== '') {
			const str = userName?.username?.charAt(0);
			return <Avatar src={userName?.img}>{str?.toUpperCase()}</Avatar>;
		} else {
			const str = userName?.username?.charAt(0);
			return <Avatar src={userName?.img}>{str?.toUpperCase()}</Avatar>;
		}
	};

	const getBase64 = (file) => {
		return new Promise((resolve) => {
			let baseURL = '';
			// Make new FileReader
			let reader = new FileReader();
			// Convert the file to base64 text
			reader.readAsDataURL(file);
			// on reader load somthing...
			reader.onload = () => {
				// Make a fileInfo Object
				baseURL = reader.result;
				resolve(baseURL);
			};
		});
	};

	const handleFileInputChange = async (e) => {
		getBase64(e.target.files[0])
			.then(async (result) => {
				user.img = result;
				await axios.put(`http://localhost:3001/users/${user.id}`, user);
				removeCookie('user');
				setCookie('user', user);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleChange = (e) => {
		setValue(e.target.value);
	};
	const onClick = async () => {
		const newName = value;
		if (newName.length > 0) {
			user.username = newName;
			await axios.put(`http://localhost:3001/users/${user.id}`, user);
			removeCookie('user');
			setCookie('user', user);
		}
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
			) : inUser ? (
				<DefaultAvatarUsers />
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
						<input type='file' id='imgAvatar' onChange={handleFileInputChange} />
					</Box>
					<Box sx={styles.box2}>
						<Typography
							color='black'
							id='modal-modal-title'
							variant='h8'
							component='h8'>
							Username:
						</Typography>
						<TextField
							id='UserName'
							variant='standard'
							sx={{ marginLeft: '20px' }}
							onChange={handleChange}
							value={value}
						/>
					</Box>
					<Button variant='outlined' onClick={onClick} sx={{ marginTop: '20px' }}>
						Save
					</Button>
				</Box>
			</Modal>
		</div>
	);
}
