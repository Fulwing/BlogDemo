import NextAuth from "next-auth"
import authConfig from "./auth.config"

export const middleware = NextAuth(authConfig).auth

export const config = {
 matcher: ["/protected(.*)"],
}