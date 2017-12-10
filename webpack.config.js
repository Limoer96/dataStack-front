const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
// const SOURCE_PATH = path.resolve(__dirname, 'src'); 
const BUILD_PATH = path.resolve(__dirname, 'build');
const antdCSS = new ExtractTextPlugin('[name]-antd.css');
const normalCSS = new ExtractTextPlugin('[name]-normal.css');

module.exports = {
	entry: path.join(ROOT_PATH, 'index.js'),
	output: {
		path: BUILD_PATH,
		filename: '[name].bundle.js'
	},
	devServer: {
		contentBase: './build',
		historyApiFallback: true,
		inline: true
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: require.resolve('babel-loader'),
				options: {
					plugins: [
						['import', {libraryName: 'antd', style: 'css'}],
					],
					cacheDirectory: true
				}
			},
			{
				test: /\.css$/,
				include: /node_modules/,
				loader: antdCSS.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
						options: { modules: false }
					}]
				})
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: normalCSS.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
						options: { 
							modules: true,
							localIndentName: '[local]--[hash:base64:5]' 
						}
					}]
				})
			},
			{
        test: /\.(jpg|png|gif|jpeg)$/,
        use: 'file-loader'
      }
		]
	},
	plugins: [
		antdCSS,
		normalCSS,
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
      minChunks: (module) => module.context && module.context.indexOf('node_modules') !== -1
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest'
		})
	]
}