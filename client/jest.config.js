export const testEnvironment = 'jest-environment-jsdom';
export const setupFilesAfterEnv = ['<rootDir>/jest.setup.js'];
export const moduleNameMapper = {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
};