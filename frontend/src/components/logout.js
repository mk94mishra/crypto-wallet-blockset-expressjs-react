import React from 'react';
import axios from 'axios';
import styles from './app.module.css';
import { Redirect } from 'react-router'


export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {

    localStorage.setItem('token','');
    // Simulate an HTTP redirect:
    window.location.replace("/login");
    return (
      <div></div>
    );
  }
}
