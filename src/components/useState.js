const useState = initValue => {
  return [state, setState]; // state는 변경되거나 initValue 에서 받아온 값 setState는 state를 바꿀 값
};
