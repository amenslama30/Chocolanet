const { defineConfig, devServer } = require('@vue/cli-service')
const fs = require('fs');
const path = require('path');

module.exports = {
  transpileDependencies: true,
  devServer: {
    allowedHosts: 'all',
    https: true, // Activer HTTPS en développement
  }
}
