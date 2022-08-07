import debounceFrame from './debounceFrame.js';
import renderRoute from './renderRoute.js';

const util = () => {
  const render = (path = window.location.pathname) => {
    options.path = path;
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
    // 404처리는 routes의 동적처리로 해주고 있음
    renderRoute(path); // 특정 컴포넌트를 실행합니다
    //helmet(path);
    window.onpopstate = () => {
      if (options.states) {
        options.states = [];
        options.currentStateKey = 0;
      }
      renderRoute(window.location.pathname);
      //helmet(path);
    };
  });
  const options = {
    currentStateKey: 0, // 이게 바뀌어야 함
    states: [],
    path: '',
  };
  const useState = initState => {
    const { currentStateKey: key, states } = options;
    if (options.states.length === options.currentStateKey) {
      // 처음에 초기화 되는 key를 안다면 꿀인데.
      options.states.push(initState);
    }
    const state = states[key]; // const state = options.states[options.currentStateKey];
    const setState = newState => {
      states[key] = newState;
      render(); // 할때 현재의 state의 key를 전달하여 그
    };
    options.currentStateKey += 1;
    return [state, setState];
  };
  return { useState, render };
};

const { useState, render } = util();
export { useState, render };

// 처음 0 1 2 (3)
// 두번 3 4 5
// 세번 6 7 8
// 내번 9 10 11
// 다섯번 12 13 14
