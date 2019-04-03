import React, { useRef } from "react";
import clamp from "lodash-es/clamp";
import { useGesture } from "react-with-gesture";
import { animated, useSprings } from "react-spring";
import "./other-projects.scss";
import MobileDrumMachine from "../../assets/Mobile-drum-machine.png";
import MobileJavaScriptCalculator from "../../assets/Mobile-js-calc.png";
import MobilePomodoroClock from "../../assets/Mobile-pomodoro-clock.png";
import PortfolioPage from "../../assets/Mobile-portfolio-page.png";
import GITHUB from "../../assets/SVG/github-brands.svg";

export default function OtherProjects(reactProps) {
  const items = [
    {
      src: PortfolioPage,
      name: "Portfolio Page",
      href: "https://github.com/matkoson/profile-page",
      text: "Swipe left ⬅",
      width: "210px"
    },
    {
      src: MobileDrumMachine,
      name: "Drum Machine",
      href: "https://github.com/matkoson/FCC-drum-machine",
      text: "Swipe left ⬅"
    },
    {
      src: MobileJavaScriptCalculator,
      name: "React Calculator",
      href: "https://github.com/matkoson/FCC-javaScript-calculator",
      text: "Swipe left ⬅"
    },
    {
      src: MobilePomodoroClock,
      name: "Pomodoro Clock",
      href: "https://github.com/matkoson/FCC-pomodoro-clock"
    }
  ];
  const index = useRef(0);
  const [sliderProps, setSliderProps] = useSprings(items.length, i => ({
    x: i * window.innerWidth,
    sc: 1,
    display: "block"
  }));
  const bind = useGesture(
    ({ down, delta: [xDelta], direction: [xDir], distance, cancel }) => {
      if (down && distance > window.innerWidth / 2) {
        cancel(
          (index.current = clamp(
            index.current + (xDir > 0 ? -1 : 1),
            0,
            items.length - 1
          ))
        );
      }
      setSliderProps(i => {
        if (i < index.current - 1 && i > index.current + 1)
          return { display: "none" };
        const x = (i - index.current) * window.innerWidth + (down ? xDelta : 0);
        const sc = down ? 1 - distance / window.innerWidth / 2 : 1;
        return {
          x,
          sc,
          display: "block"
        };
      });
    }
  );

  return (
    <div className="other-projects">
      <div
        className="other-projects__slider-wrapper"
        style={{ maxWidth: "100vw" }}
      >
        {sliderProps.map(({ x, display, sc }, i) => (
          <animated.div
            {...bind()}
            key={i}
            style={{
              display,
              transform: x.interpolate(x => `translate3d(${x}px,0,0)`)
            }}
            className="other-projects__slider-wrapper__swap-wrapper"
          >
            <div className="other-projects__slider-wrapper__swap-wrapper__join-wrapper  ">
              <span className="other-projects__slider-wrapper__swap-wrapper__join-wrapper__text">
                {items[i].text && items[i].text}
              </span>
              <div className="other-projects__slider-wrapper__swap-wrapper__join-wrapper__img">
                {
                  <animated.img
                    height="380px"
                    width={items[i].width ? items[i].width : "280px"}
                    src={items[i].src}
                    alt=""
                    className="other-projects__slider-wrapper__swap-wrapper__join-wrapper__img__item"
                  />
                }
              </div>
              <a target="_blank" rel="noopener noreferrer" href={items[i].href}>
                <div className="other-projects__slider-wrapper__swap-wrapper__join-wrapper__code-source">
                  <span>{items[i].name}</span>
                  <img height="100px" width="100px" src={GITHUB} alt="" />
                  <span>GitHub repository + live version</span>
                </div>
              </a>
            </div>
          </animated.div>
        ))}
      </div>
    </div>
  );
}
