import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import App from './App';
import { history, store } from './app/store';
import Header from './components/Layout/Header';
import 'antd/dist/antd.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
);
