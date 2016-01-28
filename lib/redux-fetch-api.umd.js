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
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.remote = remote;
	exports.endpoint = endpoint;
	exports.fetcher = fetcher;
	
	var _reduxApis = __webpack_require__(1);
	
	var _reduxApis2 = _interopRequireDefault(_reduxApis);
	
	var _isomorphicFetch = __webpack_require__(2);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function remote() {
		var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
		// handle invocation without parentheses: @remote
		if (typeof url != 'string') {
			return remote()(url);
		}
		return function (api) {
			if (typeof api == 'function') {
				api.prototype.fetch = scopedFetcher(url);
			} else {
				api.fetch = scopedFetcher(url).bind(api);
			}
			return api;
		};
	}
	exports.default = remote;
	function endpoint() {
		var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
		var altUrl = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
		var useAlt = arguments.length <= 2 || arguments[2] === undefined ? runningInBrowser() : arguments[2];
	
		// handle invocation without parentheses: @endpoint
		if (typeof url != 'string') {
			return endpoint()(url);
		}
		return function (api) {
			var target = typeof api == 'function' ? api.prototype : api;
			target.__endpoint = useAlt && altUrl || url;
			return api;
		};
	}
	
	function fetcher(fetchFunction) {
		return function (api) {
			var target = typeof api == 'function' ? api.prototype : api;
			target.__fetch = fetchFunction;
			return api;
		};
	}
	
	function scopedFetcher(baseUrl) {
		return function () {
			var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
			var opts = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
			var abs = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	
			if (this.__endpoint) {
				url = abs && url || this.__endpoint + baseUrl + url;
			} else {
				url = !abs && baseUrl ? baseUrl + url : url;
				var p = this;
				while (p = p.__parent) {
					if (p.fetch) {
						return p.fetch(url, opts, abs);
					}
				}
			}
			return this.__fetch ? this.__fetch(url, opts) : (0, _isomorphicFetch2.default)(url, opts);
		};
	}
	
	function runningInBrowser() {
		return (typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' && typeof global === 'undefined';
	}
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