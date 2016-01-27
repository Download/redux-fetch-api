var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
//var node_modules = fs.readdirSync('node_modules');

module.exports = {
	// The base directory (absolute path!) for resolving the entry option.
	// If output.pathinfo is set, the included pathinfo is shortened to this directory.
	context: path.resolve('src'),

	resolve: {
		// IMPORTANT: Setting this option will override the default, meaning
		// that webpack will no longer try to resolve modules using the default
		// extensions. If you want modules that were required with their
		// extension (e.g. require('./somefile.ext')) to be properly resolved,
		// you must include an empty string in your array.
		// Similarly, if you want modules that were required without extensions
		// (e.g. require('underscore')) to be resolved to files with “.js”
		// extensions, you must include ".js" in your array.
		// Default: ["", ".webpack.js", ".web.js", ".js"]
		// https://webpack.github.io/docs/configuration.html#resolve-extensions
		extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
	},

	module: {
		loaders: [
			{
				test: /\.jsx/,
				exclude: /node_modules/,
				loader: 'babel',
			},
		],
		noParse: /\.min\.js/,
	},

	// Specify dependencies that shouldn’t be resolved by webpack, but should become dependencies
	// of the resulting bundle. The kind of the dependency depends on output.libraryTarget.
	externals: function(context, request, callback){
		if ((context.indexOf('node_modules') !== -1) || (request.indexOf('.') !== 0)) {
			callback(null, 'commonjs ' + request);
		}
		else {
			callback();
		}
	},

	devtool: 'source-map',

	devServer: {
		stats: {
			chunks: false,
		}
	}
};
