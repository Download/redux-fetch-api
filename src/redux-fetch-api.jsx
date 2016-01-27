import Api from 'redux-apis';
import fetch from 'isomorphic-fetch';

function isOnClient() {
	return typeof global === 'undefined';
}

export function remote(url='', clientUrl=null, onClient=isOnClient()) {
	if ((arguments.length === 1) && typeof url == 'function') {
		// invocation without parentheses: @remote
		return remote()(url);
	}
	return (component) => {
		component.prototype.fetch = function scoped_fetch(url, opts, abs=false) {
			url = !abs && this.fetch.url ? this.fetch.url + url : url;
			let r, p = this;
			while (p = p.__parent) {
				if (p.fetch) {
					r = p;
					break;
				}
			}
			return !abs && r ? r.fetch(url, opts, abs) : fetch(url, opts);
		};
		component.prototype.fetch.url = clientUrl && onClient ? clientUrl : url;
		return component;
	}
}

export default remote;
