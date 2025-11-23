/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      'babel-jest',
      { rootMode: 'upward' }
    ]
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/test/__mocks__/fileMock.js'
  },
  testMatch: ['<rootDir>/src/**/*.(test|spec).(js|jsx|ts|tsx)'],
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx']
};

// The central configuration for the Jest test runner.
// This file tells Jest how to behave. It orchestrates the environment, file transformations, and setup