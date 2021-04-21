const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env, argv) => ({
  context: path.resolve(__dirname, './src'),
  entry: {
    // index: './index.jsx'
    index: ['./index.jsx']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './js/[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? '/Webpack-React/'
      : '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  },
  devServer: {
    compress: true,
    port: 8080,
  },
  mode: env.production ? "production" : "development",
  plugins: [
    new HtmlWebpackPlugin({
      title: '網頁title',
      filename: 'index.html',
      template: 'html/template.html',
      description: '網頁描述',
      chunks: ['vendor', 'index'],
      inject: 'body',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "assets", to: "assets" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/transform-runtime'
            ]
          }
        }
      },
      // {
      //   test: /\.(scss|sass)$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: 'style-loader',
      //       options: {
      //         injectType: 'linkTag'
      //       }
      //     },
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: './css/[name].css'
      //       }
      //     },
      //     // {
      //     //   loader: 'css-loader'
      //     // },
      //     {
      //       loader: 'postcss-loader'
      //     },
      //     {
      //       loader: 'sass-loader'
      //     },

      //   ]

      // },

      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },

            // loader: 'url-loader',
            // options: {
            //   limit: 500000,
            //   name: '[path][name].[ext]?[hash:8]'
            // }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          },

        ]
      },
    ]
  },
});

