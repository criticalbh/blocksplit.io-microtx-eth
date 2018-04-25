import React, { Component } from 'react';
import './App.css';

class Restaurant extends Component {
  constructor() {
    super();
    this.web3 = web3;// eslint-disable-line no-undef
    if(!this.web3) {
      alert('Please login into metamask!');
    }
    console.log(this.web3);
  }
  render() {
    return (
      <h1>
        Restaurant
      </h1>
    );
  }
}

export default Restaurant;
