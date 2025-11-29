import { requireAuth } from './auth';
import { getServerSession } from "next-auth";

jest.mock("next-auth");

describe('requireAuth', () => {
    it('should return null if no session exists', async () => {
        (getServerSession as jest.Mock).mockResolvedValue(null);
        const result = await requireAuth();
        expect(result).toBeNull();
    });

    it('should return null if user email does not match allowed email', async () => {
        (getServerSession as jest.Mock).mockResolvedValue({
            user: { email: 'wrong@example.com' }
        });
        const result = await requireAuth();
        expect(result).toBeNull();
    });

    it('should return session if user email matches allowed email', async () => {
        const mockSession = {
            user: { email: 'chrisjw12345@gmail.com' }
        };
        (getServerSession as jest.Mock).mockResolvedValue(mockSession);
        const result = await requireAuth();
        expect(result).toEqual(mockSession);
    });
});
