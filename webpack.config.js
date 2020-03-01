// const path = require("path");
const autoPrefixer = require("autoprefixer");
const htmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "bundle.js",
//     publicPath: ""
//   },
//   devtool:
//     this.mode === "development" ? "cheap-module-eval-source-map" : "none",
//   watch: this.mode === "development" ? true : false,
//   watchOptions: {
//     ignored: /node_modules/
//   },
//   devServer: {
//     historyApiFallback: true,
//     contentBase: "./",
//     hot: true
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         loader: "babel-loader",
//         exclude: /node_modules/,
//         options: {
//           plugins: [["import", { libraryName: "antd", style: true }]]
//         }
//       },
//       {
//         test: /\.css$/,
//         exclude: /node_modules/,
//         use: [
//           { loader: "style-loader" },
//           {
//             loader: "css-loader",
//             options: {
//               importLoaders: 1,
//               modules: {
//                 localIdentName: "[name]__[local]__[hash:base64:5]"
//               }
//             }
//           },
//           {
//             loader: "postcss-loader",
//             options: {
//               ident: "postcss",
//               plugins: () => [autoPrefixer()]
//             }
//           }
//         ]
//       },

//       // {
//       //   test: /\.(scss)$/,
//       //   use: [
//       //     {
//       //       loader: "style-loader" // inject CSS to page
//       //     },
//       //     {
//       //       loader: "css-loader" // translates CSS into CommonJS modules
//       //     },
//       //     {
//       //       loader: "postcss-loader", // Run postcss actions
//       //       options: {
//       //         plugins: function() {
//       //           // postcss plugins, can be exported to postcss.config.js
//       //           return [require("autoprefixer")];
//       //         }
//       //       }
//       //     },
//       //     {
//       //       loader: "sass-loader" // compiles Sass to CSS
//       //     }
//       //   ]
//       // },
//       // {
//       //   test: /\.css$/,
//       //   use: [
//       //     "style-loader",
//       //     {
//       //       loader: "css-loader",
//       //       options: {
//       //         importLoaders: 1,
//       //         modules: {
//       //           localIdentName: "[name]__[local]__[hash:base64:5]"
//       //         }
//       //       }
//       //     }
//       //   ]
//       // },
//       {
//         test: /\.(png|jpe?g|gif)$/,
//         loader: "url-loader?limit=8000&name=images/[name].[ext]"
//       }
//     ]
//   },
//   plugins: [
//     new htmlWebpackPlugin({
//       template: __dirname + "/src/index.html",
//       filename: "index.html",
//       inject: "body"
//     })
//   ]
// };

const path = require("path");
const fs = require("fs");

const lessToJs = require("less-vars-to-js");
const themeVariables = lessToJs(
  fs.readFileSync(path.join(__dirname, "./src/ant-theme-vars.less"), "utf8")
);

// lessToJs does not support @icon-url: "some-string", so we are manually adding it to the produced themeVariables js object here
themeVariables["@icon-url"] = "'http://localhost:8080/fonts/iconfont'";

module.exports = {
  devtool:
    this.mode === "development" ? "cheap-module-eval-source-map" : "none",
  watch: this.mode === "development" ? true : false,
  watchOptions: {
    ignored: /node_modules/
  },
  devServer: {
    historyApiFallback: true,
    contentBase: "./",
    hot: true
  },
  context: __dirname,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: ""
  },
  resolve: {
    modules: ["src", "node_modules"]
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        exclude: /node_modules/,
        test: /\.js$/,
        options: {
          presets: [
            [
              "@babel/preset-env",
              { modules: false, targets: { browsers: ["last 2 versions"] } }
            ],
            "@babel/preset-react"
          ],
          cacheDirectory: true,
          plugins: [
            ["import", { libraryName: "antd", style: true }]
            // 'transform-strict-mode',
            // 'transform-object-rest-spread'
          ]
        }
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader",
            options: {
              modifyVars: themeVariables,
              root: path.resolve(__dirname, "./"),
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:5]"
              }
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [autoPrefixer()]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: __dirname + "/src/index.html",
      filename: "index.html",
      inject: "body"
    })
  ]
};
