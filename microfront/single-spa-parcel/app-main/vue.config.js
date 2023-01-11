module.exports = {
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      allowedHosts: ['http://172.31.11.4']
    }
  },
}