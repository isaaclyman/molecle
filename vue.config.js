module.exports = {
  publicPath: '/sootly/',
  outputDir: 'docs',
  chainWebpack: (config) => {
    config.module
      .rule('raw')
      .test(/\.txt$/i)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  },
}
