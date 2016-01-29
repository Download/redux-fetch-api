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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _chai = __webpack_require__(1);
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(3);
	
	var _reduxFetchApi = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var fetched = [];
	function fetch(url, opts) {
		_picolog2.default.info('fetch(', url, opts ? ', ' : '', opts ? opts : '');
		fetched.push(url);
	}
	
	describe('@remote(url=\'\')', function () {
		it('is a decorator function', function () {
			var _class;
	
			(0, _chai.expect)(_reduxFetchApi.remote).to.be.a('function');
	
			var Test = (0, _reduxFetchApi.remote)(_class = function Test() {
				_classCallCheck(this, Test);
			}) || _class;
	
			(0, _chai.expect)(Test).to.be.a('function');
		});
	
		it('decorates the target component with a scoped `fetch` method', function () {
			var _class2;
	
			var Test = (0, _reduxFetchApi.remote)(_class2 = function Test() {
				_classCallCheck(this, Test);
			}) || _class2;
	
			var test = new Test();
			(0, _chai.expect)(test).to.have.a.property('fetch');
			(0, _chai.expect)(test.fetch).to.be.a('function');
		});
	
		it('works when called with braces', function () {
			var _dec, _class3;
	
			var Test = (_dec = (0, _reduxFetchApi.remote)(), _dec(_class3 = function Test() {
				_classCallCheck(this, Test);
			}) || _class3);
	
			var test = new Test();
			(0, _chai.expect)(test.fetch).to.be.a('function');
		});
	
		it('works when called without braces', function () {
			var _class4;
	
			var Test = (0, _reduxFetchApi.remote)(_class4 = function Test() {
				_classCallCheck(this, Test);
			}) || _class4;
	
			var test = new Test();
			(0, _chai.expect)(test.fetch).to.be.a('function');
		});
	
		it('works when used as a regular function', function () {
			var Test = (0, _reduxFetchApi.remote)(function Test() {
				_classCallCheck(this, Test);
			});
			var test = new Test();
			(0, _chai.expect)(test).to.have.a.property('fetch');
			(0, _chai.expect)(test.fetch).to.be.a('function');
			var Test2 = (0, _reduxFetchApi.remote)('/test')(function Test2() {
				_classCallCheck(this, Test2);
			});
			var test2 = new Test2();
			(0, _chai.expect)(test2).to.have.a.property('fetch');
			(0, _chai.expect)(test2.fetch).to.be.a('function');
		});
	
		it('can be used on Api classes', function () {
			var _class5;
	
			var Test = (0, _reduxFetchApi.remote)(_class5 = function (_Api) {
				_inherits(Test, _Api);
	
				function Test() {
					_classCallCheck(this, Test);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Test).apply(this, arguments));
				}
	
				return Test;
			}(_reduxApis.Api)) || _class5;
	
			(0, _chai.expect)(Test.prototype).to.have.a.property('fetch');
		});
	
		it('can be used on Api instances', function () {
			var Test = function (_Api2) {
				_inherits(Test, _Api2);
	
				function Test() {
					_classCallCheck(this, Test);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Test).apply(this, arguments));
				}
	
				return Test;
			}(_reduxApis.Api);
	
			var test = (0, _reduxFetchApi.remote)(new Test());
			(0, _chai.expect)(test).to.have.a.property('fetch');
		});
	
		it('can mix and match classes and instances', function () {
			var _class6;
	
			var Search = (0, _reduxFetchApi.remote)(_class6 = function (_Api3) {
				_inherits(Search, _Api3);
	
				function Search() {
					_classCallCheck(this, Search);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Search).apply(this, arguments));
				}
	
				return Search;
			}(_reduxApis.Api)) || _class6;
	
			var App = function (_Api4) {
				_inherits(App, _Api4);
	
				function App(state) {
					_classCallCheck(this, App);
	
					var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, state));
	
					_this4.products = (0, _reduxFetchApi.remote)((0, _reduxApis.link)(_this4, new Search()));
					_this4.people = (0, _reduxFetchApi.remote)((0, _reduxApis.link)(_this4, new Search()));
					return _this4;
				}
	
				_createClass(App, [{
					key: 'fetch',
					value: function fetch(url) {
						fetched.push(url);
					}
				}]);
	
				return App;
			}(_reduxApis.Api);
	
			var app = new App();
			(0, _chai.expect)(app.products.fetch).to.be.a('function');
	
			(0, _chai.expect)(fetched.length).to.equal(0);
			app.products.fetch('TEST');
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('TEST');
			app.people.fetch('TEST');
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('TEST');
			fetched.splice(0, fetched.length);
			(0, _chai.expect)(fetched.length).to.equal(0);
		});
	
		it('accepts an optional `url` parameter, scoping calls to fetch to this url', function () {
			var _class7, _dec2, _dec3, _class8;
	
			var Search = (0, _reduxFetchApi.remote)(_class7 = function (_Api5) {
				_inherits(Search, _Api5);
	
				function Search() {
					_classCallCheck(this, Search);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Search).apply(this, arguments));
				}
	
				return Search;
			}(_reduxApis.Api)) || _class7;
	
			var App = (_dec2 = (0, _reduxFetchApi.fetcher)(fetch), _dec3 = (0, _reduxFetchApi.remote)('http://example.com/api'), _dec2(_class8 = _dec3(_class8 = function (_Api6) {
				_inherits(App, _Api6);
	
				function App(state) {
					_classCallCheck(this, App);
	
					var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, state));
	
					_this6.products = (0, _reduxFetchApi.remote)('/products')((0, _reduxApis.link)(_this6, new Search()));
					_this6.people = (0, _reduxFetchApi.remote)('/people')((0, _reduxApis.link)(_this6, new Search()));
					return _this6;
				}
	
				return App;
			}(_reduxApis.Api)) || _class8) || _class8);
	
			var app = new App();
			(0, _chai.expect)(app.products.fetch).to.be.a('function');
	
			(0, _chai.expect)(fetched.length).to.equal(0);
			app.products.fetch('?q=TEST');
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('http://example.com/api/products?q=TEST');
			fetched.splice(0, fetched.length);
			(0, _chai.expect)(fetched.length).to.equal(0);
		});
	});
	
	describe('.fetch(url, opts, abs=false)', function () {
		it('is a method added to Api instances decorated with @remote', function () {
			var _dec4, _class9;
	
			var Test = (_dec4 = (0, _reduxFetchApi.remote)('/test'), _dec4(_class9 = function Test() {
				_classCallCheck(this, Test);
			}) || _class9);
	
			var test = new Test();
			(0, _chai.expect)(test).to.have.a.property('fetch');
			(0, _chai.expect)(test.fetch).to.be.a('function');
		});
	
		it('accepts the `url` to fetch and an optional `opts` options object', function () {});
	
		it('is scoped to be relative to the url set by @remote', function () {
			var _dec5, _dec6, _class10;
	
			(0, _chai.expect)(fetched.length).to.equal(0);
			var Inner = (_dec5 = (0, _reduxFetchApi.fetcher)(fetch), _dec6 = (0, _reduxFetchApi.remote)('/inner'), _dec5(_class10 = _dec6(_class10 = function (_Api7) {
				_inherits(Inner, _Api7);
	
				function Inner() {
					_classCallCheck(this, Inner);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Inner).apply(this, arguments));
				}
	
				return Inner;
			}(_reduxApis.Api)) || _class10) || _class10);
	
			new Inner().fetch('/TEST');
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('/inner/TEST');
			fetched.splice(0, fetched.length);
			(0, _chai.expect)(fetched.length).to.equal(0);
		});
	
		it('traverses up the api hierarchy and stops at the last one decorated with @remote', function () {
			var _dec7, _class11, _dec8, _class12, _dec9, _class13, _dec10, _dec11, _class14;
	
			(0, _chai.expect)(fetched.length).to.equal(0);
			var Inner = (_dec7 = (0, _reduxFetchApi.remote)('/inner'), _dec7(_class11 = function (_Api8) {
				_inherits(Inner, _Api8);
	
				function Inner() {
					_classCallCheck(this, Inner);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Inner).apply(this, arguments));
				}
	
				return Inner;
			}(_reduxApis.Api)) || _class11);
			var Outer = (_dec8 = (0, _reduxFetchApi.remote)('/outer'), _dec8(_class12 = function (_Api9) {
				_inherits(Outer, _Api9);
	
				function Outer(state) {
					_classCallCheck(this, Outer);
	
					var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(Outer).call(this, state));
	
					_this9.inner = (0, _reduxApis.link)(_this9, new Inner());return _this9;
				}
	
				return Outer;
			}(_reduxApis.Api)) || _class12);
			var Other = (_dec9 = (0, _reduxFetchApi.remote)('/other'), _dec9(_class13 = function (_Api10) {
				_inherits(Other, _Api10);
	
				function Other(state) {
					_classCallCheck(this, Other);
	
					var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(Other).call(this, state));
	
					_this10.inner = (0, _reduxApis.link)(_this10, new Inner());return _this10;
				}
	
				return Other;
			}(_reduxApis.Api)) || _class13);
			var Root = (_dec10 = (0, _reduxFetchApi.fetcher)(fetch), _dec11 = (0, _reduxFetchApi.remote)('http://some-server.com/api'), _dec10(_class14 = _dec11(_class14 = function (_Api11) {
				_inherits(Root, _Api11);
	
				function Root(state) {
					_classCallCheck(this, Root);
	
					var _this11 = _possibleConstructorReturn(this, Object.getPrototypeOf(Root).call(this, state));
	
					_this11.outer = (0, _reduxApis.link)(_this11, new Outer());
					_this11.other = (0, _reduxApis.link)(_this11, new Other());
					return _this11;
				}
	
				return Root;
			}(_reduxApis.Api)) || _class14) || _class14);
	
			var root = new Root();
			// test scoping
			root.fetch('/TEST');
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('http://some-server.com/api/TEST');
			root.outer.fetch('/TEST');
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('http://some-server.com/api/outer/TEST');
			root.outer.inner.fetch('/TEST');
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('http://some-server.com/api/outer/inner/TEST');
			root.other.fetch('/TEST');
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('http://some-server.com/api/other/TEST');
			root.other.inner.fetch('/TEST');
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('http://some-server.com/api/other/inner/TEST');
			fetched.splice(0, fetched.length);
			(0, _chai.expect)(fetched.length).to.equal(0);
		});
	
		it('will stop traversing early if it encounters an api decorated with @endpoint', function () {
			var _dec12, _class15, _dec13, _class16, _dec14, _dec15, _dec16, _class17, _dec17, _dec18, _class18;
	
			(0, _chai.expect)(fetched.length).to.equal(0);
			var Inner = (_dec12 = (0, _reduxFetchApi.remote)('/inner'), _dec12(_class15 = function (_Api12) {
				_inherits(Inner, _Api12);
	
				function Inner() {
					_classCallCheck(this, Inner);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Inner).apply(this, arguments));
				}
	
				return Inner;
			}(_reduxApis.Api)) || _class15);
			var Outer = (_dec13 = (0, _reduxFetchApi.remote)('/outer'), _dec13(_class16 = function (_Api13) {
				_inherits(Outer, _Api13);
	
				function Outer(state) {
					_classCallCheck(this, Outer);
	
					var _this13 = _possibleConstructorReturn(this, Object.getPrototypeOf(Outer).call(this, state));
	
					_this13.inner = (0, _reduxApis.link)(_this13, new Inner());return _this13;
				}
	
				return Outer;
			}(_reduxApis.Api)) || _class16);
			var Other = (_dec14 = (0, _reduxFetchApi.fetcher)(fetch), _dec15 = (0, _reduxFetchApi.remote)('/other'), _dec16 = (0, _reduxFetchApi.endpoint)('http://other.example.com/api'), _dec14(_class17 = _dec15(_class17 = _dec16(_class17 = function (_Api14) {
				_inherits(Other, _Api14);
	
				function Other(state) {
					_classCallCheck(this, Other);
	
					var _this14 = _possibleConstructorReturn(this, Object.getPrototypeOf(Other).call(this, state));
	
					_this14.inner = (0, _reduxApis.link)(_this14, new Inner());return _this14;
				}
	
				return Other;
			}(_reduxApis.Api)) || _class17) || _class17) || _class17);
			var Root = (_dec17 = (0, _reduxFetchApi.fetcher)(fetch), _dec18 = (0, _reduxFetchApi.remote)('http://example.com/api'), _dec17(_class18 = _dec18(_class18 = function (_Api15) {
				_inherits(Root, _Api15);
	
				function Root(state) {
					_classCallCheck(this, Root);
	
					var _this15 = _possibleConstructorReturn(this, Object.getPrototypeOf(Root).call(this, state));
	
					_this15.outer = (0, _reduxApis.link)(_this15, new Outer());
					_this15.other = (0, _reduxApis.link)(_this15, new Other());
					return _this15;
				}
	
				return Root;
			}(_reduxApis.Api)) || _class18) || _class18);
	
			var root = new Root();
			// test scoping
			root.fetch('/TEST');
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('http://example.com/api/TEST');
			root.outer.fetch('/TEST');
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('http://example.com/api/outer/TEST');
			root.outer.inner.fetch('/TEST');
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('http://example.com/api/outer/inner/TEST');
			root.other.fetch('/TEST');
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('http://other.example.com/api/other/TEST');
			root.other.inner.fetch('/TEST');
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('http://other.example.com/api/other/inner/TEST');
			fetched.splice(0, fetched.length);
			(0, _chai.expect)(fetched.length).to.equal(0);
		});
	
		it('can be used to perform unscoped fetch by setting `abs` to `true`', function () {
			var _dec19, _class19, _dec20, _class20, _dec21, _class21, _dec22, _dec23, _class22;
	
			var Inner = (_dec19 = (0, _reduxFetchApi.remote)('/inner'), _dec19(_class19 = function (_Api16) {
				_inherits(Inner, _Api16);
	
				function Inner() {
					_classCallCheck(this, Inner);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Inner).apply(this, arguments));
				}
	
				return Inner;
			}(_reduxApis.Api)) || _class19);
			var Outer = (_dec20 = (0, _reduxFetchApi.remote)('/outer'), _dec20(_class20 = function (_Api17) {
				_inherits(Outer, _Api17);
	
				function Outer(state) {
					_classCallCheck(this, Outer);
	
					var _this17 = _possibleConstructorReturn(this, Object.getPrototypeOf(Outer).call(this, state));
	
					_this17.inner = (0, _reduxApis.link)(_this17, new Inner());return _this17;
				}
	
				return Outer;
			}(_reduxApis.Api)) || _class20);
			var Other = (_dec21 = (0, _reduxFetchApi.remote)('/other'), _dec21(_class21 = function (_Api18) {
				_inherits(Other, _Api18);
	
				function Other(state) {
					_classCallCheck(this, Other);
	
					var _this18 = _possibleConstructorReturn(this, Object.getPrototypeOf(Other).call(this, state));
	
					_this18.inner = (0, _reduxApis.link)(_this18, new Inner());return _this18;
				}
	
				return Other;
			}(_reduxApis.Api)) || _class21);
			var Root = (_dec22 = (0, _reduxFetchApi.fetcher)(fetch), _dec23 = (0, _reduxFetchApi.remote)('http://some-server.com/api'), _dec22(_class22 = _dec23(_class22 = function (_Api19) {
				_inherits(Root, _Api19);
	
				function Root(state) {
					_classCallCheck(this, Root);
	
					var _this19 = _possibleConstructorReturn(this, Object.getPrototypeOf(Root).call(this, state));
	
					_this19.outer = (0, _reduxApis.link)(_this19, new Outer());
					_this19.other = (0, _reduxApis.link)(_this19, new Other());
					return _this19;
				}
	
				return Root;
			}(_reduxApis.Api)) || _class22) || _class22);
	
			var root = new Root();
			// test scoping
			(0, _chai.expect)(fetched.length).to.equal(0);
			root.fetch('/TEST', null, true);
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('/TEST');
			root.outer.fetch('/TEST', null, true);
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('/TEST');
			root.outer.inner.fetch('/TEST', null, true);
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('/TEST');
			root.other.fetch('/TEST', null, true);
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('/TEST');
			root.other.inner.fetch('/TEST', null, true);
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('/TEST');
			fetched.splice(0, fetched.length);
			(0, _chai.expect)(fetched.length).to.equal(0);
		});
	});
	
	describe('@endpoint(url=\'\', altUrl=null, useAlt=runningInBrowser())', function () {
	
		it('is a decorator function', function () {
			var _class23;
	
			(0, _chai.expect)(_reduxFetchApi.endpoint).to.be.a('function');
	
			var Test = (0, _reduxFetchApi.endpoint)(_class23 = function Test() {
				_classCallCheck(this, Test);
			}) || _class23;
	
			(0, _chai.expect)(Test).to.be.a('function');
		});
	
		it('decorates the target component with an `__endpoint` property', function () {
			var _class24;
	
			var Test = (0, _reduxFetchApi.endpoint)(_class24 = function Test() {
				_classCallCheck(this, Test);
			}) || _class24;
	
			var test = new Test();
			(0, _chai.expect)(test).to.have.a.property('__endpoint');
		});
	
		it('works when called with braces', function () {
			var _dec24, _class25;
	
			var Test = (_dec24 = (0, _reduxFetchApi.endpoint)(), _dec24(_class25 = function Test() {
				_classCallCheck(this, Test);
			}) || _class25);
	
			var test = new Test();
			(0, _chai.expect)(test).to.have.a.property('__endpoint');
		});
	
		it('works when called without braces', function () {
			var _class26;
	
			var Test = (0, _reduxFetchApi.endpoint)(_class26 = function Test() {
				_classCallCheck(this, Test);
			}) || _class26;
	
			var test = new Test();
			(0, _chai.expect)(test).to.have.a.property('__endpoint');
		});
	
		it('works when used as a regular function', function () {
			var Test = (0, _reduxFetchApi.endpoint)(function Test() {
				_classCallCheck(this, Test);
			});
			var test = new Test();
			(0, _chai.expect)(test).to.have.a.property('__endpoint');
		});
	
		it('can be used on Api classes', function () {
			var _class27;
	
			var Test = (0, _reduxFetchApi.endpoint)(_class27 = function (_Api20) {
				_inherits(Test, _Api20);
	
				function Test() {
					_classCallCheck(this, Test);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Test).apply(this, arguments));
				}
	
				return Test;
			}(_reduxApis.Api)) || _class27;
	
			(0, _chai.expect)(Test.prototype).to.have.a.property('__endpoint');
			var test = new Test();
			(0, _chai.expect)(test).to.have.a.property('__endpoint');
		});
	
		it('can be used on Api instances', function () {
			var Test = function (_Api21) {
				_inherits(Test, _Api21);
	
				function Test() {
					_classCallCheck(this, Test);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Test).apply(this, arguments));
				}
	
				return Test;
			}(_reduxApis.Api);
	
			var test = (0, _reduxFetchApi.endpoint)(new Test());
			(0, _chai.expect)(test).to.have.a.property('__endpoint');
		});
	
		it('can mix and match classes and instances', function () {
			//@endpoint
	
			var Search = function (_Api22) {
				_inherits(Search, _Api22);
	
				function Search() {
					_classCallCheck(this, Search);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Search).apply(this, arguments));
				}
	
				return Search;
			}(_reduxApis.Api);
	
			var search = new Search();
			//expect(search).to.have.a.property('__endpoint');
	
			var App = function (_Api23) {
				_inherits(App, _Api23);
	
				function App(state) {
					_classCallCheck(this, App);
	
					var _this23 = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, state));
	
					_this23.products = (0, _reduxFetchApi.endpoint)('PRODUCTS')((0, _reduxApis.link)(_this23, new Search()));
	
					_this23.people = (0, _reduxFetchApi.endpoint)('PEOPLE')((0, _reduxApis.link)(_this23, new Search()));
					return _this23;
				}
	
				return App;
			}(_reduxApis.Api);
	
			var app = new App();
			_picolog2.default.info(app);
			(0, _chai.expect)(app.products.__endpoint).to.equal('PRODUCTS');
			(0, _chai.expect)(app.people.__endpoint).to.equal('PEOPLE');
		});
	
		it('used together with `@remote`, it stops `fetch` from traversing up the hierarchy', function () {
			var _dec25, _class28, _dec26, _dec27, _class29;
	
			var Search = (_dec25 = (0, _reduxFetchApi.fetcher)(fetch), _dec25(_class28 = (0, _reduxFetchApi.remote)(_class28 = function (_Api24) {
				_inherits(Search, _Api24);
	
				function Search() {
					_classCallCheck(this, Search);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Search).apply(this, arguments));
				}
	
				return Search;
			}(_reduxApis.Api)) || _class28) || _class28);
			var App = (_dec26 = (0, _reduxFetchApi.fetcher)(fetch), _dec27 = (0, _reduxFetchApi.endpoint)('http://example.com/api'), _dec26(_class29 = (0, _reduxFetchApi.remote)(_class29 = _dec27(_class29 = function (_Api25) {
				_inherits(App, _Api25);
	
				function App(state) {
					_classCallCheck(this, App);
	
					var _this25 = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, state));
	
					_this25.products = (0, _reduxFetchApi.endpoint)('http://example.com/products')((0, _reduxApis.link)(_this25, new Search()));
					_this25.people = (0, _reduxFetchApi.remote)('/people')((0, _reduxApis.link)(_this25, new Search()));
					return _this25;
				}
	
				return App;
			}(_reduxApis.Api)) || _class29) || _class29) || _class29);
	
			var app = new App();
			(0, _chai.expect)(app.products.__endpoint).to.equal('http://example.com/products');
			(0, _chai.expect)(app.__endpoint).to.equal('http://example.com/api');
	
			(0, _chai.expect)(fetched.length).to.equal(0);
			app.products.fetch('?q=TEST');
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('http://example.com/products?q=TEST');
			app.people.fetch();
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('http://example.com/api/people');
	
			fetched.splice(0, fetched.length);
			(0, _chai.expect)(fetched.length).to.equal(0);
		});
	
		it('accepts an optional `url` parameter, scoping calls to fetch to this url', function () {
			var _class30, _dec28, _dec29, _class31;
	
			var Search = (0, _reduxFetchApi.remote)(_class30 = function (_Api26) {
				_inherits(Search, _Api26);
	
				function Search() {
					_classCallCheck(this, Search);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Search).apply(this, arguments));
				}
	
				return Search;
			}(_reduxApis.Api)) || _class30;
	
			var App = (_dec28 = (0, _reduxFetchApi.fetcher)(fetch), _dec29 = (0, _reduxFetchApi.remote)('http://example.com/api'), _dec28(_class31 = _dec29(_class31 = function (_Api27) {
				_inherits(App, _Api27);
	
				function App(state) {
					_classCallCheck(this, App);
	
					var _this27 = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, state));
	
					_this27.products = (0, _reduxFetchApi.remote)('/products')((0, _reduxApis.link)(_this27, new Search()));
					_this27.people = (0, _reduxFetchApi.remote)('/people')((0, _reduxApis.link)(_this27, new Search()));
					return _this27;
				}
	
				return App;
			}(_reduxApis.Api)) || _class31) || _class31);
	
			var app = new App();
			(0, _chai.expect)(app.products.fetch).to.be.a('function');
	
			(0, _chai.expect)(fetched.length).to.equal(0);
	
			app.products.fetch('?q=TEST');
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('http://example.com/api/products?q=TEST');
			app.people.fetch('?q=TEST');
			(0, _chai.expect)(fetched[fetched.length - 1]).to.equal('http://example.com/api/people?q=TEST');
	
			fetched.splice(0, fetched.length);
			(0, _chai.expect)(fetched.length).to.equal(0);
		});
	});
	
	describe('@fetcher(fetchFunction)', function () {
		it('is a decorator function', function () {
			var _dec30, _class32;
	
			(0, _chai.expect)(_reduxFetchApi.fetcher).to.be.a('function');
			function myFetch() {}
			var Test = (_dec30 = (0, _reduxFetchApi.fetcher)(myFetch), _dec30(_class32 = function Test() {
				_classCallCheck(this, Test);
			}) || _class32);
	
			(0, _chai.expect)(Test).to.be.a('function');
		});
	
		it('decorates the target component with a `__fetch` property', function () {
			var _dec31, _class33;
	
			function myFetch() {}
			var Test = (_dec31 = (0, _reduxFetchApi.fetcher)(myFetch), _dec31(_class33 = function Test() {
				_classCallCheck(this, Test);
			}) || _class33);
	
			var test = new Test();
			(0, _chai.expect)(test).to.have.a.property('__fetch');
			(0, _chai.expect)(test.__fetch).to.equal(myFetch);
		});
	
		it('works when used as a regular function', function () {
			function myFetch() {}
			var Test = (0, _reduxFetchApi.fetcher)(myFetch)(function Test() {
				_classCallCheck(this, Test);
			});
			var test = new Test();
			(0, _chai.expect)(test).to.have.a.property('__fetch');
			(0, _chai.expect)(test.__fetch).to.equal(myFetch);
		});
	
		it('can be used on Api classes', function () {
			function myFetch() {}
			var Test = (0, _reduxFetchApi.fetcher)(myFetch)(function (_Api28) {
				_inherits(Test, _Api28);
	
				function Test() {
					_classCallCheck(this, Test);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Test).apply(this, arguments));
				}
	
				return Test;
			}(_reduxApis.Api));
			var test = new Test();
			(0, _chai.expect)(test).to.have.a.property('__fetch');
			(0, _chai.expect)(test.__fetch).to.equal(myFetch);
		});
	
		it('can be used on Api instances', function () {
			function myFetch() {}
	
			var Test = function (_Api29) {
				_inherits(Test, _Api29);
	
				function Test() {
					_classCallCheck(this, Test);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Test).apply(this, arguments));
				}
	
				return Test;
			}(_reduxApis.Api);
	
			var test = (0, _reduxFetchApi.fetcher)(myFetch)(new Test());
			(0, _chai.expect)(test).to.have.a.property('__fetch');
			(0, _chai.expect)(test.__fetch).to.equal(myFetch);
		});
	
		it('can mix and match classes and instances', function () {
			var _dec32, _class34;
	
			function myFetch() {}
			function myOtherFetch() {}
			var Search = (_dec32 = (0, _reduxFetchApi.fetcher)(myFetch), _dec32(_class34 = function (_Api30) {
				_inherits(Search, _Api30);
	
				function Search() {
					_classCallCheck(this, Search);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Search).apply(this, arguments));
				}
	
				return Search;
			}(_reduxApis.Api)) || _class34);
	
			var search = new Search();
			(0, _chai.expect)(search.__fetch).to.equal(myFetch);
	
			var App = function (_Api31) {
				_inherits(App, _Api31);
	
				function App(state) {
					_classCallCheck(this, App);
	
					var _this31 = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, state));
	
					_this31.products = (0, _reduxFetchApi.fetcher)(myOtherFetch)((0, _reduxApis.link)(_this31, new Search()));
	
					_this31.people = (0, _reduxApis.link)(_this31, new Search());
					return _this31;
				}
	
				return App;
			}(_reduxApis.Api);
	
			var app = new App();
			_picolog2.default.info(app);
			(0, _chai.expect)(app.products.__fetch).to.equal(myOtherFetch);
			(0, _chai.expect)(app.people.__fetch).to.equal(myFetch);
		});
	
		it('causes the given `fetchFunction` to be used instead of the default one', function () {
			var _dec33, _class35;
	
			var fetchCalled = false;
			function myFetch() {
				fetchCalled = true;
			}
			var Test = (_dec33 = (0, _reduxFetchApi.fetcher)(myFetch), _dec33(_class35 = (0, _reduxFetchApi.remote)(_class35 = function Test() {
				_classCallCheck(this, Test);
			}) || _class35) || _class35);
	
			var test = new Test();
			(0, _chai.expect)(fetched.length).to.equal(0);
			(0, _chai.expect)(fetchCalled).to.equal(false);
			test.fetch();
			(0, _chai.expect)(fetchCalled).to.equal(true);
			(0, _chai.expect)(fetched.length).to.equal(0);
		});
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("chai");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("picolog");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("redux-apis");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.remote = remote;
	exports.endpoint = endpoint;
	exports.fetcher = fetcher;
	
	var _isomorphicFetch = __webpack_require__(5);
	
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
/* 5 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ }
/******/ ]);
//# sourceMappingURL=redux-fetch-api.spec.js.map