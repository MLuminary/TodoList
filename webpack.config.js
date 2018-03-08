//webpack 打包
const path = require('path')

module.exports = {
  //入口文件
  entry : path.join(__dirname, 'src/index.js'),
  //出口文件
  output: {
    filename : 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  //webpack 默认只能打包.js 其它后缀的文件需要自行定义
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.styl$/,
        use:[
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader:'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  }
}