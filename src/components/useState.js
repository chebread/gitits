const useState = (initState, render) => {
  function debounceFrame(callback) {
    let nextFrameCallback = -1;
    return () => {
      cancelAnimationFrame(nextFrameCallback);
      nextFrameCallback = requestAnimationFrame(callback);
    };
  }
  const options = {
    currentStateKey: 0,
    states: [],
  };
  const { currentStateKey: key, states } = options;
  if (states.length === key) states.push(initState);

  const state = states[key];
  const setState = newState => {
    states[key] = newState;
    debounceFrame(() => render());
  };
  options.currentStateKey += 1;
  return [state, setState];
};

export default useState;
