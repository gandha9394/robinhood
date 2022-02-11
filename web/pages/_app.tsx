import "../styles/globals.css";
import "../styles/Setu/SetuFonts.css";
import Head from 'next/head'
import type { AppProps } from "next/app";
import { ThemeProvider } from "fictoan-react";
import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import Loader from "../components/Loader/Loader";
import { getSession, signIn } from "next-auth/client";
import { GlobalLightStyles, SetuLightTheme } from "../styles";
import {Sidebar}  from "../components/Sidebar/Sidebar";
import { DefaultSession } from "next-auth";

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState<DefaultSession>();
    const router = useRouter()
    useEffect(() => {
        const start = () => {
            setLoading(true);
        };
        const end = () => {
            setLoading(false);
        };
        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);
        return () => {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        };
    }, []);
    const paths = ["/[preview]","/callback"]
    useEffect(() => {
        getSession().then((res) => {
            if(!res){
                signIn()
            }
            else{
                console.log(res)
                setSession(res || undefined);
                console.log("again",res)
            }
        });
    }, []);
    
    return <>
            <Head>
                <title>SETU</title>
                <link rel="icon" href="/setu-icon.png"></link>
            </Head>
            <ThemeProvider theme={SetuLightTheme}>
                <GlobalLightStyles/>
                {paths.includes(router.pathname)?(<Component {...pageProps}/>):(
                    <>
                        {session && <Sidebar/>}
                        {
                            loading ? (
                                <Loader />
                            ) : (
                                session && (
                                    <Component {...pageProps} session={session} />
                                )
                            )
                        }
                    </>
                )}
            </ThemeProvider>
        </>
}
export default MyApp;
