const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSvgPlugin = require('html-webpack-inline-svg-plugin');

const svgoConfig = {
  plugins: [
    'removeXMLProcInst',
    'removeXMLNS'
  ]
};

const paths = {
  basedir: path.resolve(__dirname, '..')
};

module.exports = {
  context: paths.basedir,
  cache: true,

  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(paths.basedir, './static'),
    compress: true,
    port: 8080
  },

  entry: {
    'alternative-stats': './alternative-stats/index.js'
  },

  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(paths.basedir, './dist'),
    publicPath: ''
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'alternative-stats': path.resolve(paths.basedir, './alternative-stats')
    }
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['env', {
		    targets: {
              browsers: ['> 1%', 'last 2 versions', 'ios_saf >= 9.3.2', 'ie >= 10']
			}	
		  }]],
		  plugins: ['transform-runtime', 'transform-object-rest-spread'],
          cacheDirectory: true
        }
      }]
    }, {
      test: /\.ya?ml/,
      loader: 'json-loader!yaml-loader'
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          scss: 'vue-style-loader!raw-loader!sass-loader'
        }
      }
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'raw-loader'
      }, {
        loader: 'sass-loader',
        options: { sourceMap: true }
      }]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: [{
        loader: 'file-loader'
      }, {
        loader: 'image-webpack-loader',
        options: {
          svgo: svgoConfig
        }
      }]
    }, {
      test: /\.pug$/,
      loader: 'pug-loader'
    }] // end of module.rules
  }, // end of module

  plugins: [
    new CopyWebpackPlugin([
      { context: 'static', from: '**/*', to: '.' }
    ]),

    new HtmlWebpackPlugin({
      template: './alternative-stats/index.pug',
      filename: 'index.html',
      inject: false,
      svgoConfig: svgoConfig
    }),

    new HtmlWebpackInlineSvgPlugin()
  ]
};
