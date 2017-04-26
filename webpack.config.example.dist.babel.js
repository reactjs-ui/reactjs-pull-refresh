import path from 'path';
import webpack from 'webpack';
import HtmlwebpackPlugin from 'html-webpack-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

const appPath = path.resolve(__dirname, 'examples');

const webpackConfig = {
  devtool: 'source-map', //生成 source map文件
  resolve: {
    //自动扩展文件后缀名
    extensions: ['.js', '.jsx', '.css', '.json']
  },

  // 入口文件 让webpack用哪个文件作为项目的入口
  entry: {
    index: ['./examples/index.js'],
    simple: ['./examples/simple.js']
  },

  // 出口 让webpack把处理完成的文件放在哪里
  output: {
    path: path.resolve(__dirname, 'examples-dist'), //打包输出目录
    filename: '[name].[hash].bundle.js', //文件名称
    publicPath: './' //资源路径
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!postcss-loader?pack=cleaner!sass-loader?outputStyle=expanded'
      }
    ]
  },

  plugins: [
    //http://dev.topheman.com/make-your-react-production-minified-version-with-webpack/
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    // 相当于命令参数 --optimize-minimize
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      },
      mangle: {
        except: [] // 设置不混淆变量名
      }
    }),
    //用来优化生成的代码 chunk,合并相同的代码
    new webpack.optimize.AggressiveMergingPlugin(),
    //用来保证编译过程不出错
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
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

export default webpackConfig;
