let isomorphicFetch = typeof window == 'object' && window.fetch || global.fetch;

export function remote(url='') {
	// handle invocation without parentheses: @remote
	if (typeof url != 'string') {return remote()(url);}
	return (api) => {
		if (typeof api == 'function') {api.prototype.fetch = scopedFetcher(url);}
		else {api.fetch = scopedFetcher(url).bind(api);}
		return api;
	}
}
export default remote;

export function endpoint(url='', altUrl=null, useAlt=runningInBrowser()) {
	// handle invocation without parentheses: @endpoint
	if (typeof url != 'string') {return endpoint()(url);}
	return (api) => {
		const target = typeof api == 'function' ? api.prototype : api;
		target.__endpoint = (useAlt && altUrl) || url;
		return api;
	}
}

export function fetcher(fetchFunction) {
	return (api) => {
		const target = typeof api == 'function' ? api.prototype : api;
		target.__fetch = fetchFunction;
		return api;
	}
}

function scopedFetcher(baseUrl) {
	return function(url='', opts=undefined, abs=false) {
		if (this.__endpoint) {
			url = abs && url || this.__endpoint + baseUrl + url;
		}
		else {
			url = !abs && baseUrl ? baseUrl + url : url;
			let p = this;
			while (p = p.__parent) {
				if (p.fetch) {
					return p.fetch(url, opts, abs);
				}
			}
		}
		return this.__fetch	? this.__fetch(url, opts) : isomorphicFetch(url, opts);
	}
}

function runningInBrowser() {
	return typeof window == 'object' && typeof global === 'undefined';
}
