import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { requireAuth, unauthorizedResponse } from '@/lib/auth';

export async function GET() {
    const session = await requireAuth();
    if (!session) {
        return unauthorizedResponse();
    }

    try {
        const { blobs } = await list();
        return NextResponse.json(blobs);
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 },
        );
    }
}
