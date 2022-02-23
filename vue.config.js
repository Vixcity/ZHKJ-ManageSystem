let TARGET
if (process.env.NODE_ENV === 'development') {
  // 正式环境
  // TARGET = 'https://api.zwyknit.com'
  // 测试环境(失效)
  // TARGET = 'https://api.tlkrzf.com'
  // 本地环境
  TARGET = 'https://admin_beta.zwyknit.com'
} else {
  // 正式环境
  TARGET = 'https://admin_api.zwyknit.com'
  // 测试环境
  // TARGET = 'https://beta.zwyknit.com'
}
module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8081,
    https: false,
    proxy: {
      '/api': {
        target: TARGET, // 对应自己的接口
        changeOrigin: true,
        ws: true
      }
    }
  }
}
