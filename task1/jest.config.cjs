/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // --- ADD THIS SECTION FOR COVERAGE TABLE ---
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}', // Include all src files
    '!src/**/*.d.ts',            // Ignore typescript declaration files
    '!src/main.jsx',             // Ignore entry point (optional)
    '!src/vite-env.d.ts',        // Ignore vite env file
  ],
  coverageReporters: [
    "text",  // <--- THIS IS THE ONE THAT MAKES THE TABLE APPEAR IN TERMINAL
    "html"   // This creates the nice website report in /coverage folder
  ],
  // -------------------------------------------

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