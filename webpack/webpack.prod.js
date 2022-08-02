const webpack = require('webpack')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      // в любом файле будет доступ к переменной proccess.env.name со значением test prod
      'process.env.name': JSON.stringify('test prod'),
    }),
    // анализатор размера всех частей проекта
    // new BundleAnalyzerPlugin(),
  ],
}
