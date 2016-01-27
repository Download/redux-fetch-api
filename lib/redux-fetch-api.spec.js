/******/ (function(modules) { // webpackBootstrap
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

	'use strict';
	
	var _chai = __webpack_require__(1);
	
	var _reduxApis = __webpack_require__(2);
	
	var _reduxFetchApi = __webpack_require__(3);
	
	var _reduxFetchApi2 = _interopRequireDefault(_reduxFetchApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function fetch(url, opts) {
		console.log('fetch(', url, opts ? ', ' : '', opts ? opts : '');
	}
	
	describe('@remote(url=\'\', clientUrl=null, onClient=isOnClient())', function () {
		it('is a decorator function', function () {
			var _dec, _class;
	
			(0, _chai.expect)(_reduxFetchApi2.default).to.be.a('function');
			var Test = (_dec = (0, _reduxFetchApi2.default)('/test'), _dec(_class = function Test() {
				_classCallCheck(this, Test);
			}) || _class);
	
			(0, _chai.expect)(Test).to.be.a('function');
		});
	
		it('decorates the target component with a `fetch` method', function () {
			var _class2;
	
			var Test = (0, _reduxFetchApi2.default)(_class2 = function Test() {
				_classCallCheck(this, Test);
			}) || _class2;
	
			var test = new Test();
			(0, _chai.expect)(test).to.have.a.property('fetch');
			(0, _chai.expect)(test.fetch).to.be.a('function');
		});
	
		it('adds `url` as a property on the added `fetch` method', function () {
			var _dec2, _class3;
	
			var Test = (_dec2 = (0, _reduxFetchApi2.default)('/test'), _dec2(_class3 = function Test() {
				_classCallCheck(this, Test);
			}) || _class3);
	
			var test = new Test();
			(0, _chai.expect)(test.fetch).to.have.a.property('url');
			(0, _chai.expect)(test.fetch.url).to.equal('/test');
		});
	
		it('uses either the `url` or `clientUrl` based on the `onClient` flag', function () {
			var _dec3, _class4, _dec4, _class5;
	
			var Test1 = (_dec3 = (0, _reduxFetchApi2.default)('/server', '/client', false), _dec3(_class4 = function Test1() {
				_classCallCheck(this, Test1);
			}) || _class4);
	
			var test1 = new Test1();
			(0, _chai.expect)(test1.fetch.url).to.equal('/server');
			var Test2 = (_dec4 = (0, _reduxFetchApi2.default)('/server', '/client', true), _dec4(_class5 = function Test2() {
				_classCallCheck(this, Test2);
			}) || _class5);
	
			var test2 = new Test2();
			(0, _chai.expect)(test2.fetch.url).to.equal('/client');
		});
	
		it('works when called with braces', function () {
			var _dec5, _class6;
	
			var Test = (_dec5 = (0, _reduxFetchApi2.default)(), _dec5(_class6 = function Test() {
				_classCallCheck(this, Test);
			}) || _class6);
	
			var test = new Test();
			(0, _chai.expect)(test.fetch).to.be.a('function');
		});
	
		it('works when called without braces', function () {
			var _class7;
	
			var Test = (0, _reduxFetchApi2.default)(_class7 = function Test() {
				_classCallCheck(this, Test);
			}) || _class7;
	
			var test = new Test();
			(0, _chai.expect)(test.fetch).to.be.a('function');
		});
		it('can be used on nested components', function () {
			var _dec6, _class8, _dec7, _class9, _dec8, _class10, _dec9, _class11;
	
			var Inner = (_dec6 = (0, _reduxFetchApi2.default)('/inner'), _dec6(_class8 = function (_Api) {
				_inherits(Inner, _Api);
	
				function Inner() {
					_classCallCheck(this, Inner);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Inner).apply(this, arguments));
				}
	
				return Inner;
			}(_reduxApis.Api)) || _class8);
			var Outer = (_dec7 = (0, _reduxFetchApi2.default)('/outer'), _dec7(_class9 = function (_Api2) {
				_inherits(Outer, _Api2);
	
				function Outer(state) {
					_classCallCheck(this, Outer);
	
					var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Outer).call(this, state));
	
					_this2.inner = (0, _reduxApis.link)(_this2, new Inner());return _this2;
				}
	
				return Outer;
			}(_reduxApis.Api)) || _class9);
			var Other = (_dec8 = (0, _reduxFetchApi2.default)('/other'), _dec8(_class10 = function (_Api3) {
				_inherits(Other, _Api3);
	
				function Other(state) {
					_classCallCheck(this, Other);
	
					var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Other).call(this, state));
	
					_this3.inner = (0, _reduxApis.link)(_this3, new Inner());return _this3;
				}
	
				return Other;
			}(_reduxApis.Api)) || _class10);
			var Root = (_dec9 = (0, _reduxFetchApi2.default)('http://some-server.com/api'), _dec9(_class11 = function (_Api4) {
				_inherits(Root, _Api4);
	
				function Root(state) {
					_classCallCheck(this, Root);
	
					var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(Root).call(this, state));
	
					_this4.outer = (0, _reduxApis.link)(_this4, new Outer());
					_this4.other = (0, _reduxApis.link)(_this4, new Other());
					return _this4;
				}
	
				return Root;
			}(_reduxApis.Api)) || _class11);
	
			var root = new Root();
	
			(0, _chai.expect)(root.outer.inner.fetch.url).to.equal('/inner');
			(0, _chai.expect)(root.outer.fetch.url).to.equal('/outer');
			(0, _chai.expect)(root.other.inner.fetch.url).to.equal('/inner');
			(0, _chai.expect)(root.other.fetch.url).to.equal('/other');
			(0, _chai.expect)(root.fetch.url).to.equal('http://some-server.com/api');
		});
	});
	
	describe('.fetch(url, opts, abs=false)', function () {
		it('is a method added to Api instances decorated with @remote', function () {
			var _dec10, _class12;
	
			var Test = (_dec10 = (0, _reduxFetchApi2.default)('/test'), _dec10(_class12 = function Test() {
				_classCallCheck(this, Test);
			}) || _class12);
	
			var test = new Test();
			(0, _chai.expect)(test).to.have.a.property('fetch');
			(0, _chai.expect)(test.fetch).to.be.a('function');
		});
	
		it('accepts the `url` to fetch and an optional `opts` options object', function () {});
	
		it('is scoped to be relative to the url set by @remote', function () {
			var _dec11, _class13, _dec12, _class14, _dec13, _class15, _dec14, _class16;
	
			var Inner = (_dec11 = (0, _reduxFetchApi2.default)('/inner'), _dec11(_class13 = function (_Api5) {
				_inherits(Inner, _Api5);
	
				function Inner() {
					_classCallCheck(this, Inner);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Inner).apply(this, arguments));
				}
	
				return Inner;
			}(_reduxApis.Api)) || _class13);
			var Outer = (_dec12 = (0, _reduxFetchApi2.default)('/outer'), _dec12(_class14 = function (_Api6) {
				_inherits(Outer, _Api6);
	
				function Outer(state) {
					_classCallCheck(this, Outer);
	
					var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(Outer).call(this, state));
	
					_this6.inner = (0, _reduxApis.link)(_this6, new Inner());return _this6;
				}
	
				return Outer;
			}(_reduxApis.Api)) || _class14);
			var Other = (_dec13 = (0, _reduxFetchApi2.default)('/other'), _dec13(_class15 = function (_Api7) {
				_inherits(Other, _Api7);
	
				function Other(state) {
					_classCallCheck(this, Other);
	
					var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(Other).call(this, state));
	
					_this7.inner = (0, _reduxApis.link)(_this7, new Inner());return _this7;
				}
	
				return Other;
			}(_reduxApis.Api)) || _class15);
			var Root = (_dec14 = (0, _reduxFetchApi2.default)('http://some-server.com/api'), _dec14(_class16 = function (_Api8) {
				_inherits(Root, _Api8);
	
				function Root(state) {
					_classCallCheck(this, Root);
	
					var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(Root).call(this, state));
	
					_this8.outer = (0, _reduxApis.link)(_this8, new Outer());
					_this8.other = (0, _reduxApis.link)(_this8, new Other());
					return _this8;
				}
	
				return Root;
			}(_reduxApis.Api)) || _class16);
	
			var root = new Root();
			// stub out the root fetch url so we can intercept calls to it
			var saved = root.fetch.url;
			var fetchedUrls = [];
			root.fetch = function (url, opts) {
				var abs = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	
				fetchedUrls.push(abs ? url : this.fetch.url + url);
			};
			root.fetch.url = saved;
			// test scoping
			root.fetch('/TEST');
			(0, _chai.expect)(fetchedUrls[fetchedUrls.length - 1]).to.equal('http://some-server.com/api/TEST');
			root.outer.fetch('/TEST');
			(0, _chai.expect)(fetchedUrls[fetchedUrls.length - 1]).to.equal('http://some-server.com/api/outer/TEST');
			root.outer.inner.fetch('/TEST');
			(0, _chai.expect)(fetchedUrls[fetchedUrls.length - 1]).to.equal('http://some-server.com/api/outer/inner/TEST');
			root.other.fetch('/TEST');
			(0, _chai.expect)(fetchedUrls[fetchedUrls.length - 1]).to.equal('http://some-server.com/api/other/TEST');
			root.other.inner.fetch('/TEST');
			(0, _chai.expect)(fetchedUrls[fetchedUrls.length - 1]).to.equal('http://some-server.com/api/other/inner/TEST');
		});
	
		it('can be used to perform unscoped fetch by setting `abs` to `true`', function () {
			var _dec15, _class17, _dec16, _class18, _dec17, _class19, _dec18, _class20;
	
			var Inner = (_dec15 = (0, _reduxFetchApi2.default)('/inner'), _dec15(_class17 = function (_Api9) {
				_inherits(Inner, _Api9);
	
				function Inner() {
					_classCallCheck(this, Inner);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Inner).apply(this, arguments));
				}
	
				return Inner;
			}(_reduxApis.Api)) || _class17);
			var Outer = (_dec16 = (0, _reduxFetchApi2.default)('/outer'), _dec16(_class18 = function (_Api10) {
				_inherits(Outer, _Api10);
	
				function Outer(state) {
					_classCallCheck(this, Outer);
	
					var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(Outer).call(this, state));
	
					_this10.inner = (0, _reduxApis.link)(_this10, new Inner());return _this10;
				}
	
				return Outer;
			}(_reduxApis.Api)) || _class18);
			var Other = (_dec17 = (0, _reduxFetchApi2.default)('/other'), _dec17(_class19 = function (_Api11) {
				_inherits(Other, _Api11);
	
				function Other(state) {
					_classCallCheck(this, Other);
	
					var _this11 = _possibleConstructorReturn(this, Object.getPrototypeOf(Other).call(this, state));
	
					_this11.inner = (0, _reduxApis.link)(_this11, new Inner());return _this11;
				}
	
				return Other;
			}(_reduxApis.Api)) || _class19);
			var Root = (_dec18 = (0, _reduxFetchApi2.default)('http://some-server.com/api'), _dec18(_class20 = function (_Api12) {
				_inherits(Root, _Api12);
	
				function Root(state) {
					_classCallCheck(this, Root);
	
					var _this12 = _possibleConstructorReturn(this, Object.getPrototypeOf(Root).call(this, state));
	
					_this12.outer = (0, _reduxApis.link)(_this12, new Outer());
					_this12.other = (0, _reduxApis.link)(_this12, new Other());
					return _this12;
				}
	
				return Root;
			}(_reduxApis.Api)) || _class20);
	
			var root = new Root();
			// stub out the root fetch url so we can intercept calls to it
			var saved = root.fetch.url;
			var fetchedUrls = [];
			root.fetch = function (url, opts) {
				var abs = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	
				fetchedUrls.push(abs ? url : this.fetch.url + url);
			};
			root.fetch.url = saved;
			// test scoping
			root.fetch('/TEST', null, true);
			(0, _chai.expect)(fetchedUrls[fetchedUrls.length - 1]).to.equal('/TEST');
			root.outer.fetch('/TEST', null, true);
			(0, _chai.expect)(fetchedUrls[fetchedUrls.length - 1]).to.equal('/TEST');
			root.outer.inner.fetch('/TEST', null, true);
			(0, _chai.expect)(fetchedUrls[fetchedUrls.length - 1]).to.equal('/TEST');
			root.other.fetch('/TEST', null, true);
			(0, _chai.expect)(fetchedUrls[fetchedUrls.length - 1]).to.equal('/TEST');
			root.other.inner.fetch('/TEST', null, true);
			(0, _chai.expect)(fetchedUrls[fetchedUrls.length - 1]).to.equal('/TEST');
		});
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("chai");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("redux-apis");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.remote = remote;
	
	var _reduxApis = __webpack_require__(2);
	
	var _reduxApis2 = _interopRequireDefault(_reduxApis);
	
	var _isomorphicFetch = __webpack_require__(4);
	
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
/* 4 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ }
/******/ ]);
//# sourceMappingURL=redux-fetch-api.spec.js.map