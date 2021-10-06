import React from 'react';
import axios from 'axios';
import styles from './app.module.css';
import {
    Link
  } from 'react-router-dom';

var recieverAccount = new Array()
export default class MyForm extends React.Component {
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
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('accessToken');
    axios.get(`http://127.0.0.1:8081/api/wallet/balance`,{headers: {'Authorization': `Bearer ${token}`}})
    .then(res => {
      //const persons = res.data;
      //this.setState({ balance : res.data.balance });
      console.log(res.data);
      this.setState({t_balance: res.data.data.balance});
    })

    // get reciever account
    axios.get(`http://127.0.0.1:8081/api/reciever`,{headers: {'Authorization': `Bearer ${token}`}})
    .then(res => {
      console.log(res.data.data)
      recieverAccount = res.data.data
    })
  }
  
  
  mySubmitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');
    
    
    axios.post(`http://127.0.0.1:8081/api/transaction`, { reciever_account: this.state.reciever_account, token: parseFloat(this.state.token)},{headers: {'Authorization': `Bearer ${token}`}})
    .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({t_balance: parseInt(res.data.data.balance)});

        this.setState({tx_hash: res.data.data.tx_hash});
        alert(res.data.data.tx_hash);
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
    const recieverAccountList = recieverAccount.map((data) => <option value={data.account}>{data.account}</option>);
    const tx_hash_link = "https://ropsten.etherscan.io/tx/"+this.state.tx_hash
    console.log(tx_hash_link)
    return (
      <form className={styles.center} onSubmit={this.mySubmitHandler}>
        
      <h4 className={styles.bal}>Balance: {this.state.t_balance} PST</h4>
      <h1 className={styles.header}>Send token</h1>
      <p>Reciever account:</p>
      <select name='reciever_account' value={this.state.value} onChange={this.myChangeHandler}>   
        <option>select</option>         
        {recieverAccountList}
      </select>
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
