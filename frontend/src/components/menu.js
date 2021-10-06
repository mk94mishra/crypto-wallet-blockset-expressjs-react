import React from 'react';
import axios from 'axios';
import styles from './app.module.css';
import { Redirect } from 'react-router'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

export default class LoginMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <header className="App-header">
        <div>
          <Link to="/walletdetails">Wallet Details</Link><br></br>
          <Link to="/sendtoken">Transfer Token</Link><br></br>
          <Link to="/reciever">Reciever Accounts</Link><br></br><br></br>
          <Link to="/logout">Logout</Link><br></br>
          </div>
          <div>
            <Link to="/login">Login</Link><br></br>
            <Link to="/signup">SignUp</Link><br></br>
         </div>
    </header>
    );
  }
}




