import React, { useRef, Fragment } from "react";
import { useTransition, animated } from "react-spring";
import reactSVG from "../../../assets/SVG/react-brands.svg";
import es6SVG from "../../../assets/SVG/es6-brands.svg";
import jestSVG from "../../../assets/SVG/jest-brands.svg";
import sassSVG from "../../../assets/SVG/sass-brands.svg";
import "./tech-stack.scss";

export default function TechStack(reactProps) {
  const { techTransitionLeftRef, techTransitionRightRef } = reactProps;
  const SVGS = [
    { src: reactSVG, name: "React", color: "#52BEDA" },
    { src: es6SVG, name: "ECMAScript 6+", color: "#F26522" },
    { src: sassSVG, name: "Sass", color: "#CF649A" },
    { src: jestSVG, name: "Jest", color: "#C63D14" }
  ];
  const transitionsLeft = useTransition(SVGS.slice(0, 2), item => item.name, {
    from: { opacity: 0, transform: "translate3d(-40px,0px,0px)" },
    enter: { opacity: 1, transform: "translate3d(0px,0px,0px)" },
    ref: techTransitionLeftRef
  });
  const transitionsRight = useTransition(SVGS.slice(2), item => item.name, {
    from: { opacity: 0, transform: "translate3d(40px,0px,0px)" },
    enter: { opacity: 1, transform: "translate3d(0px,0px,0px)" },
    ref: techTransitionRightRef
  });
  return (
    <div className="tech-stack">
      <div className="tech-stack__left">
        {transitionsLeft.map(({ props, item, key }) => (
          <div className="tech-stack__wrapper" key={key}>
            <animated.img
              style={Object.assign({}, { marginRight: "5px" }, props)}
              src={item.src}
              alt=""
              className="tech-stack__left__item"
              height="150px"
              width="150px"
            />
            <animated.span
              className="tech-stack__title"
              style={Object.assign(
                {},
                { color: item.color, marginBottom: "10px" },
                props
              )}
            >
              {item.name}
            </animated.span>
          </div>
        ))}
      </div>
      <div className="tech-stack__right">
        {transitionsRight.map(({ props, item, key }) => (
          <div className="tech-stack__wrapper" key={key}>
            <animated.img
              style={Object.assign({}, { marginLeft: "5px" }, props)}
              src={item.src}
              alt=""
              className="tech-stack__right__item"
              height="150px"
              width="150px"
            />
            <animated.span
              className="tech-stack__title"
              style={Object.assign(
                {},
                { color: item.color, marginBottom: "10px" },
                props
              )}
            >
              {item.name}
            </animated.span>
          </div>
        ))}
      </div>
    </div>
  );
}
