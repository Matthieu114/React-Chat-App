/** @jsxImportSource @emotion/react */
import { useTheme } from '@mui/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const useStyles = (theme) => ({
	root: {
		width: '20px'
	}
});

const MessageChanger = ({ anchorEl, open, handleClose }) => {
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
				}}>
				<MenuItem onClick={handleClose}>Modify</MenuItem>
				<MenuItem
					onClick={function (event) {
						handleClose();
					}}>
					Delete
				</MenuItem>
			</Menu>
		</div>
	);
};

export default MessageChanger;
