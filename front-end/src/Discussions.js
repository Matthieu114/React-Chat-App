/** @jsxImportSource @emotion/react */
import SearchBar from './SearchBar';

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
		color: 'black'
	}
};

const Discussions = () => {
	return (
		<div css={styles.root}>
			<h1 css={styles.text}>Discussions</h1>
			<SearchBar />
		</div>
	);
};

export default Discussions;
