const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

// Get the default Expo Metro configuration
const defaultConfig = getDefaultConfig(__dirname);

// Merge with custom settings
const config = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    assetExts: [...defaultConfig.resolver.assetExts, "glb"],
  },
};

// Apply NativeWind configuration first, then wrap with Reanimated
module.exports = wrapWithReanimatedMetroConfig(
  withNativeWind(config, { input: "./app/global.css" })
);
