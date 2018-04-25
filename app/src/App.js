import React, {Component} from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import "./App.css";
import Home from "./Home";
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
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <ul className="nav navbar-nav">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/restaurant">Restaurant</Link>
                  </li>
                  <li>
                    <Link to="/menu">Menu</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <Route exact path="/restaurant" component={Restaurant}/>
            <Route exact path="/menu" component={Menu}/>
            <Route exact path="/" component={Home}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
