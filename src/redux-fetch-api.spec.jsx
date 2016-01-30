import { expect } from 'chai';
import log from 'picolog';
import { Api, link } from 'redux-apis';

import { remote, endpoint, fetcher } from './redux-fetch-api';

const fetched = [];
function fetch(url, opts) {
	log.info('fetch(', url, opts ? ', ' : '', opts ? opts : '');
	fetched.push(url);
}

describe('@remote(url=\'\')', () => {
	it('is a decorator function', () => {
		expect(remote).to.be.a('function');
		@remote
		class Test {}
		expect(Test).to.be.a('function');
	});

	it('decorates the target component with a scoped `fetch` method', () => {
		@remote
		class Test { }
		const test = new Test();
		expect(test).to.have.a.property('fetch');
		expect(test.fetch).to.be.a('function');
	});

	it('does not affect the results of `Object.keys` on the decorated component', () => {
		class Test1 {}
		const test1 = new Test1();
		@remote
		class Test2 { }
		const test2 = new Test2();
		expect(Object.keys(test1)).to.deep.equal(Object.keys(test2));
	});

	it('works when called with braces', ()=>{
		@remote()
		class Test {}
		const test = new Test();
		expect(test.fetch).to.be.a('function');
	})

	it('works when called without braces', ()=>{
		@remote
		class Test {}
		const test = new Test();
		expect(test.fetch).to.be.a('function');
	})

	it('works when used as a regular function', () => {
		const Test = remote(class Test { })
		const test = new Test();
		expect(test).to.have.a.property('fetch');
		expect(test.fetch).to.be.a('function');
		const Test2 = remote('/test')(class Test2 { })
		const test2 = new Test2();
		expect(test2).to.have.a.property('fetch');
		expect(test2.fetch).to.be.a('function');
	});

	it('can be used on Api classes', () => {
		@remote
		class Test extends Api {}
		expect(Test.prototype).to.have.a.property('fetch');
	});

	it('can be used on Api instances', () => {
		class Test extends Api {}
		const test = remote(new Test());
		expect(test).to.have.a.property('fetch');
	});

	it('can mix and match classes and instances', () => {
		@remote
		class Search extends Api {}

		class App extends Api {
			constructor(state){
				super(state);

				this.products = remote(
					link(this, new Search())
				)
				this.people = remote(
					link(this, new Search())
				)
			}
			fetch(url) {
				fetched.push(url);
			}
		}
		const app = new App();
		expect(app.products.fetch).to.be.a('function');

		expect(fetched.length).to.equal(0);
		app.products.fetch('TEST');
		expect(fetched[fetched.length - 1]).to.equal('TEST');
		app.people.fetch('TEST');
		expect(fetched[fetched.length - 1]).to.equal('TEST');
		fetched.splice(0, fetched.length);
		expect(fetched.length).to.equal(0);
	});

	it('accepts an optional `url` parameter, scoping calls to fetch to this url', () => {
		@remote
		class Search extends Api {}

		@fetcher(fetch)
		@remote('http://example.com/api')
		class App extends Api {
			constructor(state){
				super(state);

				this.products = remote('/products')(
					link(this, new Search())
				)
				this.people = remote('/people')(
					link(this, new Search())
				)
			}
		}
		const app = new App();
		expect(app.products.fetch).to.be.a('function');

		expect(fetched.length).to.equal(0);
		app.products.fetch('?q=TEST');
		expect(fetched[fetched.length - 1]).to.equal('http://example.com/api/products?q=TEST');
		fetched.splice(0, fetched.length);
		expect(fetched.length).to.equal(0);
	});
});


describe('.fetch(url, opts, abs=false)', () => {
	it('is a method added to Api instances decorated with @remote', () => {
		@remote('/test')
		class Test {}
		const test = new Test();
		expect(test).to.have.a.property('fetch');
		expect(test.fetch).to.be.a('function');
	});

	it('accepts the `url` to fetch and an optional `opts` options object', () => {
	});

	it('is scoped to be relative to the url set by @remote', () => {
		expect(fetched.length).to.equal(0);
		@fetcher(fetch)
		@remote('/inner')
		class Inner extends Api {}
		new Inner().fetch('/TEST');
		expect(fetched[fetched.length -1]).to.equal('/inner/TEST');
		fetched.splice(0, fetched.length);
		expect(fetched.length).to.equal(0);
	});

	it('traverses up the api hierarchy and stops at the last one decorated with @remote', () => {
		expect(fetched.length).to.equal(0);
		@remote('/inner')
		class Inner extends Api {}
		@remote('/outer')
		class Outer extends Api {constructor(state){super(state); this.inner = link(this, new Inner());}}
		@remote('/other')
		class Other extends Api {constructor(state){super(state); this.inner = link(this, new Inner());}}
		@fetcher(fetch)
		@remote('http://some-server.com/api')
		class Root extends Api {
			constructor(state){
				super(state);
				this.outer = link(this, new Outer());
				this.other = link(this, new Other());
			}
		}
		const root = new Root();
		root.fetch('/TEST');
		expect(fetched[fetched.length -1]).to.equal('http://some-server.com/api/TEST');
		root.outer.fetch('/TEST');
		expect(fetched[fetched.length -1]).to.equal('http://some-server.com/api/outer/TEST');
		root.outer.inner.fetch('/TEST');
		expect(fetched[fetched.length -1]).to.equal('http://some-server.com/api/outer/inner/TEST');
		root.other.fetch('/TEST');
		expect(fetched[fetched.length -1]).to.equal('http://some-server.com/api/other/TEST');
		root.other.inner.fetch('/TEST');
		expect(fetched[fetched.length -1]).to.equal('http://some-server.com/api/other/inner/TEST');
		fetched.splice(0, fetched.length);
		expect(fetched.length).to.equal(0);
	});

	it('will stop traversing early if it encounters an api decorated with @endpoint', () => {
		expect(fetched.length).to.equal(0);
		@remote('/inner')
		class Inner extends Api {}
		@remote('/outer')
		class Outer extends Api {constructor(state){super(state); this.inner = link(this, new Inner());}}
		@fetcher(fetch)
		@remote('/other')
		@endpoint('http://other.example.com/api')
		class Other extends Api {constructor(state){super(state); this.inner = link(this, new Inner());}}
		@fetcher(fetch)
		@remote('http://example.com/api')
		class Root extends Api {
			constructor(state){
				super(state);
				this.outer = link(this, new Outer());
				this.other = link(this, new Other());
			}
		}
		const root = new Root();
		root.fetch('/TEST');
		expect(fetched[fetched.length -1]).to.equal('http://example.com/api/TEST');
		root.outer.fetch('/TEST');
		expect(fetched[fetched.length -1]).to.equal('http://example.com/api/outer/TEST');
		root.outer.inner.fetch('/TEST');
		expect(fetched[fetched.length -1]).to.equal('http://example.com/api/outer/inner/TEST');
		root.other.fetch('/TEST');
		expect(fetched[fetched.length -1]).to.equal('http://other.example.com/api/other/TEST');
		root.other.inner.fetch('/TEST');
		expect(fetched[fetched.length -1]).to.equal('http://other.example.com/api/other/inner/TEST');
		fetched.splice(0, fetched.length);
		expect(fetched.length).to.equal(0);
	});

	it('can be used to perform unscoped fetch by setting `abs` to `true`', () => {
		@remote('/inner')
		class Inner extends Api {}
		@remote('/outer')
		class Outer extends Api {constructor(state){super(state); this.inner = link(this, new Inner());}}
		@remote('/other')
		class Other extends Api {constructor(state){super(state); this.inner = link(this, new Inner());}}
		@fetcher(fetch)
		@remote('http://some-server.com/api')
		class Root extends Api {
			constructor(state){
				super(state);
				this.outer = link(this, new Outer());
				this.other = link(this, new Other());
			}
		}
		const root = new Root();
		expect(fetched.length).to.equal(0);
		root.fetch('/TEST', null, true);
		expect(fetched[fetched.length -1]).to.equal('/TEST');
		root.outer.fetch('/TEST', null, true);
		expect(fetched[fetched.length -1]).to.equal('/TEST');
		root.outer.inner.fetch('/TEST', null, true);
		expect(fetched[fetched.length -1]).to.equal('/TEST');
		root.other.fetch('/TEST', null, true);
		expect(fetched[fetched.length -1]).to.equal('/TEST');
		root.other.inner.fetch('/TEST', null, true);
		expect(fetched[fetched.length -1]).to.equal('/TEST');
		fetched.splice(0, fetched.length);
		expect(fetched.length).to.equal(0);
	});
});

describe('@endpoint(url=\'\', altUrl=null, useAlt=runningInBrowser())', () => {

	it('is a decorator function', () => {
		expect(endpoint).to.be.a('function');
		@endpoint
		class Test {}
		expect(Test).to.be.a('function');
	});

	it('decorates the target component with an `__endpoint` property', () => {
		@endpoint
		class Test {}
		const test = new Test();
		expect(test).to.have.a.property('__endpoint');
	});

	it('does not affect the results of `Object.keys` on the decorated component', () => {
		class Test1 {}
		const test1 = new Test1();
		@endpoint
		class Test2 { }
		const test2 = new Test2();
		expect(Object.keys(test1)).to.deep.equal(Object.keys(test2));
	});

	it('works when called with braces', ()=>{
		@endpoint()
		class Test {}
		const test = new Test();
		expect(test).to.have.a.property('__endpoint');
	})

	it('works when called without braces', ()=>{
		@endpoint
		class Test {}
		const test = new Test();
		expect(test).to.have.a.property('__endpoint');
	})

	it('works when used as a regular function', () => {
		const Test = endpoint(class Test { })
		const test = new Test();
		expect(test).to.have.a.property('__endpoint');
	});

	it('can be used on Api classes', () => {
		@endpoint
		class Test extends Api {}
		expect(Test.prototype).to.have.a.property('__endpoint');
		const test = new Test();
		expect(test).to.have.a.property('__endpoint');
	});

	it('can be used on Api instances', () => {
		class Test extends Api {}
		const test = endpoint(new Test());
		expect(test).to.have.a.property('__endpoint');
	});

	it('can mix and match classes and instances', () => {
		class Search extends Api {}
		const search = new Search();

		class App extends Api {
			constructor(state){
				super(state);

				this.products = endpoint('PRODUCTS')(
					link(this, new Search())
				);

				this.people = endpoint('PEOPLE')(
					link(this, new Search())
				);
			}
		}
		const app = new App();
		expect(app.products.__endpoint).to.equal('PRODUCTS');
		expect(app.people.__endpoint).to.equal('PEOPLE');
	});

	it('used together with `@remote`, it stops `fetch` from traversing up the hierarchy', () => {
		@fetcher(fetch)
		@remote
		class Search extends Api {}

		@fetcher(fetch)
		@remote
		@endpoint('http://example.com/api')
		class App extends Api {
			constructor(state){
				super(state);

				this.products = endpoint('http://example.com/products')(
					link(this, new Search())
				)
				this.people = remote('/people')(
					link(this, new Search())
				)
			}
		}
		const app = new App();
		expect(app.products.__endpoint).to.equal('http://example.com/products');
		expect(app.__endpoint).to.equal('http://example.com/api');

		expect(fetched.length).to.equal(0);
		app.products.fetch('?q=TEST');
		expect(fetched[fetched.length - 1]).to.equal('http://example.com/products?q=TEST');
		app.people.fetch();
		expect(fetched[fetched.length - 1]).to.equal('http://example.com/api/people');

		fetched.splice(0, fetched.length);
		expect(fetched.length).to.equal(0);
	});

	it('accepts an optional `url` parameter, scoping calls to fetch to this url', () => {
		@remote
		class Search extends Api {}

		@fetcher(fetch)
		@remote('http://example.com/api')
		class App extends Api {
			constructor(state){
				super(state);

				this.products = remote('/products')(
					link(this, new Search())
				)
				this.people = remote('/people')(
					link(this, new Search())
				)
			}
		}
		const app = new App();
		expect(app.products.fetch).to.be.a('function');

		expect(fetched.length).to.equal(0);

		app.products.fetch('?q=TEST');
		expect(fetched[fetched.length - 1]).to.equal('http://example.com/api/products?q=TEST');
		app.people.fetch('?q=TEST');
		expect(fetched[fetched.length - 1]).to.equal('http://example.com/api/people?q=TEST');

		fetched.splice(0, fetched.length);
		expect(fetched.length).to.equal(0);
	});
});

describe('@fetcher(fetchFunction)', () => {
	it('is a decorator function', () => {
		expect(fetcher).to.be.a('function');
		function myFetch(){}
		@fetcher(myFetch)
		class Test {}
		expect(Test).to.be.a('function');
	});

	it('decorates the target component with a `__fetch` property', () => {
		function myFetch(){}
		@fetcher(myFetch)
		class Test {}
		const test = new Test();
		expect(test).to.have.a.property('__fetch');
		expect(test.__fetch).to.equal(myFetch);
	});

	it('does not affect the results of `Object.keys` on the decorated component', () => {
		class Test1 {}
		const test1 = new Test1();
		function myFetch(){}
		@fetcher(myFetch)
		class Test2 { }
		const test2 = new Test2();
		expect(Object.keys(test1)).to.deep.equal(Object.keys(test2));
	});

	it('works when used as a regular function', () => {
		function myFetch(){}
		const Test = fetcher(myFetch)(class Test { })
		const test = new Test();
		expect(test).to.have.a.property('__fetch');
		expect(test.__fetch).to.equal(myFetch);
	});

	it('can be used on Api classes', () => {
		function myFetch(){}
		const Test = fetcher(myFetch)(class Test extends Api { })
		const test = new Test();
		expect(test).to.have.a.property('__fetch');
		expect(test.__fetch).to.equal(myFetch);
	});

	it('can be used on Api instances', () => {
		function myFetch(){}
		class Test extends Api {}
		const test = fetcher(myFetch)(new Test());
		expect(test).to.have.a.property('__fetch');
		expect(test.__fetch).to.equal(myFetch);
	});

	it('can mix and match classes and instances', () => {
		function myFetch(){}
		function myOtherFetch(){}
		@fetcher(myFetch)
		class Search extends Api {}
		const search = new Search();
		expect(search.__fetch).to.equal(myFetch);

		class App extends Api {
			constructor(state){
				super(state);

				this.products = fetcher(myOtherFetch)(
					link(this, new Search())
				);

				this.people = link(this, new Search());
			}
		}
		const app = new App();
		expect(app.products.__fetch).to.equal(myOtherFetch);
		expect(app.people.__fetch).to.equal(myFetch);
	});

	it('causes the given `fetchFunction` to be used instead of the default one', () => {
		let fetchCalled = false;
		function myFetch(){fetchCalled=true;}
		@fetcher(myFetch)
		@remote
		class Test{}
		const test = new Test();
		expect(fetched.length).to.equal(0);
		expect(fetchCalled).to.equal(false);
		test.fetch();
		expect(fetchCalled).to.equal(true);
		expect(fetched.length).to.equal(0);
	});
});
