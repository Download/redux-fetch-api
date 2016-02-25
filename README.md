![version](https://img.shields.io/npm/v/redux-fetch-api.svg) ![license](https://img.shields.io/npm/l/redux-fetch-api.svg) ![installs](https://img.shields.io/npm/dt/redux-fetch-api.svg) ![build](https://img.shields.io/travis/Download/redux-fetch-api.svg) ![mind BLOWN](https://img.shields.io/badge/mind-BLOWN-ff69b4.svg)

# redux-fetch-api <sup><sub>v1.0.0</sub></sup>

**Isomorphic fetch api for use with [redux-apis](https://github.com/download/redux-apis)**

## Installation

```sh
npm install --save redux-fetch-api
```

## Dependencies and imports
redux-fetch-api does not depend on, but is designed to work well with redux-apis.

```js
import { remote, endpoint, fetcher } from 'redux-fetch-api';
```

Or, using ES5 / `require`:

```js
var remote = require('redux-fetch-api').remote;
var endpoint = require('redux-fetch-api').endpoint;
var fetcher = require('redux-fetch-api').fetcher;
```

<sub>*NOTE:* redux-fetch-api depends on a global function `fetch` being available, as
specified by the whatwg [fetch specification](https://fetch.spec.whatwg.org/).
For NodeJS or older browsers, use a polyfill such as [github/fetch](http://github.github.io/fetch/),
[node-fetch](https://github.com/bitinn/node-fetch) or [isomorphic-fetch](https://github.com/bitinn/node-fetch). Alternatively, you can explicitly provide
a fetch implementation using the `@fetcher` decorator function.</sub>


## Usage

Use `@remote` to decorate Apis with a scoped isomorphic `fetch` method.
Set server-side and client-side base-urls for fetching with `@endpoint`

### @remote(url='')

Decorate an Api class with `@remote` to give it it's own scoped version
of `fetch`, just like it has scoped versions of `getState` and `createAction`.

```js
@remote('http://example.com/api')
class App extends Api {
  someFunction() {
    return this.fetch('/products/Wedding+Dresses/')
      .then(() => {
        // here, fetch has completed successfully
      })
      .catch((error) => {
        // Something went wrong
      });
  }
}
```

Or, without relying on the decorators proposal:

```js
const App = remote('http://example.com/api')(
  class App extends Api {
    someFunction() {
      return this.fetch('/products/Wedding+Dresses/')
        .then(() => {
          // here, fetch has completed successfully
        })
        .catch((error) => {
          // Something went wrong
        });
    }
  }
)
```

In both cases, instances of `App` will get a `fetch` method that is scoped
to the URLs that were assigned to it by `@remote` and it's parent Apis.
This allows us to postpone decicions about those URLs to later/higher up
the Api hierarchy.

We can use `@remote` on classes as well as instances. This allows us to only
*declare* that we will be using `.fetch`, but postponing the assignment of
the url to later:

```js
@remote
class MyApi extends Api {
  doIt() {
    return this.fetch('/something');
  }
}

// ...later

const myApp = remote('http://example.com')(
  new MyApi()
)

myApp.doIt(); // fetches 'http://example.com/something'
```

### .fetch(url='', opts=undefined, abs=false)

Any apis decorated with `@remote` will get a `.fetch` method that performs fetch calls
scoped to the current api. When called, it will prefix the given `url` with the url set
by `@remote`. It then traverse the api hierarchy upwards, looking for `fetch` methods.
If it finds one, it delegates to the found method. This allows us to map our entire Api
hierarchy onto urls very easily:

```js
@remote
class Module extends Api {
  doIt() {
    return this.fetch('/something');
  }
}

@remote
class ComplexModule extends Api {
  constructor(state) {
    super(state);
    this.submodule1 = remote('/sub1')(link(this, new Module()));
    this.submodule2 = remote('/sub2')(link(this, new Module()));
  }
}

@remote('http://example.com')
class App extends Api {
  constructor(state) {
    super(state);
    this.moduleA = remote('/modA')(link(this, new Module()));
    this.moduleB = remote('/modB')(link(this, new Module()));
    this.moduleC = remote('/modC')(link(this, new ComplexModule()));
  }
}

const app = new App().init();
app.moduleA.doIt(); // fetches 'http://example.com/modA/something'
app.moduleB.doIt(); // fetches 'http://example.com/modB/something'
app.moduleC.submodule1.doIt(); // fetches 'http://example.com/modC/sub1/something'
app.moduleC.submodule2.doIt(); // fetches 'http://example.com/modC/sub2/something'
```

### @endpoint(url=\'\', altUrl=null, usAlt=runningInBrowser())

Allows you to intervene in the process by which `.fetch` traverses
the parent hierarchy. If it encounters an api with a `fetch` method
and that api is decorated with `@endpoint`, it will stop traversing
at that api and no longer look at the parent of that api.

This allows us to map our api hierarchy to multiple endpoints:

```js
@remote
class Search extends Api {}

@remote('http://example.com/api')
class App extends Api {
  constructor(state){
    super(state);

    this.products = endpoint('http://products.example.com')(
      link(this, new Search())
    )
    this.people = remote('/people')(
      link(this, new Search())
    )
  }
}
app.products.fetch();  // fetches 'http://products.example.com'
app.people.fetch();    // fetches 'http://example.com/api/people'
```

The parameter `altUrl` allows us to use different urls in different
environments. When specified, it will be used if parameter `useAlt`
is truthy. `useAlt` is initialized to the result of `runningInBrowser()`
by default, meaning `altUrl` will be used when running in a browser
environment. You can easily use your own test conditions here.

### @fetcher(fetchMethod)

This decoration allows you to override the default fetch method on any
api you decorate with it. Whether the overridden fetch method is actually
used depends on the position of the api in the hierarchy (due to `.fetch`
traversing it's parents). As such you should set this on the top-level
api and any apis decorated with `@endpoint`.

This library's test scripts make heavy use of `@fetcher` to replace the
default fetch method from
[isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)
with a stub that only tracks which urls have been fetched.


## See also
If you are working with `fetch`, then you are doing async work. If you
inherit from [Async](https://github.com/download/redux-async-api) instead
of from `Api`, you get async state management for free.


## Feedback, suggestions, questions, bugs
Please visit the [issue tracker](https://github.com/download/redux-fetch-api/issues)
for any of the above. Don't be afraid about being off-topic.
Constructive feedback most appreciated!


## Copyright
© 2016, [Stijn de Witt](http://StijnDeWitt.com). Some rights reserved.


## License
[Creative Commons Attribution 4.0 (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/)
