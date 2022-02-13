import { DefaultSession } from "next-auth";
import { useEffect, useRef } from "react";

import {
    Button,
    CodeBlock,
    Element,
    Heading,
    Portion,
    Row,
    Text,
} from "fictoan-react";

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

const RequestsHome = ({session = {}}: { session: DefaultSession }) => {
    return (
        <IndexStyled>
            <Element as="header" id="page-header">
                <Heading
                    as="h2" weight="700" textColour="green"
                    marginTop="micro" marginLeft="micro" marginBottom="nano"
                >
                    Robinhood<span className="blinking-cursor">__</span>
                </Heading>
                <Heading as="h6" marginLeft="micro">
                    RESOURCES FOR EVERYONE
                </Heading>
            </Element>

            <Element as="section" id="donor-panel" className="panel">
                <Heading
                    as="h4" className="panel-heading" weight="700"
                    textColour="green"
                >
                    Donor
                </Heading>
            </Element>

            <Element as="section" id="consumer-panel" className="panel">
                <Heading
                    as="h4" className="panel-heading" weight="700"
                    textColour="green"
                >
                    Consumer
                </Heading>
            </Element>
        </IndexStyled>
    );
};

export default RequestsHome;
