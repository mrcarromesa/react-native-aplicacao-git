module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: './src/',
            rootPathPrefix: '~/',
          },
        ],
      },
    ],
  ],
  /*
  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: './src/',
            rootPathPrefix: '~/',
          },
        ],
      },
    ],
  ],
  env: {
    production: {
      plugins: [
        'babel-plugin-root-import',
        {
          paths: [
            {
              rootPathSuffix: './src/',
              rootPathPrefix: '~/',
            },
          ],
        },
      ],
    },
  },
  */
};
