module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'babel-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: [
      '@testing-library/jest-dom/extend-expect'
    ],
    transformIgnorePatterns: [
      '/node_modules/'
    ],
    testMatch: [
      '<rootDir>/src/**/*.(test|spec).(ts|tsx|js|jsx)'
    ]
  };
  