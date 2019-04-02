import React, { useRef, useState } from "react";
import clamp from "lodash-es/clamp";
import { useGesture } from "react-with-gesture";
import { animated, useSprings } from "react-spring";
import "./other-projects.scss";
import MobileDrumMachine from "../../assets/Mobile-drum-machine.png";
import MobileJavaScriptCalculator from "../../assets/Mobile-js-calc.png";
import MobilePomodoroClock from "../../assets/Mobile-pomodoro-clock.png";

export default function OtherProjects(reactProps) {
  const items = [
    { src: MobileDrumMachine, name: "mobile-drum-machine" },
    { src: MobileJavaScriptCalculator, name: "mobile-js-calc" },
    { src: MobilePomodoroClock, name: "mobile-pomodoro-clock" }
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
      {sliderProps.map(({ x, display, sc }, i) => (
        <animated.div
          {...bind()}
          key={i}
          style={{
            display,
            transform: x.interpolate(x => `translate3d(${x}px,0,0)`)
          }}
          className="other-projects__img"
        >
          <animated.img
            height="380px"
            width="280px"
            src={items[i].src}
            alt=""
            className="other-projects__img__item"
          />
        </animated.div>
      ))}
    </div>
  );
}
