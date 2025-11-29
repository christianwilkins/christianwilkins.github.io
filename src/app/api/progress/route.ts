import Redis from 'ioredis';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";

// Create a Redis client instance
// In production (serverless), this might create a new connection per request,
// but ioredis handles this relatively well. For high scale, we'd want a singleton pattern,
// but for this personal library, this is perfectly fine and robust.
const getRedisClient = () => {
    if (!process.env.REDIS_URL) {
        throw new Error("REDIS_URL is not defined");
    }
    return new Redis(process.env.REDIS_URL);
};

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
        const redis = getRedisClient();
        const key = `progress:${session.user.email}:${bookName}`;
        const data = await redis.get(key);

        // ioredis returns null if not found, or the string value
        const progress = data ? JSON.parse(data) : {};

        redis.quit(); // Close connection to prevent leaks in serverless
        return NextResponse.json(progress);
    } catch (error) {
        console.error("Progress API Error:", error);
        return NextResponse.json({ error: 'Failed to fetch progress', details: (error as Error).message }, { status: 500 });
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

        const redis = getRedisClient();
        const key = `progress:${session.user.email}:${bookName}`;
        const data = {
            location,
            lastRead: new Date().toISOString(),
        };

        await redis.set(key, JSON.stringify(data));
        redis.quit(); // Close connection

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Progress API Error:", error);
        return NextResponse.json({ error: 'Failed to save progress', details: (error as Error).message }, { status: 500 });
    }
}
