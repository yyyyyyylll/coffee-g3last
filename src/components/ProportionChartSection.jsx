import React from 'react';
import ReactECharts from 'echarts-for-react';

const ProportionChartSection = () => {
  const chartData = {
    '年份': ['2020', '2021', '2022', '2023', '2024E'],
    '比例': [18.5, 24.5, 31.1, 40.2, 44.6]
  };

  const option = {
    backgroundColor: 'transparent',
    title: {
      text: '中国现制咖啡在整体咖啡市场中的比例（2020-2024E）',
      left: 'center',
      textStyle: {
        fontSize: 21,
        color: '#F0ECE5',
        fontFamily: "'SimHei', 'Heiti SC', sans-serif", // 黑体
        fontWeight: 'normal',
        lineHeight: 24
      },
      top: 0
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function (params) {
        const item = params[0];
        return `${item.name}<br/>${item.marker}${item.seriesName}: ${item.value} %`;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      containLabel: true,
      top: '18%'
    },
    xAxis: {
      type: 'category',
      data: chartData['年份'],
      axisLabel: {
        interval: 0,
        color: '#F0ECE5'
      },
      axisLine: {
        lineStyle: { color: '#F0ECE5' }
      }
    },
    yAxis: {
      type: 'value',
      name: '比例 (%)',
      min: 0,
      max: 60, // Adjusted for visual balance
      interval: 10,
      axisLabel: {
        formatter: '{value} %',
        color: '#F0ECE5'
      },
      nameTextStyle: {
        color: '#F0ECE5',
        padding: [0, 0, 0, 0]
      },
      splitLine: {
        show: true,
        lineStyle: { color: 'rgba(240, 236, 229, 0.2)' }
      },
      axisLine: {
        show: true,
        lineStyle: { color: '#F0ECE5' }
      }
    },
    series: [
      {
        name: '比例',
        type: 'line',
        itemStyle: {
          color: '#FFB6C1' // Light Pink
        },
        lineStyle: {
          width: 3,
          color: '#FFB6C1'
        },
        data: chartData['比例']
      }
    ]
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', height: '500px' }}>
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
      <div style={{ fontSize: '14px', color: '#F0ECE5', marginTop: '-30px', fontFamily: "'SimHei', 'Heiti SC', sans-serif", fontWeight: 'normal' }}>
        （数据来源：餐宝典）
      </div>
    </div>
  );
};

export default ProportionChartSection;
