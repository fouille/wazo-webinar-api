// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const WebpackAutoInject = require('webpack-auto-inject-version-next');
const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';



const config = {
    entry: {
        main: [path.resolve(__dirname, "src", "assets", "js", "main.js")],
        login: [path.resolve(__dirname, "src", "assets", "js", "login.js")],
        app: [path.resolve(__dirname, "src", "assets", "js", "app.js")]
    },
    devServer: {
        host: 'localhost',
        historyApiFallback: true,
        port: "3000",
        hot: true,
        open: {
            target : '',
            app: {
                name: 'Opera',
                arguments: ['--incognito', '--new-window'],
              },
        },
        proxy: {
            '/app': 'http://localhost:3000',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
            filename: "index.html",
            chunks: ["main"],
            inject: "body"
        }),
        //page accueil messagerie
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "app", "index.html"),
            filename: "app/index.html",
            chunks: ["app"],
            inject: "body"
        }),
        new CopyPlugin({
            patterns: [
              {
                from: "./src/LICENSE.md",
                to: "./",
              }
            ],
        }),
        new CopyPlugin({
            patterns: [
              {
                from: "./src/LICENSE.md",
                from: "./src/assets", 
                to: "assets",
                globOptions: {
                    dot: true,
                    gitignore: true
                }
              }
            ],
        }),
        new WebpackAutoInject({
            components: {
                AutoIncreaseVersion: true,
                InjectAsComment: false,
                InjectByTag: true
            },
            componentsOptions: {
                InjectByTag: {
                    fileRegex: /\.+/,
                    // regexp to find [AIV] tag inside html, if you tag contains unallowed characters you can adjust the regex
                    // but also you can change [AIV] tag to anything you want
                    AIVTagRegexp: /(\[AIV])(([a-zA-Z{} ,:;!()_@\-"'\\\/])+)(\[\/AIV])/g,
                    dateFormat: 'yyyy'
                }
            }
        })
    ],
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "./assets/js/[name].[contenthash].js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            }
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        config.plugins.push(new MiniCssExtractPlugin());
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
