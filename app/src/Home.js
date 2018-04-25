import React, {Component} from "react";

class Home extends Component {
  constructor() {
    super();
    this.web3 = web3;// eslint-disable-line no-undef
    this.web3Enabled = this.web3 !== undefined;
  }

  pleaseLoginMessage() {
    return <h1>
      Please login into metamask
    </h1>;
  }

  render() {
    const MetamaskMessage = (props) => {
      if (this.web3Enabled) {
        return <h1>
          Proceed to Restaurant to leave deposit
        </h1>;
      }
      return <h1>
        Please login into metamask
      </h1>;
    };
    return (
      <div className="container">
        <MetamaskMessage/>
      </div>
    );
  }
}

export default Home;
