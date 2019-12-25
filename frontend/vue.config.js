module.exports = {
  //基本路径
  //baseUrl: './',//vue-cli3.3以下版本使用
  //publicPath:'./',//vue-cli3.3+新版本使用
  publicPath: process.env.NODE_ENV === "production" ? "/heater/" : "/",
  // assetsDir: './', //本地打开index.html访问静态资源
  // 输出文件目录
  outputDir: 'heater',
  // webpack-dev-server 相关配置
  devServer: {
    port: 8080,
  },
  configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'views': '@/views',
            }
        }
    }
};


