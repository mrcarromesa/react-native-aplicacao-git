global.dataAsyncStorage = {};

jest.mock('@react-native-community/async-storage', () => ({
  setItem: jest.fn((key, value) => {
    return new Promise((resolve) => {
      global.dataAsyncStorage[key] = value;
      // console.log(global.dataAsyncStorage);
      resolve(null);
    });
  }),
  getItem: jest.fn((key) => {
    return new Promise((resolve) => {
      resolve(global.dataAsyncStorage[key]);
    });
  }),
  removeItem: jest.fn((key) => {
    return new Promise((resolve) => {
      delete global.dataAsyncStorage[key];
      resolve(null);
    });
  }),
}));
