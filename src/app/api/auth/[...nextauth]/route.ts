import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            // Optional: Restrict to specific users if needed
            // const allowedUsers = ["christianwilkins"];
            // return allowedUsers.includes(user.email ?? "");
            return true;
        },
    },
});

export { handler as GET, handler as POST };
