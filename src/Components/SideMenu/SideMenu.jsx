import React from "react";
import "./SideMenu.scss";
import { useTransition, animated } from "react-spring";
export default function SideMenu(reactProps) {
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
  const burgerInbound = useTransition(reactProps.showMobileMenu, null, {
    from: { width: "0px" },
    enter: { width: "30px" }
  });
  menuItems = menuItems.map(e => {
    let liItem;
    if (e[1] === reactProps.activeMenuItem) {
      if (reactProps.colorMenu) {
        liItem = (
          <span className="side-menu__item__text" style={{ color: "#949da8" }}>
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
  return window.innerWidth > 820
    ? transition.map(({ props }) => (
        <animated.div key="side-menuabv820" style={props} className="side-menu">
          {menuItems}
        </animated.div>
      ))
    : burgerInbound.map(({ item, props }) => {
        return (
          <div key="side-menu" className="side-menu">
            {item && (
              <div
                onClick={reactProps.toggleOpenMobileMenu}
                className={"side-menu__burger-wrapper"}
              >
                <animated.span
                  key="burger"
                  style={props}
                  className={
                    !reactProps.openMobileMenu
                      ? "side-menu__burger"
                      : "side-menu__burger--clicked side-menu__burger "
                  }
                />
              </div>
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
          </div>
        );
      });
}
