import { Element, Card, Text, HRule } from "fictoan-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from 'next/link'
import Image from 'next/image'

import HomeIcon from '../../public/assets/icons/home.svg'
import LogoutIcon from '../../public/assets/icons/logout.svg'
import UserGenericIcon from '../../public/assets/icons/user-generic.svg'
import EditIcon from '../../public/assets/icons/edit.svg'

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
    
    return null;
};
