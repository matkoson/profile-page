import React from "react";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import "./Introduction.scss";
export default function Introduction(props) {
  return (
    <div className="introduction">
      <div className="introduction__text-content">
        <Typist
          avgTypingDelay={40}
          onTypingDone={props.toggleShowMenu}
          onCharacterTyped={props.setShowMobileMenu}
          cursor={{ hideWhenDone: true, hideWhenDoneDelay: 3000 }}
        >
          <Typist.Delay ms={1500} />
          <span>Hello there</span>
          <Typist.Delay ms={2000} />
          <span>, my name's Mateusz.</span>
          <Typist.Delay ms={1500} />
          <br />
          <br />
          <span>I identify myself as a self-tought JavaScript developer.</span>
          <Typist.Delay ms={1500} />
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
    </div>
  );
}
