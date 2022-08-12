import debounceFrame from './debounceFrame.js';
import helmet from '../components/helmet.js';
import changePath from '../components/changePath.js';
import renderRoute from '../components/renderRoute.js';

const util = () => {
  const options = {
    currentStateKey: 0,
    states: [],
    path: window.location.pathname, // value for render()
  };
  const stateInit = len => {
    if (len != 0) {
      console.log('초기화');
      options.states = [];
      options.currentStateKey = 0;
    }
  };
  const link = () => {};
  const render = () => {
    // render는 app.js에서 한번만 실행된다!
    _render();
    // 이부분을 Link 함수로 치환한다!
    document.addEventListener('DOMContentLoaded', () => {
      document.body.addEventListener('click', e => {
        if (e.target.nodeName === 'A') {
          const url = e.target.attributes.href.nodeValue;
          if (url.search(/https?:\/\//) === -1) {
            e.preventDefault(); // 이거 때문에 초기화 필요
            options.path = url;
            stateInit(options.states.length);
            _render();
          }
        }
      });
    });
  };
  const _render = debounceFrame(() => {
    const { path } = options;
    helmet(path);
    changePath(path);
    options.currentStateKey = 0; // like render key = 0
    renderRoute(path);
    window.onpopstate = () => {
      const currentPath = window.location.pathname;
      options.path = currentPath;
      const { path } = options;
      helmet(path);
      stateInit(options.states.length);
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
  return { render, useState, useEffect, link };
};

const { render, useState, useEffect, link } = util();
export { render, useState, useEffect, link };
