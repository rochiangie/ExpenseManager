const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    sourceExts: ['jsx', 'js', 'tsx', 'ts'], // Añade las extensiones necesarias
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
