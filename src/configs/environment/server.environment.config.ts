import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const serverEnvironment = createEnv({
	server: {
		NEXT_AUTH_SECRET: z.string().min(1),
		NEXT_AUTH_URL: z.string().min(1),
	},
	runtimeEnv: {
		NEXT_AUTH_SECRET: process.env.NEXTAUTH_SECRET,
		NEXT_AUTH_URL: process.env.NEXTAUTH_URL,
	},
});
