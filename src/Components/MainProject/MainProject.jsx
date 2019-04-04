import React, { useRef } from "react";
import "../MainProject/main-project.scss";
import SPOTIFY from "../../assets/SVG/spotify-brands.svg";
import GITHUB from "../../assets/SVG/github-brands.svg";
import FIREBASE from "../../assets/SVG/firebase-brands.svg";
import {
  animated,
  useTransition,
  useChain,
  useSpring,
  config,
  useTrail
} from "react-spring";
import GIFSlider from "./GIFSlider/GIFSlider";
import TechStack from "./TechStack/TechStack";
import DeskopView from "../../assets/DesktopView.png";

export default function MainProject(props) {
  const techTransitionLeftRef = useRef();
  const techTransitionRightRef = useRef();
  const springRef = useRef();
  const logoTransitionRef = useRef();
  const techStackTitleTransitionRef = useRef();
  const trailRef = useRef();
  const gifTransitionRef = useRef();
  const desktopViewTransitionRef = useRef();
  //
  console.log(window.innerWidth);
  // debugger;
  const imgMeasurements =
    window.outerWidth < 820
      ? { width: "150px", height: "150px" }
      : { width: "250px", height: "250px" };
  const { height, width } = imgMeasurements;
  //
  const logoTransition = useTransition(null, null, {
    from: {
      opacity: 0,
      transform: "translate3d(0, -50px,0)"
    },
    enter: { opacity: 1, transform: "translate3d(0px,0px,0px)" },
    ref: logoTransitionRef
  });
  const techStackTitleTransition = useTransition(null, "tech-stack-title", {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    ref: techStackTitleTransitionRef
  });
  const desktopViewTransition = useTransition(null, "desktop-view", {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    ref: desktopViewTransitionRef
  });
  const gifTransition = useTransition(null, null, {
    from: { opacity: 0, transform: "translate3d(-40px,0px,0px)" },
    enter: { opacity: 1, transform: "translate3d(0px,0px,0px)" },
    config: config.molasses,
    ref: gifTransitionRef
  });
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
  const trail = useTrail(revealElements.length, {
    config: config.molasses,
    opacity: 1,
    from: { opacity: 0 },
    ref: trailRef,
    delay: 1500
  });
  useChain([
    logoTransitionRef,
    springRef,
    trailRef,
    techStackTitleTransitionRef,
    techTransitionLeftRef,
    techTransitionRightRef,
    desktopViewTransitionRef,
    gifTransitionRef
  ]);

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
            style={Object.assign({}, { ...rest }, { color: "#B45B01" })}
            className="main-project__title__element"
          >
            {revealElements[i]}
          </animated.div>
        ))}
      </div>
      {techStackTitleTransition.map(({ props, key }) => (
        <animated.span
          key={key}
          style={Object.assign({}, props, { color: "#FBAD5D" })}
          className="main-project__tech-stack-title"
        >
          Tech Stack used in the project
        </animated.span>
      ))}

      <TechStack
        techTransitionLeftRef={techTransitionLeftRef}
        techTransitionRightRef={techTransitionRightRef}
      />
      <div className="main-project__desktop-view">
        {desktopViewTransition.map(({ props, key }) => (
          <React.Fragment key={key}>
            <animated.span
              style={props}
              className="main-project__desktop-view__title"
            >
              Desktop view
            </animated.span>

            <div className="main-project__desktop-view__img">
              <animated.img
                width="340px"
                style={props}
                src={DeskopView}
                alt=""
              />
            </div>
          </React.Fragment>
        ))}
      </div>
      <GIFSlider gifTransition={gifTransition} />
      <div className="main-project__code-sources">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/matkoson/Spotify-React-Client"
          className="main-project__code-sources__img-title"
        >
          <img height="150px" width="150px" src={GITHUB} alt="" />
          <span>Repository</span>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://react-spotify-client.firebaseapp.com"
          className="main-project__code-sources__img-title"
        >
          <img height="150px" width="150px" src={FIREBASE} alt="" />
          <span>Deployed</span>
        </a>
      </div>
    </div>
  );
}
