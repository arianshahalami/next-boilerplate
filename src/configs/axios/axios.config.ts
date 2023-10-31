import axios from "axios";

import {clientEnvironment} from "@/configs";
import {getSession} from "next-auth/react";

export const clientFetch = axios.create({
    baseURL: clientEnvironment.NEXT_PUBLIC_BASE_URL,
});


clientFetch.interceptors.request.use(
    async (config) => {
        if (!config.headers["Authorization"]) {
            if (window) {
                const session = await getSession()
                console.log("client-session", session);
                if (session) {
                    config.headers['Authorization'] = `Bearer ${session.user?.name}`;
                }
            } else {
                const {req} = config;
                if (req && req.session) {
                    const session = req.session;
                    console.log("server-session", session);
                }
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// const responseIntercept = axiosAuth.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const prevRequest = error?.config;
//         if (error?.response?.status === 401 && !prevRequest?.sent) {
//             prevRequest.sent = true;
//             await refreshToken();
//             prevRequest.headers["Authorization"] = `Bearer ${session?.user.accessToken}`;
//             return axiosAuth(prevRequest);
//         }
//         return Promise.reject(error);
//     }
// );
