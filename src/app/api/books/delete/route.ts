import { del } from '@vercel/blob';
import Redis from 'ioredis';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";

const getRedisClient = () => {
    if (!process.env.REDIS_URL) {
        throw new Error("REDIS_URL is not defined");
    }
    return new Redis(process.env.REDIS_URL);
};

export async function DELETE(request: Request) {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const url = searchParams.get('url');
        const pathname = searchParams.get('pathname');

        if (!url || !pathname) {
            return NextResponse.json({ error: 'URL and pathname required' }, { status: 400 });
        }

        // 1. Delete from Vercel Blob
        await del(url);

        // 2. Delete progress from Redis
        // We need the book name to construct the key. 
        // The pathname usually looks like "books/my-book.pdf", so we extract the filename.
        const bookName = pathname.split('/').pop() || pathname;

        const redis = getRedisClient();
        const key = `progress:${session.user.email}:${bookName}`;
        await redis.del(key);
        redis.quit();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete API Error:", error);
        return NextResponse.json({ error: 'Failed to delete book', details: (error as Error).message }, { status: 500 });
    }
}
