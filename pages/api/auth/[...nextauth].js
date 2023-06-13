import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // ...add more providers here
    ],

    // theme: {
    //     logo: "https://links.papareact.com/sq0",
    //     brandColor: "#5e33ff",
    //     colorScheme: "auto",
    // }
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        // modify the session callback to provide more information about the user so we can use in MiniProfile
        async session({ session, token, user }) {
            session.user.username = session.user.name.split(" ").join("").toLowerCase()

            session.user.uid = token.sub;
            return session;
        }
    }
}

export default NextAuth(authOptions)