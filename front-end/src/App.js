/** @jsxImportSource @emotion/react */
import {useContext} from 'react';
// Local
import Oups from './Oups';
import Main from './Main';
import Login from './Login';
import Context from './Context';
// Rooter
import {Route, Routes, Navigate, useLocation} from 'react-router-dom';
import SignUp from './SignUp';

const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
  }
};
export default function App() {
  const location = useLocation();
  const {oauth, user} = useContext(Context);

  const gochannels = (
    <Navigate
      to={{
        pathname: '/channels',
        state: {from: location}
      }}
    />
  );
  const gohome = (
    <Navigate
      to={{
        pathname: '/',
        state: {from: location}
      }}
    />
  );
  return (
    <div className='App' css={styles.root}>
      <Routes>
        <Route
          exact
          path='/'
          element={
            oauth || Object.entries(user).length !== 0 ? gochannels : <Login />
          }
        />
        <Route exact path='/signup' element={<SignUp />} />
        <Route
          path='/channels/*'
          element={oauth || Object.entries(user).length !== 0 ? <Main /> : gohome}
        />
        <Route path='/Oups' element={<Oups />} />
      </Routes>
    </div>
  );
}
