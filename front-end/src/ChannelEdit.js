/** @jsxImportSource @emotion/react */
import { useTheme } from '@mui/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

const useStyles = (theme) => ({
  root: {
    width: 'max-content'
  }
});

const ChannelEdit = ({
  anchorEl,
  open,
  handleClose,
  channel,
  deleteChannel,
  canClick
}) => {
  const styles = useStyles(useTheme());
  return (
    <div css={styles}>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            canClick = false;
          }}
        >
          Modify
        </MenuItem>
        <MenuItem
          style={{ float: 'right' }}
          color='info'
          onClick={(e) => {
            handleClose();
            e.preventDefault();
            deleteChannel(channel);
          }}
        >
          Delete Channel <RemoveOutlinedIcon />
        </MenuItem>
      </Menu>
    </div>
  );
};


export default ChannelEdit;
