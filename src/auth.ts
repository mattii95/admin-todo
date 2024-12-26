import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/prisma"
import { signEmailPassword } from "./app/auth/actions/auth-actions"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google, GitHub, Credentials({
        credentials: {
            email: { label: "Email", type: "email", placeholder: "correo@correo.com" },
            password: { label: "Contraseña", type: "password" },
        },
        authorize: async (credentials) => {
            const user = await  signEmailPassword(credentials!.email, credentials!.password)

            if (!user) {
                // No user found, so this is their first attempt to login
                // Optionally, this is also the place you could do a user registration
                throw new Error("Invalid credentials.")
            }

            // return user object with their profile data
            return user
        },
    })],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {

            return true
        },
        async jwt({ token, user, account, profile }) {
            const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } })

            if (dbUser?.isActive === false) {
                throw Error('El usuario no esta activo')
            }

            token.roles = dbUser?.roles ?? ['no-roles']
            token.id = dbUser?.id ?? 'no-id'
            return token
        },
        async session({ session, token, user }) {
            if (session && session.user) {
                session.user.roles = token.roles
                session.user.id = token.id
            }
            return session
        }
    }
})