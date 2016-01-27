import { expect } from 'chai';
import { Api, link } from 'redux-apis';

import remote from './redux-fetch-api';

function fetch(url, opts) {
	console.log('fetch(', url, opts ? ', ' : '', opts ? opts : '');
}

describe('@remote(url=\'\', clientUrl=null, onClient=isOnClient())', () => {
	it('is a decorator function', () => {
		expect(remote).to.be.a('function');
		@remote('/test')
		class Test {}
		expect(Test).to.be.a('function');
	});

	it('decorates the target component with a `fetch` method', () => {
		@remote
		class Test { }
		const test = new Test();
		expect(test).to.have.a.property('fetch');
		expect(test.fetch).to.be.a('function');
	});

	it('adds `url` as a property on the added `fetch` method', () => {
		@remote('/test')
		class Test{}
		const test = new Test();
		expect(test.fetch).to.have.a.property('url');
		expect(test.fetch.url).to.equal('/test');
	});

	it('uses either the `url` or `clientUrl` based on the `onClient` flag', () => {
		@remote('/server', '/client', false)
		class Test1{}
		const test1 = new Test1();
		expect(test1.fetch.url).to.equal('/server');
		@remote('/server', '/client', true)
		class Test2{}
		const test2 = new Test2();
		expect(test2.fetch.url).to.equal('/client');
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
	it('can be used on nested components', () => {
		@remote('/inner')
		class Inner extends Api {}
		@remote('/outer')
		class Outer extends Api {constructor(state){super(state); this.inner = link(this, new Inner());}}
		@remote('/other')
		class Other extends Api {constructor(state){super(state); this.inner = link(this, new Inner());}}
		@remote('http://some-server.com/api')
		class Root extends Api {
			constructor(state){
				super(state);
				this.outer = link(this, new Outer());
				this.other = link(this, new Other());
			}
		}
		const root = new Root();

		expect(root.outer.inner.fetch.url).to.equal('/inner');
		expect(root.outer.fetch.url).to.equal('/outer');
		expect(root.other.inner.fetch.url).to.equal('/inner');
		expect(root.other.fetch.url).to.equal('/other');
		expect(root.fetch.url).to.equal('http://some-server.com/api');
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
		@remote('/inner')
		class Inner extends Api {}
		@remote('/outer')
		class Outer extends Api {constructor(state){super(state); this.inner = link(this, new Inner());}}
		@remote('/other')
		class Other extends Api {constructor(state){super(state); this.inner = link(this, new Inner());}}
		@remote('http://some-server.com/api')
		class Root extends Api {
			constructor(state){
				super(state);
				this.outer = link(this, new Outer());
				this.other = link(this, new Other());
			}
		}
		const root = new Root();
		// stub out the root fetch url so we can intercept calls to it
		var saved = root.fetch.url;
		const fetchedUrls = [];
		root.fetch = function(url, opts, abs=false) {
			fetchedUrls.push(abs ? url : this.fetch.url + url);
		}
		root.fetch.url = saved;
		// test scoping
		root.fetch('/TEST');
		expect(fetchedUrls[fetchedUrls.length -1]).to.equal('http://some-server.com/api/TEST');
		root.outer.fetch('/TEST');
		expect(fetchedUrls[fetchedUrls.length -1]).to.equal('http://some-server.com/api/outer/TEST');
		root.outer.inner.fetch('/TEST');
		expect(fetchedUrls[fetchedUrls.length -1]).to.equal('http://some-server.com/api/outer/inner/TEST');
		root.other.fetch('/TEST');
		expect(fetchedUrls[fetchedUrls.length -1]).to.equal('http://some-server.com/api/other/TEST');
		root.other.inner.fetch('/TEST');
		expect(fetchedUrls[fetchedUrls.length -1]).to.equal('http://some-server.com/api/other/inner/TEST');
	});

	it('can be used to perform unscoped fetch by setting `abs` to `true`', () => {
		@remote('/inner')
		class Inner extends Api {}
		@remote('/outer')
		class Outer extends Api {constructor(state){super(state); this.inner = link(this, new Inner());}}
		@remote('/other')
		class Other extends Api {constructor(state){super(state); this.inner = link(this, new Inner());}}
		@remote('http://some-server.com/api')
		class Root extends Api {
			constructor(state){
				super(state);
				this.outer = link(this, new Outer());
				this.other = link(this, new Other());
			}
		}
		const root = new Root();
		// stub out the root fetch url so we can intercept calls to it
		var saved = root.fetch.url;
		const fetchedUrls = [];
		root.fetch = function(url, opts, abs=false) {
			fetchedUrls.push(abs ? url : this.fetch.url + url);
		}
		root.fetch.url = saved;
		// test scoping
		root.fetch('/TEST', null, true);
		expect(fetchedUrls[fetchedUrls.length -1]).to.equal('/TEST');
		root.outer.fetch('/TEST', null, true);
		expect(fetchedUrls[fetchedUrls.length -1]).to.equal('/TEST');
		root.outer.inner.fetch('/TEST', null, true);
		expect(fetchedUrls[fetchedUrls.length -1]).to.equal('/TEST');
		root.other.fetch('/TEST', null, true);
		expect(fetchedUrls[fetchedUrls.length -1]).to.equal('/TEST');
		root.other.inner.fetch('/TEST', null, true);
		expect(fetchedUrls[fetchedUrls.length -1]).to.equal('/TEST');
	});
});

