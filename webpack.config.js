const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('merge-deep')

const baseConfig = {
  mode: process.env.mode || 'development',
  devServer: {
    hot: true,
  },
  externals: [],
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
    ],
    alias: {
      // ... and any other directories you might have
      client: path.resolve(__dirname, 'client'),
      server: path.resolve(__dirname, 'server'),
      components: path.resolve(__dirname, 'client/components'),
      pages: path.resolve(__dirname, 'client/pages'),
    },
  },
}

const clientConfig = {
  entry: './src/index.js',
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  'absoluteRuntime': false,
                  'corejs': 3,
                  'helpers': true,
                  'regenerator': true,
                  'useESModules': false,
                },
              ],
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          // {
          //   loader: "less-loader",
          //   options: {
          //     javascriptEnabled: true
          //   }
          // }
          // 'postcss-loader'
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader?classPrefix',
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'client'),
    ]
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    proxy: {
      '/mongo': 'http://localhost:3080'
    }
  },
  devtool: 'eval-source-map'
}

const serverConfig = {
  entry: [
    './server/main.js',
  ],
  target: 'node',
  resolve: {
    modules: [
      path.resolve(__dirname, 'server'),
    ]
  },
}

module.exports = [
  merge(baseConfig, clientConfig),
  // merge(baseConfig, serverConfig)
]
