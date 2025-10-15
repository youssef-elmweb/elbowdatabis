// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    // Empêche le preset d’injecter l’ancien plugin Reanimated
    presets: [['babel-preset-expo', { reanimated: false }]],
    // Utiliser UNIQUEMENT le plugin Worklets (nouveau)
    plugins: ['react-native-worklets/plugin'],
  };
};


