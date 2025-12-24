import React from 'react';
import ReactECharts from 'echarts-for-react';

const StoreCountChartSection = () => {
  const option = {
    backgroundColor: 'transparent',
    title: {
      text: '2020-2025中国咖啡门店数量情况',
      left: 'center',
      top: 10,
      textStyle: {
        fontSize: 21,
        color: '#F0ECE5',
        fontFamily: "'SimHei', 'Heiti SC', sans-serif", // 黑体
        fontWeight: 'normal',
        lineHeight: 24
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: { color: '#999' }
      }
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      },
      iconStyle: {
        borderColor: '#F0ECE5'
      }
    },
    legend: {
      top: 45,
      data: ['中国咖啡门店数量', '增长率'],
      textStyle: { color: '#F0ECE5' }
    },
    grid: {
      top: 90,
      left: '8%',
      right: '8%',
      bottom: '12%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['2020', '2021', '2022', '2023', '2024', '2025'],
        axisPointer: { type: 'shadow' },
        axisLabel: { color: '#F0ECE5' },
        axisLine: { lineStyle: { color: '#F0ECE5' } }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '咖啡门店数量（家）',
        axisLine: { show: true, lineStyle: { color: '#F0ECE5' } },
        splitLine: {
          show: true,
          lineStyle: { type: 'dashed', color: 'rgba(240, 236, 229, 0.2)' }
        },
        axisLabel: { formatter: '{value}', color: '#F0ECE5' },
        nameTextStyle: { color: '#F0ECE5' }
      },
      {
        type: 'value',
        name: '增长率（%）',
        min: 0,
        max: 50,
        axisLine: { show: true, lineStyle: { color: '#F0ECE5' } },
        splitLine: { show: false },
        axisLabel: { formatter: '{value}%', color: '#F0ECE5' },
        nameTextStyle: { color: '#F0ECE5' }
      }
    ],
    series: [
      {
        name: '中国咖啡门店数量',
        type: 'bar',
        barMaxWidth: 40,
        itemStyle: { color: '#F0E68C' }, // Light Yellow
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 家';
          }
        },
        data: [108467, 110000, 120000, 170896, 190000, 254730]
      },
      {
        name: '增长率',
        type: 'line',
        yAxisIndex: 1,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { color: '#FFA500', width: 3 },
        itemStyle: { color: '#FFA500' },
        emphasis: { focus: 'series' },
        tooltip: {
          valueFormatter: function (value) {
            return value + ' %';
          }
        },
        data: [null, 1.41, 9.09, 42.42, 11.18, 34.07]
      }
    ]
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', height: '550px' }}>
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
      <div style={{ fontSize: '14px', color: '#F0ECE5', marginTop: '-50px', fontFamily: "'SimHei', 'Heiti SC', sans-serif", fontWeight: 'normal' }}>
        （数据来源：窄门餐眼、餐宝典）
      </div>
    </div>
  );
};

export default StoreCountChartSection;
