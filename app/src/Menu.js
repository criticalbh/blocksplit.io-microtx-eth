import * as sigUtil from "eth-sig-util";
import React, {Component} from "react";
import * as Web3 from "web3";
import * as Account from "eth-lib/lib/account";

class Menu extends Component {
  constructor() {
    super();
    this.web3 = new Web3(web3.currentProvider);// eslint-disable-line no-undef
    this.web3.eth.getCoinbase().then(res => {
      this.web3.eth.defaultAccount = res;
    });

    this.socket = io("http://localhost:8080"); // eslint-disable-line no-undef
    this.socket.on("helloworld", function (data) {
      console.log(data);
    });
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(val) {
    this.socket.emit("buyitem", {coke: val});
    this.signMessage(val);
  }

  signMessage(amount) {
    const myAddress = this.web3.eth.defaultAccount;

    const msgParams = [
      {
        type: "string",      // Any valid solidity type
        name: "NewBalance",     // Any string label you want
        value: amount.toString()  // The value to sign
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
      const vrs = Account.decodeSignature(signature);
      console.log('signature', signature);
      console.log(vrs);
      const hash = sigUtil.typedSignatureHash(msgParams);
      console.log('hash', hash);

      const recovered = sigUtil.recoverTypedSignature({
        data: msgParams,
        sig: signature,
      }).toLowerCase();

      if (recovered === myAddress.toLowerCase()) {
        alert("Recovered signer: " + myAddress);
      } else {
        alert("Failed to verify signer, got: " + result);
      }
    });
  }

  render() {
    return (
      <div className="container">
        <h1>
          Menu
        </h1>
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
