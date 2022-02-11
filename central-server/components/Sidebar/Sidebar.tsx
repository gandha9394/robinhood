import { Element, Card, Text, HRule } from "fictoan-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from 'next/link'
import Image from 'next/image'

import HomeIcon from '../../public/assets/icons/home.svg'
import LockIcon from '../../public/assets/icons/auth.svg'
import OrgIcon from '../../public/assets/icons/org.svg'
import ProductIcon from '../../public/assets/icons/product.svg'
import ReportsIcon from '../../public/assets/icons/reports.svg'
import SupportIcon from '../../public/assets/icons/support.svg'
import LightThemeIcon from '../../public/assets/icons/theme-light.svg'
import LogoutIcon from '../../public/assets/icons/logout.svg'
import ActiveProductIcon from '../../public/assets/icons/app.svg'
import UserGenericIcon from '../../public/assets/icons/user-generic.svg'
import EditIcon from '../../public/assets/icons/edit.svg'

import { SidebarStyled } from "./Sidebar.styled";
import { getSession, signOut } from "next-auth/client";
import { useClickOutside } from "../../hooks/UseClickOutside";
import { DefaultSession } from "next-auth";

export const Sidebar = () => {
    
    const [isProfileCardVisible, setIsProfileCardVisible] = useState(false);
    const [session, setSession] = useState<DefaultSession>();
    const profileCardRef = useRef<HTMLDivElement>(null);
    const onClickOutside = useCallback(() => {
        setIsProfileCardVisible(false);
    }, []);
    useClickOutside(profileCardRef, onClickOutside);
    useEffect(() => {
        getSession().then((res) => {
            // @ts-ignore
            setSession(res);
        });
    }, []);

    const user = session?.user?.name;
    
    return (
        <SidebarStyled>
            <header>
                {/* <Link href="/" passHref> */}
                    <Image src="/assets/images/icon.svg" width="32px" height="32px"></Image>
                {/* </Link> */}
            </header>

            <Element as="nav">
                <Link href="/">
                    <Element as="div" className="sidebar-link">
                        <HomeIcon />
                        <span>Home</span>
                    </Element>
                </Link>

                <Link href="/request/create">
                    <Element as="div" className="sidebar-link">
                        {/* <SupportIcon /> */}
                        <EditIcon/>
                        <span>Create</span>
                    </Element>
                </Link>
            </Element>

            <footer>
                {/* <Element as="div" className="sidebar-link">
                    <LightThemeIcon />
                    <span>Switch to { "dark"} theme</span>
                </Element>

                <Element as="div" className="sidebar-link">
                    <LockIcon />
                    <span>Lock session</span>
                </Element> */}

                <Element
                    as="div"
                    className="sidebar-link"
                    onClick={()=>{
                        setIsProfileCardVisible(true);
                    }}
                >
                    <UserGenericIcon />
                    <span>User profile</span>
                </Element>

                <div ref={profileCardRef}>
                    <Card id="user-profile-card" shape="rounded" className={`${isProfileCardVisible && "visible"}`}>
                        <>
                            <Element as="div" className="user-name sidebar-link vertically-centre-items">
                                    <UserGenericIcon />
                                <Text weight="600">{user}</Text>
                            </Element>

                            <HRule marginTop="nano" marginBottom="nano" />
                        </>
                        <Element
                            as="div"
                            className="sidebar-link vertically-centre-items"
                            marginTop="nano"
                            onClick={()=>{
                                signOut()
                            }}
                        >
                            <LogoutIcon />
                            <Text>Logout</Text>
                        </Element>
                    </Card>
                </div>
            </footer>
        </SidebarStyled>
    );
};
