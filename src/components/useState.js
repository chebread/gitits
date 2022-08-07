import debounceFrame from './debounceFrame.js';
import routes from './routes.js';

// [a] 라우터 변경시에 모든 값을 초기화 하자
// [b] a link도 인식될시에 모든 값을 초기화 하자
// [c] 라우터의 클로저가 해결이 안됨 (a link url) (즉 render와 router라는 것을 분리하여 동시에 사용할 수 있도록 해야 함)

const useState = () => {
  const render = debounceFrame(() => {
    options.currentStateKey = 0;
    routes(window.location.pathname).route(); // 왜 이렇게 해야 하나 c()는 안되나?
  });
  const _render = () => {};
  const options = {
    currentStateKey: 0, // 이게 바뀌어야 함
    states: [],
    key: 0,
  };
  const f = initState => {
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
  return { f };
};

const { f } = useState();
export default f;

// 처음 0 1 2 (3)
// 두번 3 4 5
// 세번 6 7 8
// 내번 9 10 11
// 다섯번 12 13 14
