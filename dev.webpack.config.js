var cfg = require('./webpack.config.js');

delete cfg.externals;

module.exports = cfg;
