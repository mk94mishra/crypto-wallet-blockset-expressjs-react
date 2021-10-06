import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import styles from './app.module.css';
import {generateMnemonic} from 'bip39';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mnemonic: ''
    };
  }

  componentDidMount() {
    this.setState({mnemonic:generateMnemonic()});
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    
    axios.post(`http://127.0.0.1:8081/api/login`, { mnemonic: this.state.mnemonic})
    .then(res => {
        
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('bitcoin', res.data.bitcoin);
        // Simulate an HTTP redirect:
        //window.location.replace("/sendtoken");
    })

    axios.post(`http://127.0.0.1:8081/api/createEthWallet`, { mnemonic: this.state.mnemonic})
    .then(res => {
      console.log("manish")
        console.log(res.data.data);
        localStorage.setItem('ethAddress', res.data.data.address);
        localStorage.setItem('ethPrivateKey', res.data.data.privateKey);
        // Simulate an HTTP redirect:
        //window.location.replace("/sendtoken");
    })
  }
  
  render() {
    return (
      <form className={styles.center} onSubmit={this.mySubmitHandler}>
        
        <br/>
      <h1 className={styles.header}>Periscope Wallet</h1>
      <p>Your Phrase: <b>{this.state.mnemonic}</b></p>
    
      <br/>
      <p>keep this phrase</p>
      <br/>
      <input type='submit' className={styles.button} value='Next'/>
      </form>
    );
  }
}
