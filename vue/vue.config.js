const { defineConfig, devServer } = require('@vue/cli-service')
const fs = require('fs');
const path = require('path');

module.exports = {
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
}
