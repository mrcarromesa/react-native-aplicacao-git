module.exports = {
  preset: '@testing-library/react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|react-navigation-tabs' +
      '|react-native-splash-screen' +
      '|react-native-screens' +
      '|react-native-reanimated' +
      '|react-native-vector-icons' +
      '|react-native-gesture-handler' +
      '|@react-native-community' +
      '|@react-navigation' +
      '|@react-navigation/stack' +
      '|react-native-iphone-x-helper' +
      ')/)',
  ],
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    // '@testing-library/react-native',
    '@testing-library/jest-native',
    './__mocks__/useNavigation.setup.js',
    './__mocks__/async.storage.setup.js',
  ],
  collectCoverageFrom: [
    'src/pages/**',
    'src/routes.js',
    '!src/pages/**/styles.js',
    '!src/services/api.js',
    '!src/config/ReactotronConfig.js',
  ],
  coverageDirectory: '__tests__/covarage',
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.test.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
