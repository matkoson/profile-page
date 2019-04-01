import React, { Component } from "react";
import "./App.scss";
import Introduction from "./Components/Introduction/Introduction";
import SideMenu from "./Components/SideMenu/SideMenu";
import Certification from "./Components/Certification/Certification";
import MainProject from "./Components/MainProject/MainProject";

let navigateTo;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorMenu: false,
      activeMenuItem: "introduction",
      showMobileMenu: false,
      openMobileMenu: false,
      showDesktopMenu: false,
      lettersCounter: 0,
      opacityDimmer: null,
      blinkBurger: false
    };
  }

  render() {
    switch (this.state.activeMenuItem) {
      case "certification":
        navigateTo = <Certification />;
        break;
      case "main-project":
        navigateTo = <MainProject />;
        break;
      default:
        navigateTo = (
          <Introduction
            opacityDimmer={this.state.opacityDimmer}
            typingDoneCB={() => {
              if (window.innerWidth < 820) {
                this.setState({
                  showDesktopMenu: !this.state.showMenu,
                  opacityDimmer: { opacity: 0.4 },
                  blinkBurger: true
                });
              } else {
                this.setState({
                  showDesktopMenu: !this.state.showMenu
                });
              }
            }}
            setShowMobileMenu={(char, pos) => {
              return this.setState(state => {
                if (this.state.lettersCounter > 10) return;
                return {
                  lettersCounter: state.lettersCounter + 1,
                  showMobileMenu: state.lettersCounter === 10 ? true : false
                };
              });
            }}
          />
        );
    }
    return (
      <div className="app">
        <SideMenu
          blinkBurger={this.state.blinkBurger}
          className="side-menu"
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
