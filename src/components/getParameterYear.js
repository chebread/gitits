const getParameterYear = () => {
  const values = {
    data: undefined,
  };
  const f = year => {
    const { data } = values;
    if (year === null) {
      values.data = undefined;
    }
    if (year != undefined && year != data) values.data = year;
    return values.data;
  };
  return f;
};

const f = getParameterYear();
export default f;
