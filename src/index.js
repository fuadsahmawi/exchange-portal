import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Balance from './Balance/Balance';
import UserInfo from './UserInfo/UserInfo';
import Trade from './Trade/Trade';
import Transactions from './Transactions/Transactions';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Route exact path="/" component={App} />
    <Route exact path="/balance" component={Balance} />
    <Route exact path="/user" component={UserInfo} />
    <Route exact path="/trade" component={Trade} />
    <Route exact path="/transactions" component={Transactions} />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
