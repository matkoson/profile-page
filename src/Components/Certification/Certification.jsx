import React from "react";
import { useSpring, animated, config } from "react-spring";
import FFC from "../../assets/SVG/free-code-camp-brands.svg";
import HK from "../../assets/SVG/hackerrank-brands.svg";
import GITHUB from "../../assets/SVG/github-brands.svg";
import "./Certification.scss";
import Typist from "react-typist";

export default function Certification(reactProps) {
  const props = useSpring({
    from: { opacity: 0, transform: "scale(0.9)" },
    to: async next => {
      setInterval(async () => {
        await next({ opacity: 0.6, transform: "scale(1)" });
        await next({ opacity: 0, transform: "scale(0.9)" });
      }, 4500);
    },
    config: config.molasses
  });
  return (
    <div className="certification">
      <div className="certification__FCC">
        <img
          width="120px"
          height="120px"
          className="certification__FCC__logo"
          src={FFC}
          alt=""
        />
        <h2
          className="certification__title certification__FCC__title"
          style={{ color: "#E5BB98" }}
        >
          FreeCodeCamp
        </h2>
      </div>
      <ul className="certification__list">
        <animated.h3
          style={Object.assign({}, props, { color: "#9C336D" })}
          className="certification__list__prompt"
        >
          Click on a title to see the certificate
        </animated.h3>
        <li className="certification__list__item">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.freecodecamp.org/certification/fccffe64ee1-9d3c-4cee-8e15-32da3ee88d0d/javascript-algorithms-and-data-structures"
          >
            JavaScript Algorithms and Data Structures
          </a>
        </li>
        <li className="certification__list__item">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.freecodecamp.org/certification/fccffe64ee1-9d3c-4cee-8e15-32da3ee88d0d/front-end-libraries"
          >
            Front End Libraries
          </a>
        </li>
        <li className="certification__list__item">
          {" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.freecodecamp.org/certification/fccffe64ee1-9d3c-4cee-8e15-32da3ee88d0d/responsive-web-design"
          >
            Responsive Web Design
          </a>
        </li>
      </ul>
      <Typist cursor={{ hideWhenDone: true }} className="certification__title">
        <strong
          className="certification__social-accounts"
          style={{ color: "#E5BB98" }}
        >
          Social Media Accounts
        </strong>
      </Typist>
      <ul className="certification__social-media">
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="certification__social-media__item"
            href=""
          >
            <img
              width="100px"
              height="100px"
              className="certification__social-media__item__img"
              src={HK}
              alt=""
            />
            <span>HackerRank</span>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="certification__social-media__item"
            href=""
          >
            <img
              width="100px"
              height="100px"
              className="certification__list__item__img"
              src={GITHUB}
              alt=""
            />
            <span>Github</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
