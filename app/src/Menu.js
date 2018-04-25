import React, {Component} from "react";

class Menu extends Component {
  constructor() {
    super();
    this.socket = io("http://localhost:8080"); // eslint-disable-line no-undef
    this.socket.on("helloworld", function (data) {
      console.log(data);
    });
  }

  sendMessage() {
    console.log("aaa");
    this.socket.emit("buyitem", {my: "data"});
  }

  render() {
    return (
      <div>
        <h1>
          Menu
        </h1>
        <button onClick={this.sendMessage.bind(this)}>Click</button>
      </div>
    );
  }
}

export default Menu;
