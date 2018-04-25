import React, {Component} from "react";
import * as Web3 from "web3";
import "./App.css";

class Restaurant extends Component {
  constructor() {
    super();
    this.web3 = new Web3(web3.currentProvider);// eslint-disable-line no-undef
    this.web3.eth.getCoinbase().then(res => {
      this.web3.eth.defaultAccount = res;
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <h1>
            Restaurant
          </h1>
          <div className="form-group">
            <label htmlFor="deposit">Deposit amount</label>
            <input onChange={this.updateInputValue.bind(this)} type="number" className="form-control" id="deposit"
                   placeholder="Ether"/>
          </div>
          <button onClick={() => {
            this.doDeposit();
          }} className="btn btn-default">Deposit
          </button>
        </div>
      </div>
    );
  }

  updateInputValue(evt) {
    this.setState({
      depositAmount: evt.target.value,
    });
  }

  doDeposit() {
    if (this.state && this.state.depositAmount) {
      const depositAmount = this.state.depositAmount;

    }
  }
}

export default Restaurant;
