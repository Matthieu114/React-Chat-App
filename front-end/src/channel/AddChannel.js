import {
  Button,
  Box,
  Typography,
  Modal,
  TextField,
  IconButton
} from '@mui/material';
import axios from 'axios';
//Context
import Context from '../Context';
import { useContext, useState } from 'react';
import AddRounded from '@mui/icons-material/AddRounded';

const styles = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  },
  position: {}
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
    <div css={styles.position}>
      <IconButton
        color='info'
        variant='outlined'
        marginTop='300px'
        onClick={handleOpen}
      >
        <AddRounded />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styles.modal}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Create a new Channel
          </Typography>
          <TextField
            color='primary'
            id='newChannel'
            label='Name of Channel'
            variant='standard'
            name='newChannel'
            onKeyPress={onKeyPress}
          />
          <Button onClick={onSubmit}>Push</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddChannel;
