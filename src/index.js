import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from 'redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import shopReducer from './reducers/index';
import { Provider } from 'react-redux';
import HomePage from './components/index';
import AddStorePage from './components/addStorePage';
import StoreListPage from './components/storeListPage';

import './index.css';

const store = createStore(
  shopReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/add_store' element={<AddStorePage />} />
          <Route exact path='/store_list' element={<StoreListPage />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
