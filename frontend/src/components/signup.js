import React from 'react';
import axios from 'axios';
import styles from './app.module.css';



export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    
    axios.post(`http://127.0.0.1:8081/api/auth/signup`, { username: this.state.username, password: this.state.password})
    .then(res => {
        console.log(res);
        console.log(res.data.data.accessToken);
        localStorage.setItem('accessToken', res.data.data.accessToken);
        localStorage.setItem('user_id', res.data.user_id);
        alert("Registered Succesfuly!")
        // Simulate an HTTP redirect:
        window.location.replace("/login");
    })
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  render() {
    return (
      <form className={styles.center} onSubmit={this.mySubmitHandler}>
        
        <br/>
      <h1 className={styles.header}>Periscope Wallet SignUp</h1>
      <p>Username:</p>
      <input
        type='text'
        name='username'
        onChange={this.myChangeHandler}
      />
      <p>Password:</p>
      <input
        type='password'
        name='password'
        onChange={this.myChangeHandler}
      />
      <p>Confirm Password:</p>
      <input
        type='password'
        name='c_password'
        onChange={this.myChangeHandler}
      />
      <br/>
      <br/>
      <input type='submit' className={styles.button} value='SignUp'/>
      </form>
    );
  }
}
