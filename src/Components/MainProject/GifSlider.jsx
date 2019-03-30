import React, { useRef } from "react";
import clamp from "lodash-es/clamp";
import { useGesture } from "react-with-gesture";
import GIF1 from "../../assets/GIF/optimizedMobileGIF1.gif";
import GIF2 from "../../assets/GIF/optimizedMobileGIF2.gif";
import { animated, useSprings } from "react-spring";
export default function GIFSlider(reactProps) {
  const GIFS = [GIF1, GIF2];
  const index = useRef(0);
  const [sliderProps, setSliderProps] = useSprings(GIFS.length, i => ({
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
            GIFS.length - 1
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
  return reactProps.gifTransition.map(({ props }) => (
    <animated.div style={props} key="gif1" className="main-project__GIF-slider">
      <div className="main-project__GIF-slider__mobile-desktop">
        <span>mobile</span>
        <span>desktop</span>
      </div>
      <div className="main-project__GIF-slider__GIFS">
        {sliderProps.map(({ x, display, sc }, i) => (
          <animated.div
            {...bind()}
            key={i}
            style={{
              display,
              transform: x.interpolate(x => `translate3d(${x}px,0,0)`)
            }}
            className="main-project__GIF-slider__GIFS__GIF"
          >
            <animated.img
              height="380px"
              width="200px"
              // style={{ transform: sc.interpolate(s => `scale(${s})`) }}
              //   style={{ display: "block" }}
              src={GIFS[i]}
              alt=""
            />
          </animated.div>
        ))}
      </div>
    </animated.div>
  ));
}
