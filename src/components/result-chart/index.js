import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getSum, getPercentage } from './util';

require('highcharts/modules/exporting')(Highcharts);

const propTypes = {
  populationTitle: PropTypes.string,
  rawData: PropTypes.arr,
};
const defaultProps = {
  populationTitle: '',
  rawData: [],
};

function ResultChart({
  populationTitle,
  rawData,
}) {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  const chartComponentRef = useRef(null);
  const chart2ComponentRef = useRef(null);
  const populationOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: populationTitle,
      style: {
        color: 'black',
        fontSize: '2rem',
      },
    },
    subtitle: {
      text: '人口數統計',
      style: {
        color: 'black',
        fontSize: '1rem',
      },
    },
    xAxis: {
      title: {
        text: '型態',
      },
      categories: ['共同生活', '獨立生活'],
      crosshair: true,
      max: 1,
    },
    yAxis: {
      min: 0,
      title: {
        align: 'high',
        y: -10,
        x: -15,
        offset: 0,
        rotation: 0,
        text: '數量',
      },
      labels: {
        step: 0,
      },
      tickInterval: 2500,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: '男性',
        data: [getSum(rawData, 'household_ordinary_m'), getSum(rawData, 'household_single_m')],
        color: '#7d5fb2',
      },
      {
        name: '女性',
        data: [getSum(rawData, 'household_ordinary_f'), getSum(rawData, 'household_single_f')],
        color: '#c29fff',
      },
    ],
  };

  const householdOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: '',
    },
    subtitle: {
      text: '戶數統計',
      style: {
        color: 'black',
        fontSize: '1rem',
      },
    },
    xAxis: {
      title: {
        text: '型態',
      },
      categories: ['共同生活', '獨立生活'],
      crosshair: true,
      max: 1,
    },
    yAxis: {
      min: 0,
      title: {
        text: '數量',
      },
      tickInterval: 2500,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        borderRadius: 5,
        dataLabels: {
          enabled: true,
          format: '{point.percentage:.1f} %',
          distance: 50,
          filter: {
            property: 'percentage',
            operator: '>',
            value: 4,
          },
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: [{
      name: 'Households',
      colorByPoint: true,
      data: [{
        name: '共同生活',
        y: getPercentage(rawData, 'household_ordinary_total', 'household_single_total'),
        sliced: true,
        selected: true,
        color: '#626EB2',
      }, {
        name: '獨立生活',
        y: getPercentage(rawData, 'household_single_total', 'household_ordinary_total'),
        sliced: true,
        selected: true,
        color: '#A3B1FF',
      }],
      showInLegend: true,
    },
    ],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={populationOptions}
        ref={chartComponentRef}
        containerProps={{
          style: {
            height: windowSize[0] * 0.41,
            maxHeight: 600,
            minHeight: 400,
          },
        }}
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={householdOptions}
        ref={chart2ComponentRef}
        containerProps={{
          style: {
            height: windowSize[0] * 0.41,
            maxHeight: 600,
            minHeight: 400,
          },
        }}
      />
    </div>
  );
}

ResultChart.propTypes = propTypes;
ResultChart.defaultProps = defaultProps;

export default ResultChart;
