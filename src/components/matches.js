const matches = path => {
  // -외의 다른 특수문자 X (- 만 와야하고)
  // (-가 한번만 와야 하고 처음과 끝은 안됨)
  // (영소문자, 숫자 만 가능)
  // true is redirection
  // false is non-redirection
  // all process is here
  // year에 2008부터 현재까지만 입력 받고 문자는 안되게 하기
  const matched = path.match(
    /[a-zA-Z,0-9]([a-zA-Z,0,9,\-]+([a-zA-Z,0-9]))?([a-zA-Z,0-9]?)\/?([0-9]+)?[0-9]?$/gi // chegrad/ 가능 -che 불가 che- 불가 che/20c 불가 che/20 가능 che/- 불가
  );
  console.log(matched);
  if (matched === null) {
    return true;
  } else {
    if (matched.join() === path) return false;
    else return true;
  }
};

export default matches;

// [a-zA-Z,0-9]([a-zA-Z,0,9,\-]+([a-zA-Z,0-9]))?([a-zA-Z,0-9]?)\/?([0-9]+)?[0-9]?$
