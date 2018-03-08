//webpack 打包
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
//获取package.json 中定义的 env NODE.ENV的变量
const isDev = process.env.NODE.ENV === 'development'

const config = {
  //编译目标
  target: 'web',
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
        test: /\.jsx$/,
        loader: 'babel-loader'
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
          {
            loader:'postcss-loader',
            options:{
              sourceMap:true
            }
          },
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
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV : isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]
}

//如果是开发环境
if (isDev){
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    //使页面局部刷新
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config;