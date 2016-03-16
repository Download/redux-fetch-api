(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
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
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.remote = remote;
	exports.endpoint = endpoint;
	exports.fetcher = fetcher;
	var isomorphicFetch = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' && window.fetch || global.fetch;
	
	function remote() {
		var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
		// handle invocation without parentheses: @remote
		if (typeof url != 'string') {
			return remote()(url);
		}
		return function (api) {
			if (typeof api == 'function') {
				Object.defineProperty(api.prototype, 'fetch', { value: scopedFetcher(url) });
			} else {
				Object.defineProperty(api, 'fetch', { value: scopedFetcher(url).bind(api) });
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
			Object.defineProperty(target, '__endpoint', { value: useAlt && altUrl || url });
			return api;
		};
	}
	
	function fetcher(fetchFunction) {
		return function (api) {
			var target = typeof api == 'function' ? api.prototype : api;
			Object.defineProperty(target, '__fetch', { value: fetchFunction });
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
			return this.__fetch ? this.__fetch(url, opts) : isomorphicFetch(url, opts);
		};
	}
	
	function runningInBrowser() {
		return (typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' && typeof global === 'undefined';
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ])
});
;
//# sourceMappingURL=redux-fetch-api.umd.js.map