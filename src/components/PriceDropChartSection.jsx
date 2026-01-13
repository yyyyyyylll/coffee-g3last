import React from 'react';
import ReactECharts from 'echarts-for-react';

const PriceDropChartSection = () => {
  const option = {
    backgroundColor: 'transparent',
    title: {
      text: '2022-2023瑞幸产品单价平均值对比情况',
      left: 'center',
      top: 10,
      textStyle: {
        fontSize: 21,
        color: '#F0ECE5',
        fontFamily: "'SimHei', 'Heiti SC', sans-serif",
        fontWeight: 'normal',
        lineHeight: 24
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      valueFormatter: (value) => value + ' 元'
    },
    toolbox: {
      show: false,
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
      data: ['产品单价平均值', '趋势线'],
      textStyle: {
        color: '#F0ECE5'
      }
    },
    grid: {
      top: 90,
      left: '8%',
      right: '8%',
      bottom: '14%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['2022', '2023'],
        axisPointer: {
          type: 'shadow'
        },
        axisLabel: {
          color: '#F0ECE5'
        },
        axisLine: {
          lineStyle: {
            color: '#F0ECE5'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '产品单价（元）',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#F0ECE5'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(240, 236, 229, 0.2)'
          }
        },
        axisLabel: {
          formatter: '{value}',
          color: '#F0ECE5'
        },
        nameTextStyle: {
          color: '#F0ECE5'
        }
      }
    ],
    series: [
      {
        name: '产品单价平均值',
        type: 'bar',
        barMaxWidth: 60,
        itemStyle: {
          color: '#F4E798'
        },
        tooltip: {
          valueFormatter: function (value) { return value + ' 元'; }
        },
        data: [30.8, 18.3]
      },
      {
        name: '趋势线',
        type: 'line',
        yAxisIndex: 0,
        data: [30.8, 18.3],
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 10,
        lineStyle: {
          color: '#F69E20',
          width: 3
        },
        itemStyle: {
          color: '#F69E20'
        },
        emphasis: {
          focus: 'series'
        },
        tooltip: {
          valueFormatter: function (value) { return value + ' 元'; }
        }
      }
    ],
    graphic: [
      {
        type: 'text',
        left: 'center',
        bottom: 45,
        style: {
          text: '(数据来源：窄门餐眼)',
          fill: '#F0ECE5',
          font: 'normal 14px "SimHei", "Heiti SC", sans-serif'
        }
      }
    ]
  };

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '525px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '5%' }}>
      <ReactECharts option={option} style={{ height: '525px', width: '82%' }} />
    </div>
  );
};

export default PriceDropChartSection;
