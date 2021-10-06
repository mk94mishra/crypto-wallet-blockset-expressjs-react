import React from 'react';
import axios from 'axios';
import styles from './app.module.css';
import {
    Link
  } from 'react-router-dom';

var recieverAccount = new Array()
export default class TransferPst extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reciever_account: null,
      token: null,
      t_balance: null,
      tx_hash:null
    };
    
  }

  componentDidMount() {
    const sender_private_key = localStorage.getItem('accessToken');
    const sender_account = localStorage.getItem('ethAddress');

    axios.post(`http://127.0.0.1:8081/api/ethBalance`,{account:sender_account})
    .then(res => {
      //const persons = res.data;
      //this.setState({ balance : res.data.balance });
      console.log(res.data);
      this.setState({t_balance: res.data.data.balance});
    })

  }
  
  
  mySubmitHandler = (event) => {
    event.preventDefault();
    var sender_private_key = localStorage.getItem('ethPrivateKey');
    sender_private_key = sender_private_key.split("x")
    sender_private_key = sender_private_key[1]
    console.log(sender_private_key)
    
    const sender_account = localStorage.getItem('ethAddress');

    
    axios.post(`http://127.0.0.1:8081/api/transferPst`, { sender_account:sender_account, sender_private_key:sender_private_key,reciever_account: this.state.reciever_account, token: parseFloat(this.state.token)})
    .then(res => {
        console.log(res);
        console.log(res.data);
        //this.setState({t_balance: parseInt(res.data.data.balance)});

        this.setState({tx_hash: res.data.txhash});
        alert(res.data.txhash);
    })
    .catch((error) => {
      alert(error)
    })
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  render() {  
    const tx_hash_link = "https://ropsten.etherscan.io/tx/"+this.state.tx_hash
    console.log(tx_hash_link)
    return (
      <form className={styles.center} onSubmit={this.mySubmitHandler}>
        
      <h4 className={styles.bal}>Balance: {this.state.t_balance} PST</h4>
      <h1 className={styles.header}>Send token</h1>
      <p>Reciever account:</p>
      <input
        type='text'
        name='reciever_account'
        onChange={this.myChangeHandler}
      />
      <br/>
      <p>Token:</p>
      <input
        type='text'
        name='token'
        onChange={this.myChangeHandler}
      />
      <br/>
      <br/>
      <input type='submit' className={styles.button} value='Send'/><br/><br/>

      {tx_hash_link?<Link to={tx_hash_link}>Transaction Hash: {this.state.tx_hash}</Link>:''}
      </form>
    );
  }
}
