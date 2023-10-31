import {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import {clientEnvironment} from "@/configs";


export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {label: "نام کاربری", type: "text"},
                password: {label: "پسورد", type: "password"},
            },
            async authorize(credentials) {
                if (credentials) {
                    const response = await fetch(
                        ` ${clientEnvironment.NEXT_PUBLIC_BASE_URL}/api/login`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: "eve.holt@reqres.in",
                                password: "cityslicka"
                            }),
                        },
                    );

                    if (response.ok) {
                        const body = await response.json();
                        return {
                            token: "ali",
                            refToken: "reza",
                            expireDate: "132"
                        };
                    }
                    return null;
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async jwt({token, user, account}) {
            console.log({account});

            return {...token, ...user};
        },
        async session({session, token, user}) {

            console.log({session})
            session.user = token as any;

            return session;
        },
    },
};
