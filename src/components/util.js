import debounceFrame from './debounceFrame.js';
import renderRoute from './renderRoute.js';

const util = () => {
  const options = {
    currentStateKey: 0,
    states: [],
    path: '',
  };
  const render = () => {
    // render는 app.js에서 한번만 실행된다!
    options.path = window.location.pathname;
    _render();
    document.addEventListener('DOMContentLoaded', () => {
      document.body.addEventListener('click', e => {
        if (e.target.nodeName === 'A') {
          const url = e.target.attributes.href.nodeValue;
          if (url.search(/https?:\/\//) === -1) {
            e.preventDefault();
            if (options.states) {
              options.states = [];
              options.currentStateKey = 0;
            }
            options.path = url;
            _render();
          }
        }
      });
    });
  };
  const _render = debounceFrame(() => {
    const { path } = options;
    options.currentStateKey = 0;
    if (!(path === window.location.pathname)) {
      const url = window.location.origin + path;
      window.history.pushState(null, null, url);
    }
    renderRoute(path);
    window.onpopstate = () => {
      if (options.states) {
        options.states = [];
        options.currentStateKey = 0;
      }
      renderRoute(window.location.pathname);
    };
  });
  const useState = initState => {
    const { currentStateKey: key, states } = options;
    if (options.states.length === options.currentStateKey) {
      options.states.push(initState);
    }
    const state = states[key]; // const state = options.states[options.currentStateKey];
    const setState = newState => {
      states[key] = newState;
      options.path = window.location.pathname;
      _render();
    };
    options.currentStateKey += 1;
    return [state, setState];
  };
  return { useState, render };
};

const { useState, render } = util();
export { useState, render };
