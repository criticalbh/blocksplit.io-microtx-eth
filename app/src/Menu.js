import * as Account from "eth-lib/lib/account";
import * as sigUtil from "eth-sig-util";
import React, {Component} from "react";
import * as Web3 from "web3";
import {config} from "./config";

const restaurantAddress = "0x3C829B580210C44ce3816635160693CaFA62D31e";

class Menu extends Component {
  constructor() {
    super();
    this.web3 = new Web3(web3.currentProvider);// eslint-disable-line no-undef

    this.web3.eth.getCoinbase().then(res => {
      this.web3.eth.defaultAccount = res;
    });

    this.contract = new this.web3.eth.Contract(config.contractAbi, config.contractAddress);

    this.socket = io("http://localhost:8080"); // eslint-disable-line no-undef

    this.socket.on("buyitemSuccess", (data) => {

      // get address from restaurant signature
      const recovered = sigUtil.recoverTypedSignature({
        data: data.data,
        sig: data.signature,
      }).toLowerCase();

      if (recovered.toLowerCase() !== restaurantAddress.toLowerCase()) {
        console.log("It is not signed by restaurant!");
        throw Error();
      }

      // hash the same data
      const hash = sigUtil.typedSignatureHash(data.data);
      console.log(data.data);
      console.log(hash);

      if (hash.toLowerCase() !== data.hash.toLowerCase()) {
        console.log("Correct data is not signed!");
        throw Error();
      }

      //last blockchain check if sig is correct
      const vrs = Account.decodeSignature(data.signature);
      let value = data.data[0].value;

      console.log(value);
      console.log(value, vrs[0], vrs[1], vrs[2]);

      this.contract.methods.checkSignature(value, vrs[0], vrs[1], vrs[2]).call({
        from: this.web3.eth.defaultAccount,
      }).then(response => {
        if (response !== restaurantAddress) {
          console.log("Restaurant is cheating");
          throw Error();
        }
      });
      this.signMessage(value);
    });

    this.sendMessage = this.sendMessage.bind(this);
    this.withdraw = this.withdraw.bind(this);
  }

  sendMessage(val) {
    const value = this.web3.utils.toWei(val.toString());
    this.socket.emit("buyitem", {item: value});
  }

  signMessage(amount) {
    const myAddress = this.web3.eth.defaultAccount;

    const msgParams = [
      {
        type: "uint256",      // Any valid solidity type
        name: "NewBalance",     // Any string label you want
        value: amount  // The value to sign
      },
    ];

    let JSONRPC = {
      method: "eth_signTypedData",
      params: [msgParams, myAddress],
      from: myAddress,
    };

    this.web3.currentProvider.send(JSONRPC, (err, result) => {
      if (err) return console.error(err);
      if (result.error) {
        return console.error(result.error.message);
      }

      let signature = result.result;

      this.lastSig = {
        data: msgParams,
        sig: signature,
      };
      console.log(this.lastSig);
    });
  }

  withdraw() {
    const {data, sig} = this.lastSig;

    const vrs = Account.decodeSignature(sig);
    const hash = sigUtil.typedSignatureHash(data);

    let value = data[0].value;
    console.log(hash, vrs[0], vrs[1], vrs[2], value);

    this.contract.methods.WithdrawCustomer(hash, vrs[0], vrs[1], vrs[2], value).send({
      from: this.web3.eth.defaultAccount,
    }).then(response => {
      console.log(response);
      setTimeout(() => {
        this.socket.emit("withdraw", {data: "empty"});
      }, 10000);
    });

  }

  render() {
    return (
      <div className="container">
        <h1>
          Menu
        </h1>
        <button onClick={() => {
          this.withdraw();
        }}>Withdraw rest of ETH
        </button>
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <ul className="media-list">
              <li className="media">
                <div className="media-left">
                  <a>
                    <img style={{width: "64px"}} className="media-object"
                         src="http://icons.iconarchive.com/icons/michael/coke-pepsi/256/Coca-Cola-Can-icon.png"
                         alt="..."/>
                  </a>
                </div>
                <div className="media-body">
                  <h4 className="media-heading">Coca cola - 0.01 ETH</h4>
                  <button onClick={() => this.sendMessage(0.01)} className="btn btn-default">Buy</button>
                </div>
              </li>
              <li className="media">
                <div className="media-left">
                  <a>
                    <img style={{width: "64px"}} className="media-object"
                         src="http://icons.iconarchive.com/icons/michael/coke-pepsi/256/Coca-Cola-Can-icon.png"
                         alt="..."/>
                  </a>
                </div>
                <div className="media-body">
                  <h4 className="media-heading">Coca cola - 0.02 ETH</h4>
                  <button onClick={() => this.sendMessage(0.02)} className="btn btn-default">Buy</button>
                </div>
              </li>
              <li className="media">
                <div className="media-left">
                  <a>
                    <img style={{width: "64px"}} className="media-object"
                         src="http://icons.iconarchive.com/icons/michael/coke-pepsi/256/Coca-Cola-Can-icon.png"
                         alt="..."/>
                  </a>
                </div>
                <div className="media-body">
                  <h4 className="media-heading">Coca cola - 3 ETH</h4>
                  <button onClick={() => this.sendMessage(0.03)} className="btn btn-default">Buy</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
