import React, { useRef } from "react";
import "../MainProject/main-project.scss";
import SPOTIFY from "../../assets/spotify-brands.svg";
import {
  animated,
  useTransition,
  useChain,
  useSpring,
  config,
  useTrail
} from "react-spring";
import GIFSlider from "./GifSlider";

export default function MainProject(props) {
  const imgMeasurements =
    window.innerWidth < 820
      ? { width: "150px", height: "150px" }
      : { width: "300px", height: "300px" };
  const { height, width } = imgMeasurements;
  const logoTransitionRef = useRef();
  const logoTransition = useTransition(null, null, {
    from: {
      opacity: 0,
      transform: "translate3d(0, -50px,0)"
    },
    enter: { opacity: 1, transform: "translate3d(0px,0px,0px)" },
    ref: logoTransitionRef
  });
  const springRef = useRef();
  const wobbleProps = useSpring({
    from: { opacity: 1, transform: "translate3d(0px,0px,0px)" },
    to: async next => {
      setInterval(async () => {
        await next({ opacity: 0.5, transform: "translate3d(0px,-10px,0px)" });
        await next({ opacity: 1, transform: "translate3d(0px,0px,0px)" });
      }, 1000);
    },
    ref: springRef,
    config: config.molasses
  });
  const revealElements = [
    <animated.span>Spotify</animated.span>,
    <animated.span>React</animated.span>,
    <animated.span>Client</animated.span>
  ];
  const trailRef = useRef();
  const trail = useTrail(revealElements.length, {
    config: config.molasses,
    opacity: 1,
    from: { opacity: 0 },
    ref: trailRef,
    delay: 1500
  });
  const gifTransitionRef = useRef();
  const gifTransition = useTransition(null, null, {
    from: { opacity: 0, transform: "translate3d(-40px,0px,0px)" },
    enter: { opacity: 1, transform: "translate3d(0px,0px,0px)" },
    config: config.molasses,
    ref: gifTransitionRef
  });
  useChain([logoTransitionRef, springRef, trailRef, gifTransitionRef]);
  return (
    <div className="main-project">
      <animated.div style={wobbleProps} className="main-project__landing">
        {logoTransition.map(({ props }) => (
          <animated.img
            key="spotify-logo"
            style={props}
            height={height}
            width={width}
            src={SPOTIFY}
            alt=""
            className="main-project__landing__logo"
          />
        ))}
      </animated.div>
      <div className="main-project__title">
        {trail.map(({ ...rest }, i) => (
          <animated.div
            key={i}
            style={{ ...rest }}
            className="main-project__title__element"
          >
            {revealElements[i]}
          </animated.div>
        ))}
      </div>
      <GIFSlider gifTransition={gifTransition} />
    </div>
  );
}
