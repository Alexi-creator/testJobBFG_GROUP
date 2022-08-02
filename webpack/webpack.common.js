const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            // транспилирует tsx jsx файлы блогадаря лоудеру babel
            loader: 'babel-loader',
          },
        ],
      },
      {
        // для модульных изолированных стилей с хешем
        test: /\.module\.s(a|c)ss$/,
        // сначала sass/scss преобразуется в css, затем css в js, и потом подключение в html в теге style
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                // настройка для итогово названия класса (помимо уникального хэша есть название компонента и класса который задали)
                localIdentName: '[name]__[local]__[sha1:hash:hex:7]',
              },
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        // для глобальных стилей не модульных чтобы имена классов не менялись
        test: /^((?!\.module).)*s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, // более лучший варинат чем style-loader т.к. стили будут в link сразу не будет сайт без стилей какое время т.к. style-loader подключает в теги <style> когда обработается js а это долго может быть
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: '[chunkhash].js',
    clean: true,
    assetModuleFilename: 'assets/images/[name][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html'),
    }),
    new MiniCssExtractPlugin(),
    // new CopyPlugin({
    //   patterns: [{ from: 'source', to: 'dest' }],
    // }),
  ],
  stats: 'errors-only',
}
