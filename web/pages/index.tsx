import { DefaultSession } from "next-auth";
import { useEffect, useRef } from "react";

import {
    Button,
    CodeBlock,
    Element,
    Heading, HRule,
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
                >
                    ~ / robinhood<span className="caret-blink">__</span>
                </Heading>
                <Heading as="h6" marginTop="nano">
                    RESOURCES FOR EVERYONE. ALMOST.
                </Heading>
            </Element>

            {/*  /////////////////////////////////////////////////////////  */}
            {/*  DONOR PANEL  */}
            {/*  /////////////////////////////////////////////////////////  */}

            <Element as="section" id="donor-panel" className="panel">
                <Element as="header" padding="micro">
                    <Heading
                        as="h4" className="panel-heading" weight="700"
                        textColour="green"
                    >
                        Donor
                    </Heading>

                    {/*  SPEC LIST  ======================================  */}
                    <Element
                        as="div"
                        id="spec-list"
                        className="vertically-centre-items"
                    >
                        <Element as="div" className="vertically-centre-items">
                            <Text>CPU /&nbsp;</Text>
                            <Text weight="700">Ryzen 5900x</Text>
                        </Element>

                        <Element as="div" className="vertically-centre-items">
                            <Text>RAM /&nbsp;</Text>
                            <Text weight="700">64GB</Text>
                        </Element>

                        <Element as="div" className="vertically-centre-items">
                            <Text>SSD /&nbsp;</Text>
                            <Text weight="700">600GB free</Text>
                        </Element>

                        <Element as="div" className="vertically-centre-items">
                            <Text>ISP /&nbsp;</Text>
                            <Text weight="700">250mbps</Text>
                        </Element>
                    </Element>
                </Element>

                <HRule kind="primary" margin="none" />

                {/*  USER LIST  ==========================================  */}
                <Element as="section">
                    <Element as="header" padding="micro" paddingBottom="none">
                        <Text
                            weight="700"
                            className="section-heading"
                            textColour="green"
                            marginBottom="micro"
                        >
                            CURRENT USERS / 4
                        </Text>
                    </Element>

                    <HRule kind="secondary" margin="none" />

                    {/*  USER CARD  ....................................... */}
                    <Element as="div" className="user-card" id="user-01">
                        <Element
                            as="header"
                            className="user-subpanel vertically-centre-items push-to-ends"
                            paddingLeft="micro" paddingTop="nano" paddingBottom="nano"
                        >
                            <Heading as="h5" weight="700">D.01 / dhiraj0</Heading>

                            <Element
                                as="div" className="user-actions"
                                paddingRight="micro"
                            >
                                <Text className="resource-action">[x] Kick</Text>
                            </Element>
                        </Element>

                        <Element as="main" className="panel-wrapper">
                            <Element as="div" className="data-subpanel">
                                <Text margin="nano" className="panel-label">CPU</Text>
                                <Element as="div" className="dataviz-panel cpu-panel">
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                </Element>
                            </Element>

                            <Element as="div" className="data-subpanel">
                                <Text margin="nano" className="panel-label">RAM</Text>
                                <Element as="div" className="dataviz-panel ram-panel">
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                </Element>
                            </Element>

                            <Element as="div" className="data-subpanel">
                                <Text margin="nano" className="panel-label">SSD</Text>
                                <Element as="div" className="dataviz-panel ssd-panel">
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                </Element>
                            </Element>

                            <Element as="div" className="data-subpanel">
                                <Text margin="nano" className="panel-label">ISP</Text>
                                <Element as="div" className="dataviz-panel isp-panel">
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                </Element>
                            </Element>
                        </Element>
                    </Element>

                    {/*  USER CARD  ....................................... */}
                    <Element as="div" className="user-card" id="user-02">
                        <Element
                            as="header"
                            className="user-subpanel vertically-centre-items push-to-ends"
                            paddingLeft="micro" paddingTop="nano" paddingBottom="nano"
                        >
                            <Heading as="h5" weight="700">D.02 / gb</Heading>

                            <Element
                                as="div" className="user-actions"
                                paddingRight="micro"
                            >
                                <Text className="resource-action">[x] Kick</Text>
                            </Element>
                        </Element>

                        <Element as="main" className="panel-wrapper">
                            <Element as="div" className="data-subpanel">
                                <Text margin="nano" className="panel-label">CPU</Text>
                                <Element as="div" className="dataviz-panel cpu-panel">
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                </Element>
                            </Element>

                            <Element as="div" className="data-subpanel">
                                <Text margin="nano" className="panel-label">RAM</Text>
                                <Element as="div" className="dataviz-panel ram-panel">
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                </Element>
                            </Element>

                            <Element as="div" className="data-subpanel">
                                <Text margin="nano" className="panel-label">SSD</Text>
                                <Element as="div" className="dataviz-panel ssd-panel">
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                </Element>
                            </Element>

                            <Element as="div" className="data-subpanel">
                                <Text margin="nano" className="panel-label">ISP</Text>
                                <Element as="div" className="dataviz-panel isp-panel">
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                </Element>
                            </Element>
                        </Element>
                    </Element>

                    {/*  USER CARD  ....................................... */}
                    <Element as="div" className="user-card" id="user-03">
                        <Element
                            as="header"
                            className="user-subpanel vertically-centre-items push-to-ends"
                            paddingLeft="micro" paddingTop="nano" paddingBottom="nano"
                        >
                            <Heading as="h5" weight="700">D.02 / sujan</Heading>

                            <Element
                                as="div" className="user-actions"
                                paddingRight="micro"
                            >
                                <Text className="resource-action">[x] Kick</Text>
                            </Element>
                        </Element>

                        <Element as="main" className="panel-wrapper">
                            <Element as="div" className="data-subpanel">
                                <Text margin="nano" className="panel-label">CPU</Text>
                                <Element as="div" className="dataviz-panel cpu-panel">
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                </Element>
                            </Element>

                            <Element as="div" className="data-subpanel">
                                <Text margin="nano" className="panel-label">RAM</Text>
                                <Element as="div" className="dataviz-panel ram-panel">
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                </Element>
                            </Element>

                            <Element as="div" className="data-subpanel">
                                <Text margin="nano" className="panel-label">SSD</Text>
                                <Element as="div" className="dataviz-panel ssd-panel">
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                </Element>
                            </Element>

                            <Element as="div" className="data-subpanel">
                                <Text margin="nano" className="panel-label">ISP</Text>
                                <Element as="div" className="dataviz-panel isp-panel">
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                    <Element as="div" className="usage-indicator" />
                                </Element>
                            </Element>
                        </Element>
                    </Element>
                </Element>
            </Element>

            {/*  /////////////////////////////////////////////////////////  */}
            {/*  DONOR PANEL  */}
            {/*  /////////////////////////////////////////////////////////  */}
            <Element as="section" id="consumer-panel" className="panel">
                <Heading
                    as="h4" className="panel-heading" weight="700"
                    textColour="green"
                >
                    Consumer
                </Heading>

                {/*  USER LIST  ==========================================  */}
                <Element as="section">
                    <Element as="header" padding="micro" paddingBottom="none">
                        <Text
                            weight="700"
                            className="section-heading"
                            textColour="green"
                            marginBottom="micro"
                        >
                            AVAILABLE MACHINES / 2
                        </Text>
                    </Element>

                    <HRule kind="secondary" margin="none" />

                    {/*  MACHINE CARD  ....................................... */}
                    <Element
                        as="div"
                        id="machine-01"
                        className="machine-card"
                    >
                        <Element
                            as="header"
                            className="user-subpanel vertically-centre-items push-to-ends"
                            paddingLeft="micro" paddingTop="nano" paddingBottom="nano"
                        >
                            <Heading as="h5" weight="700">M.01 UT0PISTRIG</Heading>

                            <Element
                                as="div" className="user-actions"
                                paddingRight="micro"
                            >
                                <Text className="resource-action">[t] Tunnel</Text>
                            </Element>
                        </Element>

                        <HRule kind="secondary" margin="none" />

                        <Element as="div" className="machine-specs" id="machine-01">
                            <Element as="div" className="spec-card vertically-centre-items">
                                <Text>CPU /&nbsp;</Text>
                                <Text weight="700">Ryzen 5900x</Text>
                            </Element>

                            <Element as="div" className="spec-card vertically-centre-items">
                                <Text>RAM /&nbsp;</Text>
                                <Text weight="700">64GB</Text>
                            </Element>

                            <Element as="div" className="spec-card vertically-centre-items">
                                <Text>SSD /&nbsp;</Text>
                                <Text weight="700">600GB free</Text>
                            </Element>

                            <Element as="div" className="spec-card vertically-centre-items">
                                <Text>ISP /&nbsp;</Text>
                                <Text weight="700">250mbps</Text>
                            </Element>

                            <Element as="div" className="spec-card vertically-centre-items">
                                <Text>Users /&nbsp;</Text>
                                <Text weight="700">4 of 12</Text>
                            </Element>
                        </Element>
                    </Element>

                    {/*  MACHINE CARD  ....................................... */}
                    <Element
                        as="div"
                        id="machine-01"
                        className="machine-card"
                    >
                        <Element
                            as="header"
                            className="user-subpanel vertically-centre-items push-to-ends"
                            paddingLeft="micro" paddingTop="nano" paddingBottom="nano"
                        >
                            <Heading as="h5" weight="700">M.02 Shamu iMAC</Heading>

                            <Element
                                as="div" className="user-actions"
                                paddingRight="micro"
                            >
                                <Text className="resource-action">[t] Tunnel</Text>
                            </Element>
                        </Element>

                        <Element as="div" className="machine-specs" id="machine-01">
                            <Element as="div" className="spec-card vertically-centre-items">
                                <Text>CPU /&nbsp;</Text>
                                <Text weight="700">Intel i9 10900k</Text>
                            </Element>

                            <Element as="div" className="spec-card vertically-centre-items">
                                <Text>RAM /&nbsp;</Text>
                                <Text weight="700">32GB</Text>
                            </Element>

                            <Element as="div" className="spec-card vertically-centre-items">
                                <Text>SSD /&nbsp;</Text>
                                <Text weight="700">249GB free</Text>
                            </Element>

                            <Element as="div" className="spec-card vertically-centre-items">
                                <Text>ISP /&nbsp;</Text>
                                <Text weight="700">100mbps</Text>
                            </Element>

                            <Element as="div" className="spec-card vertically-centre-items">
                                <Text>Users /&nbsp;</Text>
                                <Text weight="700">2 of 12</Text>
                            </Element>
                        </Element>
                    </Element>

                    <HRule kind="secondary" margin="none" />
                </Element>
            </Element>

        </IndexStyled>
    );
};

export default RequestsHome;
