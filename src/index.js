import React from 'react';
import ReactDOM from 'react-dom/client';
import router from './router/router';
import { RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./SCSS/index.scss"
import store from './store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </>
);


