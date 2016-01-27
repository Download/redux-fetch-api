![version](https://img.shields.io/npm/v/redux-fetch-api.svg) ![license](https://img.shields.io/npm/l/redux-fetch-api.svg) ![installs](https://img.shields.io/npm/dt/redux-fetch-api.svg) ![build](https://img.shields.io/travis/Download/redux-fetch-api.svg) ![mind BLOWN](https://img.shields.io/badge/mind-BLOWN-ff69b4.svg)

# redux-fetch-api <sup><sub>v0.1.0</sub></sup>

**Isomorphic fetch api for use with [redux-apis](https://github.com/download/redux-apis)**

## Installation

```sh
npm install --save redux-fetch-api
```

## Dependencies and imports
redux-fetch-api does not depend on, but is designed to work well with redux-apis.
redux-fetch-api depends on [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)

```js
import Api, { link } from 'redux-apis';
import remote from 'redux-fetch-api';
```

Or, using ES5 / `require`:

```js
var Api = require('redux-apis').Api;
var link = require('redux-apis').link;
var remote = require('redux-fetch-api').fetch;
```

## Usage
Use `@remote` to decorate Apis with a scoped isomorphic `fetch` method.
Set server-side and client-side base-urls for fetching on the root Api.

### Decorate Api classes with @remote
Decorate an Api class with `@remote` to give it it's own scoped version
of `fetch`, just like it has scoped versions of `getState` and `createAction`.

**@remote**(url=\'\', clientUrl=null, onClient=isOnClient())

We set the url to the end-point for the server and client sides respectively using
the first and second arguments of `@remote` on the root Api:

```js
@remote('http://example.com/api', '/api')
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
remote('http://example.com/api', '/api')(
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
to the URLs that were assigned to `App`. This allows us to postpone decicions
about those URLs to later/higher up the Api hierarchy.

The `clientUrl` side url can be relative. In that case, the browser will use
the base URL of the website and append the relative url to that. The server
url specified at the root level MUST be absolute.

Then, we can use `@remote` to decorate our sub apis using only a relative url. `fetch`
will look at the parent Api (or parent of parent etc) searching for a `fetch` method
and, if found, will call that, passing it's own fetch url + the given url as argument.
This way fetch calls are combined to get the full url. The root level will call the
regular `fetch` from `isomorphic-fetch`. This allows us to reuse the same Api multiple
times, as long as the Api at the REST endpoints is the same.

For example, let us define a reusable `Search` api that fetches `/search` from it's
parent Api:

```js
@remote
class Search extends Api {
  search() {
    return this.fetch('/search', this.filter());
  }
}
```

Then, we can create multiple parent Apis that map the reusable Api to different endpoints:

```js
@remote('/products')
class Products extends Api {
  constructor(state) {
    super(state);
	this.search = link(this, new Search());
  }
}

@remote('/people')
class People extends Api {
  constructor(state) {
    super(state);
	this.search = link(this, new Search());
  }
}
```

Finally, we must make sure we specify the URLs for the endpoint, for the
server and the client, at the top level:

```js
@remote('http://example.com/api', '/api')
class App extends Api {
  constructor(state) {
    super(state);
	this.products = link(this, new Products());
	this.people = link(this, new People());
  }
}
```

Now, we can use the same Api in different contexts and it will
fetch from the different endpoints:


```js
const app = new App().init();

// ends up fetching 'http://example.com/api/products/search' when running
// on the server, or '/api/products/search' when running on the client.
app.products.search();

// ends up fetching 'http://example.com/api/people/search' when running
// on the server, or '/api/people/search' when running on the client.
app.people.search();
```

If you inherit from [Async](https://github.com/download/redux-async-api) instead
of from `Api`, you get async state management for free.


## Feedback, suggestions, questions, bugs
Please visit the [issue tracker](https://github.com/download/redux-fetch-api/issues)
for any of the above. Don't be afraid about being off-topic.
Constructive feedback most appreciated!


## Credits
Credits to [Matt Andrews](https://github.com/matthew-andrews)
and [Jxck](https://github.com/Jxck) for writing
[isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)
on which this library depends.


## Copyright
© 2016, [Stijn de Witt](http://StijnDeWitt.com). Some rights reserved.


## License
[Creative Commons Attribution 4.0 (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/)
