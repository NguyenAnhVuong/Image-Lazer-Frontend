import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { AppState, history } from './app/store';
import Album from './components/Album/Album';
import Auth from './components/Auth/Auth';
import ChatMobile from './components/Chat/ChatMobile/ChatMobile';
import ListUserChatItemMobile from './components/Chat/ChatMobile/ListUserChatItemMobile';
import Home from './components/Home';
import CreateImagePage from './components/Image/CreateImagePage';
import EditImagePage from './components/Image/EditImagePage';
import ImageDetail from './components/Image/ImageDetail';
import Header from './components/Layout/Header';
import SearchMobile from './components/Search/SearchMobile';
import User from './components/User/User';
import UserInformation from './components/User/UserInformation';
import { authActions } from './features/auth/authSlice';
import { userActions } from './features/user/userSlice';
import ScrollToTop from './ScrollToTop';

const App = () => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state: AppState) => state.auth.userName);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userNameLocal = localStorage.getItem('userName');
    if (accessToken !== 'undefined' && userNameLocal) {
      dispatch(authActions.loginSuccess(userNameLocal));
      dispatch(userActions.getUserStart(userNameLocal));
    }
  }, [dispatch, userName]);

  return (
    <Router history={history}>
      {userName && <Header />}
      <ScrollToTop>
        <Routes>
          {userName ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchMobile />} />
              <Route path="/create-image" element={<CreateImagePage />} />
              <Route path="/settings/:option" element={<UserInformation />} />
              <Route path="/image/edit/:id" element={<EditImagePage />} />
            </>
          ) : (
            <Route path="*" element={<Auth />} />
          )}
          <Route path="/user/:userName" element={<User />} />
          <Route path="/image/:id" element={<ImageDetail />} />
          <Route path="/album/:id" element={<Album />} />
          <Route path="/notifications" element={<ChatMobile />} />
          <Route
            path="/notifications/:userName"
            element={<ListUserChatItemMobile />}
          />
        </Routes>
      </ScrollToTop>
    </Router>
  );
};

export default App;
