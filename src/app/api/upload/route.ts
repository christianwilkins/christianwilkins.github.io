```typescript
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { requireAuth, unauthorizedResponse } from '@/lib/auth';

export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.json()) as HandleUploadBody;

    try {
        const session = await requireAuth();
        if (!session) {
            return unauthorizedResponse();
        }

        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (pathname, clientPayload) => {
                // Optional: Can add more validation here
                return {
                    allowedContentTypes: ['application/pdf', 'application/epub+zip'],
                    tokenPayload: JSON.stringify({
                        // optional payload
                    }),
                };
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                // Optional: Log upload or update database
                console.log('blob uploaded', blob.url);
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 400 }, // The webhook will retry 5 times automatically
        );
    }
}
