// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// (Optionnel) extensions ou asset plugins personnalisés, si besoin :
// config.resolver.sourceExts.push('cjs');
// config.resolver.assetExts.push('db');

module.exports = config;

