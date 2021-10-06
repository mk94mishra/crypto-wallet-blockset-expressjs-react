import React from 'react';
import axios from 'axios';
import styles from './app.module.css';
export default class Reciever extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account:''
    };
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');

    axios.post(`http://127.0.0.1:8081/api/reciever`, { reciever_account: this.state.account},{headers: {'Authorization': `Bearer ${token}`}})
    .then(res => {
        console.log(res);
        console.log(res.data);
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
        <p>Reciever account id:</p>
        <input
          type='text'
          name='account'
          onChange={this.myChangeHandler}
        />
        <br/>
        <br/>
        <input type='submit' className={styles.button} value='Save'/>
        </form>
    );
  }
}
