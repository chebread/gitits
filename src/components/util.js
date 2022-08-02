import router from './router.js';

const util = () => {
  // 클로저의 문제가 많음.
  // 동적으로 url 받아오도록 해야 함
  // const debounceFrame = callback => {
  //   // console.log(1);
  //   let nextFrameCallback = -1;
  //   return () => {
  //     cancelAnimationFrame(nextFrameCallback);
  //     nextFrameCallback = requestAnimationFrame(callback);
  //   };
  // };

  const options = {
    currentStateKey: 0,
    states: [],
  };

  const useState = (initState, c) => {
    const { currentStateKey: key, states } = options;
    if (states.length === key) states.push(initState);

    const state = states[key];
    const setState = newState => {
      states[key] = newState;
      c();
      options.currentStateKey = 0;
    };
    options.currentStateKey += 1;
    return [state, setState];
  };

  // render가 url을 받도록 클로저를 구현해야 한다
  // const _render = debounceFrame(() => {
  //   const url = window.location.pathname;
  //   router(url);
  //   options.currentStateKey = 0;
  // });

  // const render = () => {
  //   _render();
  // };

  return { useState };
};

const { useState } = util();

export { useState };
