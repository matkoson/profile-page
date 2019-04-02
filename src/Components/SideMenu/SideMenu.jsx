import React, { useState, useEffect, useRef } from "react";
import "./side-menu.scss";
import { useTransition, animated } from "react-spring";

function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(
    () => {
      savedCallback.current = callback;
    },
    [callback]
  );
  useEffect(
    () => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        timerId = id;
        return () => clearInterval(id);
      }
    },
    [delay]
  );
}
var timerId;
export default function SideMenu(reactProps) {
  const [blinkStyle, setBlinkStyle] = useState({ background: "#94998d" });
  const cb = () => {
    if (reactProps.blinkBurger)
      blinkStyle.background === "red"
        ? setBlinkStyle({
            background: "#94998d"
          })
        : setBlinkStyle({ background: "red" });
  };
  useInterval(cb, 3000);
  console.log(reactProps.openMobileMenu);
  let menuItems = [
    ["Introduction", "introduction"],
    ["Certification", "certification"],
    ["Main Project", "main-project"],
    ["Other Projects", "other-projects"],
    ["Contact", "contact"]
  ];
  const transition = useTransition(null, null, {
    from: { opacity: 0, transform: "translate3d(40px,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0px)" }
  });
  // console.log(reactProps.showMobileMenu);
  const burgerInbound = useTransition(reactProps.showMobileMenu, null, {
    from: { width: "0px" },
    enter: { width: "30px" }
  });
  menuItems = menuItems.map(e => {
    let liItem;
    if (e[1] === reactProps.activeMenuItem) {
      if (reactProps.colorMenu) {
        liItem = (
          <span className="side-menu__item__text" style={{ color: "#b0b7bf" }}>
            {e[0]}
          </span>
        );
      } else {
        liItem = (
          <span className="side-menu__item__text" style={{ color: "#949da8" }}>
            {e[0]}
          </span>
        );
      }
    } else {
      liItem = <span className="side-menu__item__text">{e[0]}</span>;
    }
    return (
      <div
        key={e[1]}
        onClick={reactProps.toggleAcriveMenuItem}
        className="side-menu__item"
        id={e[1]}
      >
        {liItem}
      </div>
    );
  });
  return (
    <div className="side-menu" key="side-menu">
      {window.innerWidth > 820 ? (
        <React.Fragment key="desktop">
          {transition.map(({ props }) => (
            <animated.div key="side-menuabv820" style={props}>
              {menuItems}
            </animated.div>
          ))}
        </React.Fragment>
      ) : (
        <React.Fragment key="mobile">
          {burgerInbound.map(
            ({ item, props }) =>
              item && (
                <div
                  key="burger"
                  onClick={() => {
                    reactProps.toggleOpenMobileMenu();
                    if (timerId) {
                      clearInterval(timerId);
                      timerId = null;
                      setBlinkStyle({
                        background: "#94998d"
                      });
                    }
                  }}
                  className={"side-menu__burger-wrapper"}
                >
                  <animated.span
                    style={Object.assign({}, props, blinkStyle)}
                    className={
                      !reactProps.openMobileMenu
                        ? "side-menu__burger"
                        : "side-menu__burger--clicked side-menu__burger "
                    }
                  />
                </div>
              )
          )}

          <div
            className={
              reactProps.openMobileMenu
                ? "side-menu__mobile-list side-menu__mobile-list--revealed"
                : "side-menu__mobile-list"
            }
          >
            {menuItems}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
