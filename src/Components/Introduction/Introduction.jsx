import React from "react";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import "./Introduction.scss";
export default function Introduction(props) {
  return <div className="introduction">
      <div style={props.opacityDimmer ? props.opacityDimmer : null} className="introduction__text-content">
        <Typist avgTypingDelay={40} onTypingDone={props.typingDoneCB} onCharacterTyped={props.setShowMobileMenu} cursor={{ hideWhenDone: true, hideWhenDoneDelay: 3000 }}>
          <Typist.Delay ms={1500} />
          <span>Hello there,</span>
          <br />
          <Typist.Delay ms={2000} />
          <span>my name's Mateusz.</span>
          <Typist.Delay ms={1500} />
          <br />
          <br />
          <span>
            I identify myself as a self-taught <span
              style={{ color: "#FBAD5D" }}
            >
              JavaScript
            </span> developer.
          </span>
          <Typist.Delay ms={1500} />
          <br />
          <br />
          <br />
          <span>
            The last year of my life was dedicated solely for becoming
            <br />
            an employable software programmer.
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
    </div>;
}
