import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            const allowedEmail = process.env.ALLOWED_USER_EMAIL;
            if (!allowedEmail) return false; // Fail safe if env var is missing
            return user.email === allowedEmail;
        },
    },
});

export { handler as GET, handler as POST };
