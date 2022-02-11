import NextAuth from "next-auth";
// @ts-ignore
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: "464973418640-50e10nefs5mc8m4ucfpcq96539ju94hc.apps.googleusercontent.com",
            clientSecret: "6jH9QE2KxX9WI3jy02YfYwsb"
        })
        // ...add more providers here
    ]
});
