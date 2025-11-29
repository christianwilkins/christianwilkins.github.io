import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function requireAuth() {
    const session = await getServerSession();
    const userEmail = session?.user?.email;
    const allowedEmail = process.env.ALLOWED_USER_EMAIL;

    if (!userEmail || !allowedEmail || userEmail !== allowedEmail) {
        return null;
    }

    return session;
}

export function unauthorizedResponse() {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
