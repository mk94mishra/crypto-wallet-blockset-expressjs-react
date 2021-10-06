import React from 'react';
import axios from 'axios';
import styles from './app.module.css';

export default class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account:'',
      private_key:'',
      mnemonic:''
    };
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');

    axios.post(`http://127.0.0.1:8081/api/wallet`, { account: this.state.account, private_key: this.state.private_key, mnemonic: this.state.mnemonic},{headers: {'Authorization': `Bearer ${token}`}})
    .then(res => {
        console.log(res);
        console.log(res.data);
        if(res.data.status == 'success'){
          window.location.replace("/walletdetails");
        }
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
    return (
      
      <form className={styles.center}  onSubmit={this.mySubmitHandler}>
        
          <br/>
        <h1 className={styles.header} >Wallet</h1>
        <p>Your account id:</p>
        <input
          type='text'
          name='account'
          onChange={this.myChangeHandler}
        />
        <p>Your account private key</p>
        <input
          type='text'
          name='private_key'
          onChange={this.myChangeHandler}
        />
        <p>Your Mnemonic</p>
        <input
          type='text'
          name='mnemonic'
          onChange={this.myChangeHandler}
        />
        <br/>
        <br/>
        <input type='submit' className={styles.button} value='Save'/>
        </form>
    );
  }
}
