import * as React from 'react';
import {useState, useContext, useEffect} from 'react';
import {styled, useTheme} from '@mui/material/styles';
//mui components
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import StarBorder from '@mui/icons-material/StarBorder';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import AddCircleIcon from '@mui/icons-material/AddCircle';
//local
import Context from './Context';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {ListItemAvatar} from '@mui/material';
import ModifyChannelModal from './channel/ModifyChannelModal';
import AvatarProfil from './Avatar';
import AddUserModal from './AddUserModal';

const drawerWidth = 350;

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start'
}));

export default function PersistentDrawerRight({channel}) {
  const navigate = useNavigate();
  const {oauth, user} = useContext(Context);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [channelUsers, setChannelUsers] = React.useState([]);

  const [userOpen, setUserOpen] = React.useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const {data: channels} = await axios.get(
          `http://localhost:3001/channels/${channel.id}`,
          {
            headers: {
              Authorization: `Bearer ${oauth?.access_token}`
            }
          }
        );
        setChannelUsers(channels);
      } catch (err) {
        navigate('/oups');
      }
    };

    fetch();
  }, [channel, oauth, navigate]);

  const handleClick = () => {
    setUserOpen(!userOpen);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const modifyChildhandle = (value) => {
    setOpen(value);
  };

  return (
    <div>
      <IconButton
        sx={{float: 'right'}}
        color='info'
        aria-label='open drawer'
        onClick={handleDrawerOpen}>
        <MoreHorizIcon />
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth
          }
        }}
        variant='persistent'
        anchor='right'
        open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ModifyChannelModal channel={channel} />
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              {userOpen ? (
                <ExpandLess color='info' />
              ) : (
                <ExpandMoreIcon color='info' />
              )}
            </ListItemIcon>
            <ListItemText primary='Discussion Members' />
          </ListItemButton>

          <Collapse in={userOpen} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <div>
                <ListItem>
                  <ListItemAvatar>
                    <AvatarProfil></AvatarProfil>
                  </ListItemAvatar>
                  <ListItemText primary={user.username} />
                </ListItem>
              </div>

              {channelUsers.usersId?.map((user) => {
                return (
                  <div>
                    <ListItem>
                      <ListItemAvatar>
                        <AvatarProfil userName={user} inUser={true}></AvatarProfil>
                      </ListItemAvatar>
                      <ListItemText primary={user.username} />
                    </ListItem>
                  </div>
                );
              })}

              <AddUserModal />
            </List>
          </Collapse>
        </List>

        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon color='info' />
            </ListItemIcon>
            <ListItemText primary='Shared Files' />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
