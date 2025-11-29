import { POST } from './route';
import { requireAuth } from '@/lib/auth';
import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

jest.mock('@/lib/auth', () => ({
    ...jest.requireActual('@/lib/auth'),
    requireAuth: jest.fn(),
}));
jest.mock('@vercel/blob/client');

describe('Upload API', () => {
    it('should return 401 if unauthorized', async () => {
        (requireAuth as jest.Mock).mockResolvedValue(null);

        const request = new Request('http://localhost/api/upload', {
            method: 'POST',
            body: JSON.stringify({})
        });

        const response = await POST(request);
        expect(response.status).toBe(401);
    });

    it('should call handleUpload if authorized', async () => {
        (requireAuth as jest.Mock).mockResolvedValue({ user: { email: 'chrisjw12345@gmail.com' } });
        (handleUpload as jest.Mock).mockResolvedValue(NextResponse.json({ token: '123' }));

        const request = new Request('http://localhost/api/upload', {
            method: 'POST',
            body: JSON.stringify({})
        });

        const response = await POST(request);
        expect(handleUpload).toHaveBeenCalled();
        expect(response.status).toBe(200);
    });
});
