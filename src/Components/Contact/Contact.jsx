import React, { useState } from "react";
import PHONE from "../../assets/SVG/smartphone-call.svg";
import MAIL from "../../assets/SVG/paper-plane.svg";
import "./contact.scss";
import { useTransition, animated, config } from "react-spring";
import Typist from "react-typist";
export default function Contact(reactProps) {
  const [typeMail, setTypeMail] = useState(false);
  const [typePhone, setTypePhone] = useState(false);
  const mailTransition = useTransition(null, "mail", {
    from: { opacity: 0, transform: "scale(0.85)" },
    enter: { opacity: 1, transform: "scale(1)" },
    config: config.molasses,
    onRest: () => setTypeMail(true)
  });

  const phoneTransition = useTransition(null, "phone", {
    from: { opacity: 0, transform: "scale(0.85)" },
    enter: { opacity: 1, transform: "scale(1)" },
    config: config.molasses,
    onRest: () => setTypePhone(true)
  });
  return (
    <div className="contact">
      <div className="contact__mail">
        {mailTransition.map(({ props, key }) => (
          <animated.img
            style={props}
            key={key}
            height="150px"
            width="150px"
            src={MAIL}
            alt=""
            className="contact__mail__img contact__img"
            cursor={{ display: false }}
          />
        ))}
        {typeMail && (
          <Typist cursor={{ show: false }}>
            <span>mateusz.koson@hotmail.com</span>
          </Typist>
        )}
      </div>
      <div className="contact__phone">
        {phoneTransition.map(({ props, key }) => (
          <animated.img
            style={props}
            key={key}
            height="150px"
            width="150px"
            src={PHONE}
            alt=""
            className="contact__phone__img contact__img"
          />
        ))}
        {typePhone && (
          <Typist cursor={{ show: false }}>
            <span>664 614 844</span>
          </Typist>
        )}
      </div>
    </div>
  );
}
