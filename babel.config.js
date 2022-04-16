module.exports = function(api) {
  api.cache(true);
  return {
    plugins: [
      "@emotion",
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blacklist": null,
        "whitelist": null,
        "safe": false,
        "allowUndefined": false
      }]
    ],
    presets: ['babel-preset-expo'],
  };
};
