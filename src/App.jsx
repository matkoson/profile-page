import React, { Component } from "react";
import "./App.scss";
import Introduction from "./Components/Introduction/Introduction";
import SideMenu from "./Components/SideMenu/SideMenu";
import Certification from "./Components/Certification/Certification";

let navigateTo;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorMenu: false,
      activeMenuItem: "introduction",
      showMobileMenu: false,
      openMobileMenu: false
    };
  }

  render() {
    switch (this.state.activeMenuItem) {
      case "certification":
        navigateTo = <Certification />;
        break;
      default:
        navigateTo = (
          <Introduction
            toggleShowMenu={() =>
              this.setState({
                showMenu: !this.state.showMenu
              })
            }
            setShowMobileMenu={(char, pos) => {
              if (pos === 10 && char === "e") {
                return this.setState({
                  showMobileMenu: !this.state.showMobileMenu
                });
              }
            }}
          />
        );
    }
    return (
      <div className="app">
        <SideMenu
          showMobileMenu={this.state.showMobileMenu}
          openMobileMenu={this.state.openMobileMenu}
          activeMenuItem={this.state.activeMenuItem}
          toggleAcriveMenuItem={e =>
            this.setState({
              activeMenuItem: e.currentTarget.id,
              openMobileMenu: false
            })
          }
          toggleOpenMobileMenu={() =>
            this.setState({ openMobileMenu: !this.state.openMobileMenu })
          }
        />
        <div
          className={
            !this.state.openMobileMenu
              ? "app__main-container"
              : "app__main-container--fading-out "
          }
        >
          {navigateTo}
        </div>
      </div>
    );
  }
}

export default App;
