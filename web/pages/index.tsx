import { Element, Portion, Row, Text } from "fictoan-react";
import { DefaultSession } from "next-auth";
import { useEffect, useRef } from "react";
import { IndexStyled } from "./index.styled";

const BlinkingCursor = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      ref.current &&
        (ref.current.style.visibility =
          ref.current.style.visibility == "hidden" ? "visible" : "hidden");
    }, 300);
    return () => clearInterval(interval);
  }, []);
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span className="font-monospace font-xl" ref={ref}>
      _
    </span>
  );
};

const RequestsHome = ({ session = {} }: { session: DefaultSession }) => {
  return (
    <Element as={IndexStyled} className="fit-content">
      <Row gutters="none" marginBottom="none" className="full-height">
        <Portion
          desktopSpan="five-twelfth"
          className="left-partition vertically-center-items"
        >
          <Element as="div">
            <Row marginLeft="medium">
              <Portion
                className="left-banner horizontally-center-items"
                desktopSpan="one-third"
              >
                <div />
                <div />
                <div />
              </Portion>
              <Portion
                className="right-banner vertically-center-items"
                desktopSpan="two-third"
              >
                <div>
                  <Text className="font-monospace font-xl" textColor="white">
                    robinhood
                    <BlinkingCursor />
                  </Text>
                  <Text className="font-default" textColor="white" size="large">
                    Resources for everyone
                  </Text>
                </div>
              </Portion>
            </Row>
          </Element>
        </Portion>
        <Portion
          desktopSpan="seven-twelfth"
          className="right-partition"
        ></Portion>
      </Row>
    </Element>
  );
};

export default RequestsHome;
