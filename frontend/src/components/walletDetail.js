import React from 'react';
import axios from 'axios';
import styles from './app.module.css';

export default class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ethAccount:'',
      walletAccount: '',
      walletBalance: null,
      walletEthBalance:null
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('accessToken');
    const ethAddress = localStorage.getItem('ethAddress');
    console.log("manish")
    console.log(localStorage.getItem('ethPrivateKey'));
    // get reciever account
    axios.post(`http://127.0.0.1:8081/api/ethBalance`, { account: ethAddress})
    .then(res => {
      console.log(res)

      // if(!res.data.data.account){
      //   window.location.replace("/wallet");
      // }
      
      this.setState({
        walletAccount: ethAddress,
        walletBalance: res.data.data.balance,
        walletEthBalance: res.data.data.eth_balance
      });
    })
  }

  render() {
    return (
        <div className={styles.center}>
          
          <h1 className={styles.header} >Wallet</h1>
        <p><b>Account:</b> {this.state.walletAccount}</p>
        <p><b>Balance:</b> {this.state.walletBalance} PST</p>
        <p><b>ETH Balance:</b> {this.state.walletEthBalance} ETH</p>
        </div>
    );
  }
}
