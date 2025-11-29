import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
    const session = await getServerSession();

    if (!session) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
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
