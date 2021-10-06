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
      blockset_tx:null
    };
    
  }

  componentDidMount() {

    // build the Blockset API URL
    const baseUrl = 'https://api.blockset.com'
    const transactionsPath = 'transactions'
    const transaction = 'ethereum-ropsten:0x9e65cfbf5682ef8c958f20da34f4564038ebd25584a5567ae10f6a49db4683a0'
    const url = `${baseUrl}/${transactionsPath}/${transaction}`

    const BLOCKSET_API_USER_JWT = localStorage.getItem('accessToken')
    // set the JWT bearer token, and specify JSON data type
    const options = {
      json: true,
      headers: {
        authorization: `Bearer ${BLOCKSET_API_USER_JWT}`
      }
    }
    
    axios.get(url, options)
    .then(res => {
        console.log(res);
        console.log(res.data);
        //this.setState({blockset_tx:res.data})
    })
    .catch((error) => {
      alert(error)
    })

  }
  
  render() {    
    return (
      <form className={styles.center} >
        
      <p>{this.state.blockset_tx}</p>
      </form>
    );
  }
}
