import React from "react";
import FFC from "../../assets/free-code-camp-brands.svg";
import "./Certification.scss";
import Typist from "react-typist";

export default function Certification(props) {
  return (
    <div className="certification">
      <Typist>
        <span>Certification</span>
      </Typist>
      <img
        width="200px"
        height="200px"
        className="certification__FCC-logo"
        src={FFC}
        alt=""
      />
      <ul className="certification__list">
        <li className="certification__list__item">
          JavaScript Algorithms and Data Structures
        </li>
        <li className="certification__list__item">Front End Libraries</li>
        <li className="certification__list__item">Responsive Web Design</li>
      </ul>
      <Typist>
        <span>Social Media Accounts</span>
      </Typist>
      <ul className="certification__list">
        <li className="certification__list__item">HackerRank</li>
        <li className="certification__list__item">Github</li>
      </ul>
    </div>
  );
}
