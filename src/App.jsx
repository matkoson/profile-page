import React, { Component } from "react";
import "./App.scss";
import Introduction from "./Components/Introduction/Introduction";
import SideMenu from "./Components/SideMenu/SideMenu";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }
  render() {
    return (
      <div className="app">
        <Introduction
          toggleShowMenu={() =>
            this.setState({ showMenu: !this.state.showMenu })
          }
        />
        {this.state.showMenu && <SideMenu />}
      </div>
    );
  }
}

export default App;
