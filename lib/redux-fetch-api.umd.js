(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("redux-apis"), require("isomorphic-fetch"));
	else if(typeof define === 'function' && define.amd)
		define(["redux-apis", "isomorphic-fetch"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("redux-apis"), require("isomorphic-fetch")) : factory(root["redux-apis"], root["isomorphic-fetch"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.remote = remote;
	
	var _reduxApis = __webpack_require__(1);
	
	var _reduxApis2 = _interopRequireDefault(_reduxApis);
	
	var _isomorphicFetch = __webpack_require__(2);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function isOnClient() {
		return typeof global === 'undefined';
	}
	
	function remote() {
		var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
		var clientUrl = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
		var onClient = arguments.length <= 2 || arguments[2] === undefined ? isOnClient() : arguments[2];
	
		if (arguments.length === 1 && typeof url == 'function') {
			// invocation without parentheses: @remote
			return remote()(url);
		}
		return function (component) {
			component.prototype.fetch = function scoped_fetch(url, opts) {
				var abs = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	
				url = !abs && this.fetch.url ? this.fetch.url + url : url;
				var r = undefined,
				    p = this;
				while (p = p.__parent) {
					if (p.fetch) {
						r = p;
						break;
					}
				}
				return !abs && r ? r.fetch(url, opts, abs) : (0, _isomorphicFetch2.default)(url, opts);
			};
			component.prototype.fetch.url = clientUrl && onClient ? clientUrl : url;
			return component;
		};
	}
	
	exports.default = remote;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("redux-apis");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ }
/******/ ])
});
;
//# sourceMappingURL=redux-fetch-api.umd.js.map