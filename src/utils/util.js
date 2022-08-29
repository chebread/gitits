import debounceFrame from './debounceFrame.js';
import helmet from '../modules/helmet.js';
import changePath from '../modules/changePath.js';
import renderRoute from '../modules/renderRoute.js';

const util = () => {
  const options = {
    stateKey: 0,
    states: [],
    path: window.location.pathname,
  };
  const stateInit = len => {
    if (len != 0) {
      options.states = [];
      options.stateKey = 0;
    }
  };
  const render = () => {
    _render();
    // 이부분을 Link 함수로 치환한다!
    document.addEventListener('DOMContentLoaded', () => {
      document.body.addEventListener('click', e => {
        // 이거 그냥 빨리 link 함수로 치환해야 함
        // a > div > span 일 경우 span이 감지됨 (click event에)
        if (e.target.nodeName === 'A') {
          const url = e.target.attributes.href.nodeValue;
          if (url.search(/https?:\/\//) === -1) {
            // http(s)이 문자열에 포함되어 있지 않다면 SPA형 Link 동작을 실행한다
            e.preventDefault(); // 이거 때문에 초기화 필요
            options.path = url;
            stateInit(options.states.length); // ㅇ
            _render();
          }
        }
      });
    });
  };
  const _render = debounceFrame(() => {
    // change path
    const { path } = options;
    helmet(path);
    changePath(path);
    // component render
    options.stateKey = 0;
    renderRoute(path);
    window.onpopstate = () => {
      // change path
      const currentPath = window.location.pathname;
      options.path = currentPath;
      const { path } = options;
      helmet(path);
      // component render
      stateInit(options.states.length);
      renderRoute(path);
    };
  });
  const useState = initState => {
    const { stateKey: key, states } = options;
    if (options.states.length === options.stateKey) {
      options.states.push(initState);
    }
    const state = states[key];
    const setState = newState => {
      states[key] = newState;
      options.path = window.location.pathname;
      _render();
    };
    options.stateKey += 1;
    return [state, setState];
  };
  const useEffect = (cb, deps) => {
    const oldDeps = options.states[options.stateKey];
    let hasChanged = true;
    if (oldDeps) {
      hasChanged = deps.some((d, index) => !Object.is(d, oldDeps[index]));
    }
    if (hasChanged) cb();
    options.states[options.stateKey] = deps;
    options.stateKey += 1;
  };
  const router = url => {
    // 그저 컴포넌트를 바꾸는 용도이다
    options.path = url;
    stateInit(options.states.length); // ㅇ
    _render();
  };
  return { render, useState, useEffect, router };
};

const { render, useState, useEffect, router } = util();
export { render, useState, useEffect, router };
