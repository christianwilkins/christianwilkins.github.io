const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/src/app/api/',
        '<rootDir>/src/lib/auth.test.ts',
        '<rootDir>/tests/playwright/',
    ],
}

module.exports = customJestConfig
