import loadScript from '../modules/loadScript.js';

const Chart = datas => {
  const promise = loadScript('https://cdn.jsdelivr.net/npm/chart.js');
  promise.then(() => {
    const { Chart } = window;
    const dates = [...Object.keys(datas)];
    const contributions = [...Object.values(datas)];
    const isOneData = Object.keys(datas).length === 1 ? true : false;
    const data = {
      labels: isOneData ? [...dates, ...dates] : dates, // label만 표시하는 것만 월만 제공하게 합니다!
      datasets: [
        {
          label: 'Contribution',
          data: isOneData
            ? [...contributions, ...contributions]
            : contributions,
          borderColor: 'rgb(65, 105, 225)',
          backgroundColor: 'rgba(0, 0, 0, 0)', // 무색
          pointBorderColor: 'rgba(0, 0, 0, 0)',
          pointStyle: 'circle',
          pointRadius: 20,
          pointHoverRadius: 25, // 이것은 배경은 없지만 hover된 상태에서는 크기가 남아있기 때문에 그 point를 벗어나더라도 이 크기의 범위 내에서는 유지가 되므로 재밌는 인터렉티브한 animation을 구현할 수 있다
        },
      ],
      grid: {
        display: false, //뒷배경 라인 없애기
      },
    };

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        scales: {
          yAxes: {
            ticks: {
              display: false, // this removes only the x-label
            },
            grid: {
              drawBorder: false, // y axis line removes
              display: false, // line removes
            },
          },
          y: {
            display: false, // line removes
            ticks: {
              display: false, // old ticks remove
            },
          },
          xAxes: {
            ticks: {
              display: false, // this removes only the x-label
            },
            grid: {
              drawBorder: false, // x axis line removes
              display: false, // line removes
            },
          },
          x: {
            display: false, // line removes
            ticks: {
              display: false, // old ticks remove
            },
          },
        },
        plugins: {
          tooltip: {
            displayColors: false,
            titleFont: {
              weight: 500,
              size: 16,
            },

            bodyFont: {
              size: 14,
              weight: 500,
            },
          },
          legend: {
            display: false, // 하나의 레이블을 사용할때 상단의 레이블을 제거할 수 있습니다
          },
        },
      },
    };
    const myChart = new Chart(document.getElementById('myChart'), config);
  });
  // contributions = { 2020-01-01: 321, ... }
};

export default Chart;
