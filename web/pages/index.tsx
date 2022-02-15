import { DefaultSession } from "next-auth";
import { useEffect, useRef, useState } from "react";

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

interface User {
    name: string;
    stats: {
        cpu: number[];
        ram: number[];
        ssd: number[];
        isp: number[]; 
    }
}

const RequestsHome = ({session = {}}: { session: DefaultSession }) => {
    const [users, setUsers] = useState<User[]>([
        // {
        //     name: "dhiraj@setu.co",
        //     stats: {
        //         cpu: [1,10,100,90,56,38,30,100,93,87],
        //         ram: [31,20,96,75,56,8,90,64,73,56],
        //         ssd: [1,40,40,40,70,70,70,80,56,45],
        //         isp: [1,30,30,20,75,12,76,80,56,95],
        //     }
        // },
        {
            name: "gb@setu.co",
            stats: {
                cpu: [1,10,100,90,56,38,30,100,93,87],
                ram: [1,34,23,54,12,76,98,23,12,12],
                ssd: [1,23,12,54,70,56,84,80,56,23],
                isp: [12,43,30,76,56,87,76,87,60,60],
            }
        },
        // {
        //     name: "sujan@setu.co",
        //     stats: {
        //         cpu: [29,21,43,88,64,4,30,83,66,89],
        //         ram: [65,16,51,63,55,60,20,72,2,33],
        //         ssd: [57,25,27,90,17,84,69,77,68,27],
        //         isp: [2,53,67,32,82,80,55,65,3,34],
        //     }
        // },
    ]);

    useEffect(() => {
        setInterval(updateStats, 1500)
    }, [])

    const getRandom = (a: number, b: number) => {
        return a + Math.floor(b*Math.random());
    }

    const updateStats = () => {
        let newUsers = [];
        for(let user of users) {
            let newCPU = getRandom(0, 100)
            let newRAM = getRandom(0, 100)
            let newSSD = getRandom(0, 100)
            let newISP = getRandom(0, 100)

            user.stats.cpu.shift()
            user.stats.cpu.push(newCPU)
            user.stats.ram.shift()
            user.stats.ram.push(newRAM)
            user.stats.ssd.shift()
            user.stats.ssd.push(newSSD)
            user.stats.isp.shift()
            user.stats.isp.push(newISP)
            newUsers.push(user)
        }
        setUsers(newUsers)
    }


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
                    {users.map((user, i) => (
                        <Element as="div" className="user-card" id="user-01">
                            <Element
                                as="header"
                                className="user-subpanel vertically-centre-items push-to-ends"
                                paddingLeft="micro" paddingTop="nano" paddingBottom="nano"
                            >
                                <Heading as="h5" weight="700">D.0{i+1} / {user.name}</Heading>

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
                                        {user.stats.cpu.map(stat => (
                                            <Element as="div" className="usage-indicator" style={{ transform: `scaleY(${stat})` }} />
                                        ))}
                                    </Element>
                                </Element>

                                <Element as="div" className="data-subpanel">
                                    <Text margin="nano" className="panel-label">RAM</Text>
                                    <Element as="div" className="dataviz-panel ram-panel">
                                        {user.stats.ram.map(stat => (
                                            <Element as="div" className="usage-indicator" style={{ transform: `scaleY(${stat})` }} />
                                        ))}
                                    </Element>
                                </Element>

                                <Element as="div" className="data-subpanel">
                                    <Text margin="nano" className="panel-label">SSD</Text>
                                    <Element as="div" className="dataviz-panel ssd-panel">
                                        {user.stats.ssd.map(stat => (
                                            <Element as="div" className="usage-indicator" style={{ transform: `scaleY(${stat})` }} />
                                        ))}
                                    </Element>
                                </Element>

                                <Element as="div" className="data-subpanel">
                                    <Text margin="nano" className="panel-label">ISP</Text>
                                    <Element as="div" className="dataviz-panel isp-panel">
                                        {user.stats.isp.map(stat => (
                                            <Element as="div" className="usage-indicator" style={{ transform: `scaleY(${stat})` }} />
                                        ))}
                                    </Element>
                                </Element>
                            </Element>
                        </Element>
                    ))}
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
