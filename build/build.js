'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.conf')

rm(path.join(__dirname, '../lib/index.js'), err => {
  if (err) throw err
})

rm(path.join(__dirname, '../lib/style.min.css'), err => {
  if (err) throw err
})

  webpack(webpackConfig, (err, stats) => {
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

  console.log(chalk.cyan('  Build complete.\n'))
})
