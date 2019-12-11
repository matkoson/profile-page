import React from "react";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import "./Introduction.scss";
export default function Introduction(props) {
  return (
    <div className="introduction">
      <div
        style={props.opacityDimmer ? props.opacityDimmer : null}
        className="introduction__text-content"
      >
        <Typist
          avgTypingDelay={40}
          onTypingDone={props.typingDoneCB}
          onCharacterTyped={props.setShowMobileMenu}
          cursor={{ hideWhenDone: true, hideWhenDoneDelay: 3000 }}
        >
          <Typist.Delay ms={1500} />
          <span>Hello there,</span>
          <br />
          <Typist.Delay ms={2000} />
          <span>my name's Mateusz.</span>
          <Typist.Delay ms={1500} />
          <br />
          <br />
          <div>
            <span>I am a </span>
            <span style={{ color: "#FBAD5D" }}>JavaScript</span> developer with
            special feelings for
            <p style={{ display: "inline", color: "#61dafb" }}> React</p>.
          </div>
          <Typist.Delay ms={1500} />
          <br />
          <br />
          <br />
          <span>
            I dedicated one year of my life to became a software developer,
            which luckily ended up with <br />a success :)
          </span>
          <Typist.Delay ms={1500} />
          <br />
          <br />
          <span>
            Please take a moment to check out the effects of
            <br /> my endevours.
          </span>
        </Typist>
      </div>
    </div>
  );
}
