import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill Web APIs
if (typeof global.Request === 'undefined') {
    // Next.js uses undici under the hood
    const { Request, Response, Headers } = require('undici');
    global.Request = Request;
    global.Response = Response;
    global.Headers = Headers;
}

// Mock next-auth to avoid ESM issues with jose/openid-client
jest.mock("next-auth", () => ({
    getServerSession: jest.fn(),
    default: jest.fn(),
}));

// Mock process.env
process.env.ALLOWED_USER_EMAIL = 'chrisjw12345@gmail.com';
process.env.NEXTAUTH_URL = 'http://localhost:3000';
process.env.NEXTAUTH_SECRET = 'test-secret';
