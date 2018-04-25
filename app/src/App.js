import React, {Component} from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import "./App.css";
import Menu from "./Menu";
import Restaurant from "./Restaurant";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Blocksplit</h1>
        </header>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/restaurant">Restaurant</Link>
              </li>
              <li>
                <Link to="/menu">Menu</Link>
              </li>
            </ul>
            <Route path="/restaurant" component={Restaurant}/>
            <Route path="/menu" component={Menu}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
