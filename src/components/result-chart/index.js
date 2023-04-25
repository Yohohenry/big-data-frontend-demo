import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getSum, getPercentage } from './util';

require('highcharts/modules/exporting')(Highcharts);

const PREFIX_CLASS = 'result-chart';

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
  const populationOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: populationTitle,
    },
    subtitle: {
      text: '人口數統計',
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
    credits: {
      enabled: false,
    },
    series: [
      {
        name: '男性',
        data: [getSum(rawData, 'household_ordinary_m'), getSum(rawData, 'household_single_m')],
      },
      {
        name: '女性',
        data: [getSum(rawData, 'household_ordinary_f'), getSum(rawData, 'household_single_f')],
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
      }, {
        name: '獨立生活',
        y: getPercentage(rawData, 'household_single_total', 'household_ordinary_total'),
        sliced: true,
        selected: true,
      }],
    },
    ],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={populationOptions}
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={householdOptions}
      />
    </div>
  );
}

ResultChart.propTypes = propTypes;
ResultChart.defaultProps = defaultProps;

export default ResultChart;
