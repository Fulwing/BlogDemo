import type { NextAuthConfig } from "next-auth"

export default {
 providers: [],
 callbacks: {
   authorized({ auth, request: { nextUrl } }) {
     const isLoggedIn = !!auth?.user
     const isOnProtectedRoute = nextUrl.pathname.startsWith('/protected')
     if (isOnProtectedRoute) {
       if (isLoggedIn) return true
       return false
     } else if (isLoggedIn) {
       return true
     }
     return true
   },
 },
} satisfies NextAuthConfig