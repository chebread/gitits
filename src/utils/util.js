import debounceFrame from './debounceFrame.js';
import renderRoute from '../components/renderRoute.js';
import helmet from '../components/helmet.js';

const util = () => {
  const options = {
    currentStateKey: 0,
    states: [],
    path: window.location.pathname, // value for render()
  };
  const render = () => {
    // render는 app.js에서 한번만 실행된다!
    _render();
    // 이부분을 Link 함수로 치환한다!
    document.addEventListener('DOMContentLoaded', () => {
      document.body.addEventListener('click', e => {
        if (e.target.nodeName === 'A') {
          const url = e.target.attributes.href.nodeValue;
          if (url.search(/https?:\/\//) === -1) {
            e.preventDefault();
            if (options.states.length != 0) {
              //console.log('a link 초기화');
              // 초기화 함수
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
    helmet(path);
    options.currentStateKey = 0; // like render key = 0
    if (!(path === window.location.pathname)) {
      const url = window.location.origin + path;
      window.history.pushState(null, null, url);
    }
    renderRoute(path);
    window.onpopstate = () => {
      const currnetPath = window.location.pathname;
      if (options.states.length != 0) {
        // 초기화 함수
        options.states = [];
        options.currentStateKey = 0;
      }
      options.path = currnetPath;
      const { path } = options;
      helmet(path);
      renderRoute(path);
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
  const useEffect = (cb, deps) => {
    const oldDeps = options.states[options.currentStateKey];

    let hasChanged = true;
    if (oldDeps) {
      hasChanged = deps.some((d, index) => !Object.is(d, oldDeps[index]));
    }
    if (hasChanged) cb();
    options.states[options.currentStateKey] = deps;
    options.currentStateKey += 1;
  };
  return { render, useState, useEffect };
};

const { render, useState, useEffect } = util();
export { render, useState, useEffect };
