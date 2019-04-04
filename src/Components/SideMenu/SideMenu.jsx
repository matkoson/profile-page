import React, { useState, useEffect, useRef } from "react";
import "./side-menu.scss";
import { useTransition, animated, config } from "react-spring";

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
  const [blinkStyle, setBlinkStyle] = useState({ background: "#ffe5db" });
  const {
    blink,
    showDesktopMenu,
    showMobileMenu,
    activeMenuItem,
    colorMenu,
    toggleActiveMenuItem,
    toggleOpenMobileMenu,
    openMobileMenu
  } = reactProps;
  const cb = () => {
    if (blink)
      blinkStyle.background === "red"
        ? setBlinkStyle(
            window.outerWidth > 820
              ? { background: "#968680" }
              : {
                  background: "#ffe5db"
                }
          )
        : setBlinkStyle({ background: "red" });
  };
  useInterval(cb, 3000);
  let menuItems = [
    ["Introduction", "introduction"],
    ["Certification", "certification"],
    ["Main Project", "main-project"],
    ["Other Projects", "other-projects"],
    ["Contact", "contact"]
  ];
  const desktopMenuTransition = useTransition(showDesktopMenu, null, {
    delay: 5000,
    from: { opacity: 0, transform: "translate3d(40px,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0px)" },
    config: config.molasses
  });
  const burgerTransition = useTransition(showMobileMenu, null, {
    from: { width: "0px" },
    enter: { width: "30px" }
  });
  const menuItemsProcessed = adequateClass =>
    menuItems.map(e => {
      let liItem;
      console.log(e[0] === "Main Project" && blink && window.outerWidth > 820);
      if (e[1] === activeMenuItem) {
        if (colorMenu) {
          liItem = (
            <span
              className={`side-menu${adequateClass}__item__text`}
              style={{ color: "#533D2B" }}
            >
              {e[0]}
            </span>
          );
        } else {
          liItem = (
            <span
              className={`side-menu${adequateClass}__item__text`}
              style={{ color: "#f8ded5" }}
            >
              {e[0]}
            </span>
          );
        }
      } else {
        liItem = (
          <span
            style={
              e[0] === "Main Project" && blink
                ? {
                    color: blinkStyle.background,
                    transition: "color 2s ease-in"
                  }
                : { color: "#968680" }
            }
            className={`side-menu${adequateClass}__item__text`}
          >
            {e[0]}
          </span>
        );
      }
      return (
        <div
          key={e[1]}
          onClick={e => {
            toggleActiveMenuItem(e);
            if (timerId) {
              clearInterval(timerId);
              timerId = null;
              setBlinkStyle({
                background: "#94998d"
              });
            }
          }}
          className={`side-menu${adequateClass}__item`}
          id={e[1]}
          style={colorMenu ? { opacity: 1 } : { opacity: 0.6 }}
        >
          {liItem}
        </div>
      );
    });
  const { width, height } = { width: "100%", height: "100%" };
  return (
    <div className="side-menu" key="side-menu">
      {window.innerWidth > 820
        ? desktopMenuTransition.map(
            ({ item, props }) =>
              item && (
                <animated.div
                  className="side-menu__desktop-menu"
                  key="side-menuabv820"
                  style={Object.assign(
                    {},
                    { width: { width }, height: { height } },
                    props
                  )}
                >
                  {menuItemsProcessed("__desktop-menu")}

                  <div className="side-menu__desktop-menu__svg-wrapper">
                    <svg
                      className={
                        colorMenu
                          ? " side-menu__desktop-menu__svg-wrapper__svg side-menu__desktop-menu__svg-wrapper__svg--border"
                          : "side-menu__desktop-menu__svg-wrapper__svg"
                      }
                      height={height}
                      width={width}
                    >
                      <rect className="shape" height={height} width={width} />
                    </svg>
                  </div>
                </animated.div>
              )
          )
        : burgerTransition.map(
            ({ item, props }) =>
              item && (
                <div
                  key="burger"
                  onClick={() => {
                    toggleOpenMobileMenu();
                  }}
                  className={"side-menu__burger-wrapper"}
                >
                  <animated.span
                    style={Object.assign({}, props, blink && blinkStyle)}
                    className={
                      !openMobileMenu
                        ? "side-menu__burger"
                        : "side-menu__burger--clicked side-menu__burger "
                    }
                  />
                  <div
                    className={
                      openMobileMenu
                        ? "side-menu__mobile-list side-menu__mobile-list--revealed"
                        : "side-menu__mobile-list"
                    }
                    style={
                      openMobileMenu
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                  >
                    {menuItemsProcessed("__mobile-list")}
                  </div>
                </div>
              )
          )}
    </div>
  );
}
