import React, { useState } from "react";
import "./App.scss";
import Introduction from "./Components/Introduction/Introduction";
import SideMenu from "./Components/SideMenu/SideMenu";
import Certification from "./Components/Certification/Certification";
import MainProject from "./Components/MainProject/MainProject";
import OtherProjects from "./Components/OtherProjects/OtherProjects";
import Typist from "react-typist";

let navigateTo,
  tabTitle = "";

export default function App() {
  const [colorMenu, setColorMenu] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("introduction");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [showDesktopMenu, setShowDesktopMenu] = useState(false);
  const [lettersCounter, setLettersCounter] = useState(0);
  const [opacityDimmer, setOpacityDimmer] = useState(null);
  const [blinkBurger, setBlinkBurger] = useState(false);
  //
  //

  switch (activeMenuItem) {
    case "certification":
      navigateTo = <Certification />;
      tabTitle = "Certification";
      break;
    case "main-project":
      navigateTo = <MainProject />;
      tabTitle = "Main Project";
      break;
    case "other-projects":
      navigateTo = <OtherProjects />;
      tabTitle = "Other Projects";
      break;
    default:
      navigateTo = (
        <Introduction
          opacityDimmer={opacityDimmer}
          typingDoneCB={() => {
            if (window.innerWidth < 820) {
              setOpacityDimmer({ opacity: 0.4 });
              setBlinkBurger(true);
            }
          }}
          setShowMobileMenu={(char, pos) => {
            if (lettersCounter > 10) return;
            setLettersCounter(lettersCounter + 1);
            setShowMobileMenu(lettersCounter === 10 ? true : false);
          }}
        />
      );
  }
  return (
    <div className="app">
      <div
        className="app__title-wrapper"
        style={!openMobileMenu ? { opacity: 1 } : { opacity: 0 }}
      >
        <Typist
          key={tabTitle}
          className={"app__tab-title "}
          cursor={{ show: false }}
        >
          {!openMobileMenu && <span>{tabTitle}</span>}
        </Typist>
      </div>
      <SideMenu
        blinkBurger={blinkBurger}
        className="side-menu"
        showMobileMenu={showMobileMenu}
        openMobileMenu={openMobileMenu}
        activeMenuItem={activeMenuItem}
        toggleAcriveMenuItem={e => {
          setActiveMenuItem(e.currentTarget.id);
          setOpenMobileMenu(false);
        }}
        toggleOpenMobileMenu={() => setOpenMobileMenu(!openMobileMenu)}
      />
      <div
        className={
          !openMobileMenu
            ? "app__main-container"
            : "app__main-container--fading-out "
        }
      >
        {navigateTo}
      </div>
    </div>
  );
}
