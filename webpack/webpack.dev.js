const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // при изменении какой то части в компоненте(поменяли текст или стили) срабатывает перезагрузки страницы, данные плагин, помогает обновить только те данные которые поменялись но не тронуть то что не изменилось так комфортнее работать в dev режиме
    new webpack.DefinePlugin({
      // в любом файле будет доступ к переменной proccess.env.name со значением test dev
      'process.env.name': JSON.stringify('Vishwas'),
    }),
  ],
}
