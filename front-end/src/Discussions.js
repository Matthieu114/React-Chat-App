/** @jsxImportSource @emotion/react */
import SearchBar from './SearchBar';
import AddChannel from './channel/AddChannel.js';

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
  }
};

const Discussions = () => {
  return (
    <div css={styles.root}>
      <h1 css={styles.text}>
        Discussions <AddChannel />
      </h1>

      <SearchBar />
    </div>
  );
};

export default Discussions;
