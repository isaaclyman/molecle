module.exports = {
  publicPath: '/sootly/',
  outputDir: 'docs',
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.module
      .rule('raw')
      .test(/\.txt$/i)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  },
}
