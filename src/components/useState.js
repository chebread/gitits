import debounceFrame from './debounceFrame.js';
import routes from './routes.js';

// [a] 라우터 변동 마다 값 초기화 하기 (쉬운 방안)
// [b] 라우터의 주소마다 값을 초기화 하지 않기 (값 유지)

// 처음 0 1 2 (3)
// 두번 3 4 5
// 세번 6 7 8
// 내번 9 10 11
// 다섯번 12 13 14
const useState = () => {
  console.log('최초 실행권');
  const render = debounceFrame(() => {
    options.currentStateKey = 0; // 기본 지시 요청값

    routes(window.location.pathname).route(); // 부모 컴포넌트를 재실행 해야 함
  });
  const options = {
    currentStateKey: 0,
    states: [], // init 할때마다 새로 생성하기
  };
  // 처음 useState를 실행할때의 그때의 count값...
  const f = initState => {
    // 이미 state에 기존 값이 존재한다면? => 값은 변동 X 그냥 다시 라우터를 요청! = 값과 key를 초기화 합니다!!
    const { currentStateKey: key, states } = options;
    console.log('start');
    if (states.length === key) {
      states.push(initState);
      //
    }
    const state = states[key];
    const setState = newState => {
      states[key] = newState;
      render();
    };
    options.currentStateKey += 1;
    console.log(options.currentStateKey, options.states);
    return [state, setState];
  };
  return { f };
};

const { f } = useState();
export default f;

// if (options.count === options.states.length) {
//   // 처음 init
//   options.countKey = options.states.length;
//   console.log('first init ' + options.countKey);
// }

// 기본 값을 설정하자 (currney의 )
// 기본 값은 Init의 처음의 state.length를 뜻한다!

// console.log('count ' + options.count);

// if (options.init === 0) options.init = options.count; // 최초 count 값...
// console.log('init value * ' + (options.count - options.init));
