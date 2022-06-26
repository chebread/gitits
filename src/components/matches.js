const matches = path => {
  // -외의 다른 특수문자 X (- 만 와야하고)
  // (-가 한번만 와야 하고 처음과 끝은 안됨)
  // (영소문자, 숫자 만 가능)
  // true is redirection
  // false is non-redirection
  // all process is here
  const matched = path.match(
    /\-$|^\-|\/|\s|\%20|[%\$\#\@\!\~\+\+\_\&\.\,\<\>\:\;\"\'\{\}\[\]\`\)\(\*]/gi
  );
  // input filled 랑은 다르게 해야할 듯
  // user/year 에서 year에 숫자가 안오면 true 반환하기
  // matched의 매치된 / 가 2개 이하 일때는 false 넘기기
  if (!matched) {
    // null => true
    return false;
  } else {
    console.log(matched);
    if (matched.join() === '/') {
      // / === / => false // === / => true
      return false;
    }
    return true;
  } // is => true
};

export default matches;
