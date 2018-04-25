import React, {Component} from "react";

class Menu extends Component {
  constructor() {
    super();
    this.socket = io("http://localhost:8080"); // eslint-disable-line no-undef
    this.socket.on("helloworld", function (data) {
      console.log(data);
    });
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(val) {
    console.log(val);
    this.socket.emit("buyitem", {my: "data"});
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
                  <a href="#">
                    <img style={{width: "64px"}} className="media-object"
                         src="http://icons.iconarchive.com/icons/michael/coke-pepsi/256/Coca-Cola-Can-icon.png"
                         alt="..."/>
                  </a>
                </div>
                <div className="media-body">
                  <h4 className="media-heading">Coca cola - 1 ETH</h4>
                  <button onClick={() => this.sendMessage(1)} className="btn btn-default">Buy</button>
                </div>
              </li>
              <li className="media">
                <div className="media-left">
                  <a href="#">
                    <img style={{width: "64px"}} className="media-object"
                         src="http://icons.iconarchive.com/icons/michael/coke-pepsi/256/Coca-Cola-Can-icon.png"
                         alt="..."/>
                  </a>
                </div>
                <div className="media-body">
                  <h4 className="media-heading">Coca cola - 2 ETH</h4>
                  <button onClick={() => this.sendMessage(2)} className="btn btn-default">Buy</button>
                </div>
              </li>
              <li className="media">
                <div className="media-left">
                  <a href="#">
                    <img style={{width: "64px"}} className="media-object"
                         src="http://icons.iconarchive.com/icons/michael/coke-pepsi/256/Coca-Cola-Can-icon.png"
                         alt="..."/>
                  </a>
                </div>
                <div className="media-body">
                  <h4 className="media-heading">Coca cola - 3 ETH</h4>
                  <button onClick={() => this.sendMessage(3)} className="btn btn-default">Buy</button>
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
