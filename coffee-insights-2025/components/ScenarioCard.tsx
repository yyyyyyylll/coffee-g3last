import React from 'react';
import { ConsumptionData } from '../types';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface ScenarioCardProps {
  data: ConsumptionData;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  index: number;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({
  data,
  isActive,
  onMouseEnter,
  onMouseLeave,
}) => {
  const Icon = data.icon;
  const diff = (data.value2025 - data.value2024).toFixed(2);
  const isPositive = parseFloat(diff) > 0;
  const isNeutral = parseFloat(diff) === 0;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        relative overflow-hidden rounded-xl border transition-all duration-500 cursor-default group
        ${isActive 
          ? 'bg-amber-50/80 border-amber-500/30 shadow-[0_4px_20px_-2px_rgba(251,191,36,0.2)] translate-x-2' 
          : 'bg-white border-stone-200 hover:bg-stone-50 hover:border-stone-300 shadow-sm'
        }
      `}
    >
      {/* Decorative vertical bar */}
      <div 
        className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300`}
        style={{ backgroundColor: isActive ? data.fill : 'transparent' }} 
      />

      <div className="p-4 md:p-5 flex items-center gap-4 relative z-10">
        {/* Icon Container */}
        <div 
          className={`
            p-3 rounded-xl transition-all duration-300 shrink-0
            ${isActive ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-stone-100 text-stone-500'}
          `}
        >
          <Icon size={24} strokeWidth={1.5} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
                <h3 className={`font-serif text-lg leading-tight transition-colors duration-300 ${isActive ? 'text-stone-900 font-bold' : 'text-stone-700'}`}>
                {data.name}
                </h3>
                <div className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${isActive ? 'max-h-20 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                    <p className="text-stone-500 text-xs leading-relaxed max-w-[90%]">
                        {data.description}
                    </p>
                </div>
            </div>

            {/* Stats Column */}
            <div className="text-right shrink-0 ml-4">
              <div className="flex items-center justify-end gap-1.5">
                  <span className={`text-2xl font-bold tabular-nums ${isActive ? 'text-amber-600' : 'text-stone-800'}`}>
                    {data.value2025}%
                  </span>
              </div>
              
              {/* Trend Indicator */}
              <div className={`flex items-center justify-end gap-1 text-xs font-medium mt-1 ${
                  isPositive ? 'text-emerald-600' : isNeutral ? 'text-stone-400' : 'text-rose-500'
              }`}>
                  <span className="tabular-nums">{Math.abs(parseFloat(diff))}%</span>
                  {isPositive && <ArrowUpRight size={14} />}
                  {!isPositive && !isNeutral && <ArrowDownRight size={14} />}
                  {isNeutral && <Minus size={14} />}
                  <span className="text-[10px] text-stone-400 font-normal uppercase tracking-wider ml-0.5">vs '24</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioCard;