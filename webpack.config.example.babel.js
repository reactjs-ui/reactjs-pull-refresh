import path from 'path';
import webpack from 'webpack';
import HtmlwebpackPlugin from 'html-webpack-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

const ip = 'localhost';
const port = 9090;
const hotDevServer = 'webpack/hot/dev-server';
// https://github.com/webpack/webpack-dev-server
const webpackDevServer = `webpack-dev-server/client?http://${ip}:${port}`;

const appPath = path.resolve(__dirname, 'examples');

const webpackConfig = {
  cache: true,
  devtool: 'source-map', //生成 source map文件
  stats: {
    colors: true,
    reasons: true
  },
  devServer: {
    //指定根目录路径，比如访问 eruda.min.js 时，只需 http://localhost:9090/eruda.min.js 即可
    contentBase: './examples',
    historyApiFallback: true,
    hot: true,
    stats: {
      colors: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    quiet: false, // 设为true，不把任何信息输出到控制台
  },
  resolve: {
    //自动扩展文件后缀名
    extensions: ['.js', '.jsx', '.css']
  },

  // 入口文件 让webpack用哪个文件作为项目的入口
  entry: {
    index: ['./examples/index.js', webpackDevServer, hotDevServer],
    simple: ['./examples/simple.js', webpackDevServer, hotDevServer],
  },

  // 出口 让webpack把处理完成的文件放在哪里
  output: {
    path: path.resolve(__dirname, 'examples/dist'), //打包输出目录
    filename: '[name].[hash].bundle.js', //文件名称
    publicPath: './' //资源路径
  },

  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader?pack=cleaner'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!postcss-loader?pack=cleaner!sass-loader?outputStyle=expanded'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热部署替换模块
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        // eslint 配置
        eslint: {
          emitError: true, // 验证失败，终止
          configFile: '.eslintrc'
        },
        postcss () {
          return {
            defaults: [precss, autoprefixer],
            cleaner: [autoprefixer({
              flexbox: 'no-2009',
              browsers: ['Chrome >= 35', 'Firefox >= 38', 'Edge >= 12',
                'Explorer >= 8', 'Android >= 4.3', 'iOS >=8', 'Safari >= 8']
            })]
          };
        },
      }
    })
  ]
};

//创建 HtmlWebpackPlugin 的实例
// https://www.npmjs.com/package/html-webpack-plugin
const {entry} = webpackConfig;

// 为 HtmlwebpackPlugin 设置配置项，与 entry 键对应，根据需要设置其参数值
const htmlwebpackPluginConfig = {
  index: {
    title: 'React Pull Refresh 例子列表'
  },
  simple: {
    title: '基本用法'
  }
};

for (const key in entry) {
  if (entry.hasOwnProperty(key) && key !== 'vendors') {
    webpackConfig.plugins.push(
      new HtmlwebpackPlugin({
        title: htmlwebpackPluginConfig[key].title,
        template: path.resolve(appPath, 'templates/layout.html'),
        filename: `${key}.html`,
        //chunks这个参数告诉插件要引用entry里面的哪几个入口
        chunks: [key, 'vendors'],
        //要把script插入到标签里
        inject: 'body'
      })
    );
  }
}

export default {
  webpackConfig,
  ip,
  port
};
