import {
  Button,
  CodeBlock,
  Element,
  Heading,
  Portion,
  Row,
  Text,
} from "fictoan-react";
import { DefaultSession } from "next-auth";
import { useEffect, useRef } from "react";
import IndexStyled,{ MonitorStyled } from "./index.styled";
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
const Monitor = (props: any) => {
  return (
    <Element as={MonitorStyled} {...props}>
      <div><span className="gg-terminal"></span></div>
      <div></div>
      <div></div>
    </Element>
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
                {/* <Monitor color="yellow" height="190px" x="0px" y="0px"/> */}
                <Monitor color="#ff9900" height="190px" x="2px" y="2px" />
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
          paddingLeft="medium"
          paddingRight="small"
          className="right-partition vertically-center-items"
        >
          <div>
            <Heading as="h1" className="font-xxl font-default">
              Poor man&apos;s VPS
            </Heading>
            <Text marginTop="micro">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <CodeBlock
              className="font-monospace"
              source="npm install -g robinhood"
              language="bash"
              marginTop="nano"
            ></CodeBlock>
            <Element as="div" marginTop="nano">
              <Button kind="primary" shape="curved" marginRight="nano">
                Launch web-terminal
              </Button>
              <Button kind="secondary" marginRight="nano" className="link-to-doc">
                Find resources
              </Button>
              <Button kind="secondary" marginRight="nano" className="link-to-doc">
                Grant resources
              </Button>
            </Element>
          </div>
        </Portion>
      </Row>
    </Element>
  );
};

export default RequestsHome;
