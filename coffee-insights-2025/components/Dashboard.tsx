import React, { useState } from 'react';
import PriceWarTimeline from './PriceWarTimeline';
import { Coffee } from 'lucide-react';

const Dashboard: React.FC = () => {
  // For the initial load animation
  const [isLoaded, setIsLoaded] = useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`
      w-full h-screen overflow-hidden bg-stone-50
      transition-opacity duration-1000 ease-out
      ${isLoaded ? 'opacity-100' : 'opacity-0'}
    `}>
      {/* Background Texture */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none mix-blend-multiply"></div>
      
      {/* Minimal Header */}
      <div className="fixed top-8 left-8 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center shadow-lg">
            <Coffee size={20} />
          </div>
          <div>
             <h1 className="font-serif text-xl font-bold text-stone-900 leading-none">Coffee Price War</h1>
             <p className="text-xs text-stone-500 font-mono tracking-widest uppercase mt-1">2023 — 2025 Timeline</p>
          </div>
        </div>
      </div>

      {/* Main Timeline Component */}
      <PriceWarTimeline />

      {/* Scroll Hint */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 text-stone-400 animate-pulse">
        <span className="text-xs font-bold tracking-widest uppercase">Scroll Horizontal</span>
        <div className="w-12 h-px bg-stone-300"></div>
      </div>
    </div>
  );
};

export default Dashboard;