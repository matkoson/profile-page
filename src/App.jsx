import React, { useState } from "react";
import "./App.scss";
import Introduction from "./Components/Introduction/Introduction";
import SideMenu from "./Components/SideMenu/SideMenu";
import Certification from "./Components/Certification/Certification";
import MainProject from "./Components/MainProject/MainProject";
import OtherProjects from "./Components/OtherProjects/OtherProjects";
import Typist from "react-typist";
import Contact from "./Components/Contact/Contact";

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
  const [blink, setBlink] = useState(false);
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
    case "contact":
      navigateTo = <Contact />;
      tabTitle = "Contact";
      break;
    default:
      tabTitle = "Introduction";
      navigateTo = (
        <Introduction
          opacityDimmer={opacityDimmer}
          showDesktopMenu={showDesktopMenu}
          typingDoneCB={() => {
            if (window.outerWidth < 820) {
              setOpacityDimmer({ opacity: 0.4 });
            } else {
              setColorMenu(true);
            }
            setBlink(true);
          }}
          setShowMobileMenu={(char, pos) => {
            if (lettersCounter > 10) return;
            setLettersCounter(lettersCounter + 1);
            window.outerWidth > 820
              ? setShowDesktopMenu(lettersCounter === 10 ? true : false)
              : setShowMobileMenu(lettersCounter === 10 ? true : false);
          }}
        />
      );
  }
  return (
    <div
      className="app"
      style={Object.assign(
        {},
        tabTitle === "Main Project"
          ? {
              backgroundColor: "black",
              transition: "background-color 3s ease-in"
            }
          : {
              backgroundColor: "#121217"
            }
      )}
    >
      {window.outerWidth < 820 && (
        <div
          className="app__title-wrapper"
          style={!openMobileMenu ? { opacity: 1 } : { opacity: 0 }}
        >
          <Typist
            key={tabTitle}
            className={"app__tab-title "}
            cursor={{ show: false }}
          >
            {!openMobileMenu && (
              <span style={{ color: "#89898d" }}>{tabTitle}</span>
            )}
          </Typist>
        </div>
      )}
      <SideMenu
        blink={blink}
        showDesktopMenu={showDesktopMenu}
        showMobileMenu={showMobileMenu}
        openMobileMenu={openMobileMenu}
        activeMenuItem={activeMenuItem}
        toggleActiveMenuItem={e => {
          console.log(e);
          setActiveMenuItem(e.currentTarget.id);
          setOpenMobileMenu(false);
          setColorMenu(true);
          setBlink(false);
        }}
        toggleOpenMobileMenu={() => {
          setOpenMobileMenu(!openMobileMenu);
        }}
        colorMenu={colorMenu}
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
