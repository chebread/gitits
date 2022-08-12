import debounceFrame from './debounceFrame.js';
import helmet from '../components/helmet.js';
import changePath from '../components/changePath.js';
import renderRoute from '../components/renderRoute.js';
import router from '../components/router.js';

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
  const link = (path, content) => {
    // const f = () => {
    //   console.log(1);
    //   router(path);
    // };
    // var button = document.createElement('button');
    // button.onclick = f;
    // button.innerHTML = content;
    // var div = document.createElement('div');
    // div.appendChild(button);
    // var html = div.innerHTML;
    // console.log(html);
    // return html;
  };
  const render = () => {
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
  return { render, useState, useEffect, link };
};

const { render, useState, useEffect, link } = util();
export { render, useState, useEffect, link };
