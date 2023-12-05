module.exports = (api) => {
  api.cache.forever();
  return {
    presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
    plugins: ['@babel/plugin-transform-class-properties', '@babel/plugin-transform-object-rest-spread'],
  };
};
