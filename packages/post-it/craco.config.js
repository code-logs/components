module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
        ({ constructor }) => constructor?.name !== 'ModuleScopePlugin'
      )
      return webpackConfig
    },
  },
}
