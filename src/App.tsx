import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { AppState, history } from './app/store';
import Auth from './components/Auth/Auth';
import Home from './components/Home';
import Header from './components/Layout/Header';
import CreateImagePage from './components/User/CreateImagePage';
import User from './components/User/User';
import UserInformation from './components/User/UserInformation';
import { albumsActions } from './features/album/albumSlice';
import { authActions } from './features/auth/authSlice';
import Messages from './components/Messages';

const App = () => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state: AppState) => state.auth.userName);
  const getAlbumsSuccess = useAppSelector((state: AppState) => state.albums.success);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userNameLocal = localStorage.getItem('userName');
    if (accessToken && userNameLocal) {
      dispatch(authActions.loginSuccess(userNameLocal));
      if (!getAlbumsSuccess) {
        dispatch(albumsActions.getAlbumsStart());
      }
    }
  }, [dispatch, getAlbumsSuccess, userName]);

  return (
    <Router history={history}>
      {userName && <Header />}
      <Routes>
        {userName
          ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/create-image" element={<CreateImagePage />} />
              <Route path="/user-information" element={<UserInformation />} />
            </>
          )
          : <Route path="*" element={<Auth />} />}
        <Route path="/user/:userName" element={<User />} />
      </Routes>
    </Router>
  );
};

export default App;
