/** @jsxImportSource @emotion/react */
//Local
import SearchBar from './SearchBar';
import AddChannel from './channel/AddChannel.js';
import AvatarProfil from './Avatar';

const styles = {
	root: {
		marginTop: '0px',
		position: 'sticky',
		top: '0',
		backgroundColor: 'White'
	},
	text: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: '-5px',
		color: 'black',
		clear: 'both'
	},
	avatar: {
		marginRight: '10px'
	}
};

const Discussions = () => {
	return (
		<div css={styles.root}>
			<h2 css={styles.text}>
				<AvatarProfil sx={styles.avatar} /> Discussions <AddChannel />
			</h2>

			<SearchBar />
		</div>
	);
};

export default Discussions;
