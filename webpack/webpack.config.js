const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

// в envVars объект попадает переменная из скрипта start package.json
module.exports = (envVars) => {
  const { env } = envVars
  const envConfig = require(`./webpack.${env}.js`)
  const config = merge(commonConfig, envConfig)
  return config
}
