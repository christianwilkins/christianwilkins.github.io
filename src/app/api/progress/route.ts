import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const bookName = searchParams.get('book');

    if (!bookName) {
        return NextResponse.json({ error: 'Book name required' }, { status: 400 });
    }

    try {
        const key = `progress:${session.user.email}:${bookName}`;
        const progress = await kv.get(key);
        return NextResponse.json(progress || {});
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { bookName, location } = body;

        if (!bookName || location === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const key = `progress:${session.user.email}:${bookName}`;
        const data = {
            location,
            lastRead: new Date().toISOString(),
        };

        await kv.set(key, data);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 });
    }
}
