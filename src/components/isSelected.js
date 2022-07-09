const isSelected = (elementYear, parameterYear) => {
  const thisYear = new Date().getFullYear();
  return [parameterYear].join('') === ''
    ? elementYear == thisYear
      ? true // 'chosen'
      : false
    : elementYear == parameterYear // 선택된 년도를 알려주는 로직
    ? true
    : false;
};

export default isSelected;
