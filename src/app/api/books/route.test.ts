import { GET } from './route';
import { requireAuth } from '@/lib/auth';
import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

jest.mock('@/lib/auth', () => ({
    ...jest.requireActual('@/lib/auth'),
    requireAuth: jest.fn(),
}));
jest.mock('@vercel/blob');

describe('Books API', () => {
    it('should return 401 if unauthorized', async () => {
        (requireAuth as jest.Mock).mockResolvedValue(null);

        const response = await GET();
        expect(response.status).toBe(401);
    });

    it('should return list of blobs if authorized', async () => {
        (requireAuth as jest.Mock).mockResolvedValue({ user: { email: 'chrisjw12345@gmail.com' } });
        const mockBlobs = [{ url: 'http://example.com/book.pdf', pathname: 'book.pdf' }];
        (list as jest.Mock).mockResolvedValue({ blobs: mockBlobs });

        const response = await GET();
        const data = await response.json();

        expect(list).toHaveBeenCalled();
        expect(data).toEqual(mockBlobs);
    });
});
