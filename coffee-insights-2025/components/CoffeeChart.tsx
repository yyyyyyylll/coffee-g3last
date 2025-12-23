import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Sector
} from 'recharts';
import { ConsumptionData } from '../types';

interface CoffeeChartProps {
  data: ConsumptionData[];
  activeIndex: number | null;
  onHover: (index: number | null) => void;
}

// Custom Active Shape for the Pie Chart
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 4}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        filter="url(#glow)"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 4}
        fill={fill}
        stroke="#fff"
        strokeWidth={2}
      />
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    // Determine if we are hovering the inner (2024) or outer (2025) ring based on the dataKey or name
    const data = payload[0].payload;
    const is2025 = payload[0].name === 'value2025';
    const year = is2025 ? '2025' : '2024';
    const value = is2025 ? data.value2025 : data.value2024;

    return (
      <div className="bg-white/95 backdrop-blur-xl border border-stone-200 p-4 rounded-xl shadow-xl ring-1 ring-stone-900/5 min-w-[160px]">
        <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${is2025 ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-600'}`}>
                {year}
            </span>
            <p className="text-stone-800 font-serif font-bold text-sm">{data.name}</p>
        </div>
        <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-stone-900 tabular-nums">{value}%</span>
        </div>
      </div>
    );
  }
  return null;
};

const CoffeeChart: React.FC<CoffeeChartProps> = ({ data, activeIndex, onHover }) => {
  return (
    <div className="w-full h-[400px] md:h-[500px] relative flex flex-col items-center justify-center">
      
      {/* Center Label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="text-center">
            <p className="text-stone-400 text-xs tracking-widest uppercase mb-1">Comparison</p>
            <p className="text-3xl font-serif text-amber-600 font-bold">24 <span className="text-stone-300">/</span> 25</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            <filter id="glow" height="300%" width="300%" x="-75%" y="-75%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Inner Pie: 2024 Data */}
          <Pie
            data={data as any[]}
            dataKey="value2024"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            stroke="#fafaf9"
            strokeWidth={2}
            {...({ activeIndex: activeIndex !== null ? activeIndex : -1 } as any)}
            activeShape={renderActiveShape}
            onMouseEnter={(_, index) => onHover(index)}
            onMouseLeave={() => onHover(null)}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-inner-${index}`} 
                fill={entry.fill} 
                opacity={activeIndex === index ? 0.8 : 0.4} // Lower opacity for past data
                style={{ transition: 'opacity 0.3s' }}
              />
            ))}
          </Pie>

          {/* Outer Pie: 2025 Data */}
          <Pie
            data={data as any[]}
            dataKey="value2025"
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={140}
            stroke="#fafaf9"
            strokeWidth={3}
            {...({ activeIndex: activeIndex !== null ? activeIndex : -1 } as any)}
            activeShape={renderActiveShape}
            onMouseEnter={(_, index) => onHover(index)}
            onMouseLeave={() => onHover(null)}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-outer-${index}`} 
                fill={entry.fill} 
                style={{ 
                    transition: 'all 0.3s ease',
                    filter: activeIndex === index ? 'drop-shadow(0px 0px 8px rgba(217, 119, 6, 0.4))' : 'none',
                    cursor: 'pointer'
                }}
              />
            ))}
          </Pie>
          
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend / Annotations */}
      <div className="absolute bottom-4 flex gap-6 text-xs text-stone-500">
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-stone-300 opacity-50 border border-stone-400"></div>
            <span>Inner: 2024</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500 border border-amber-600"></div>
            <span>Outer: 2025</span>
         </div>
      </div>
    </div>
  );
};

export default CoffeeChart;