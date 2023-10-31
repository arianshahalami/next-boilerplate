"use client"

import {useSession} from "next-auth/react";
import {clientFetch} from "@/configs/axios/axios.config";

function HomePage() {
    const session = useSession()

    clientFetch.get("api/users/2").then(res => console.log(res))

    console.log(session);
    return (
        session ? <div>{session.data?.user?.token}</div> : "unauth"
    );
}

export default HomePage;
