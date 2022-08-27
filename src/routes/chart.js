// 'https://cdn.jsdelivr.net/combine/npm/echarts@5.3.3/dist/echarts.esm.min.js,npm/echarts@5.3.3/dist/echarts.esm.min.js';
const loadScript = url => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.onload = function onload() {
      resolve(null);
    };
    script.onerror = function onerror() {
      reject();
    };
    script.src = url;
    if (!document || !document.head) return;
    document.head.appendChild(script);
  });
};
const chart = contributions => {
  const promise = loadScript(
    'https://cdn.jsdelivr.net/npm/echarts@5.3.3/dist/echarts.min.js'
  );
  promise.then(() => {
    const { echarts } = window;
    if (!echarts) return;
    const options = {};
  });
  // contributions = { 2020-01-01: 321, ... }
};

export default chart;
