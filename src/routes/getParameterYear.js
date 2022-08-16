const getParameterYear = () => {
  const values = {
    data: undefined,
    init: false,
  };
  const f = year => {
    const { init, data } = values;
    if (year === null && init === false) {
      values.init = true;
      values.data = undefined;
    }
    if (year != undefined && year != data) values.data = year;
    return data;
  };
  return f;
};

const f = getParameterYear();
export default f;
