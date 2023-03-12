const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.jsx',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.[hash].js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.css'],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: '/node_modules/',
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'public/index.html',
		}),
		new CopyPlugin({
			patterns: [
				{
					from: 'public',
					globOptions: {
						ignore: '**/index.html',
					},
				},
			],
		}),
	],
	devServer: {
		host: 'localhost',
		port: 3000,
		open: true,
		historyApiFallback: true,
		hot: true,
	},
};
