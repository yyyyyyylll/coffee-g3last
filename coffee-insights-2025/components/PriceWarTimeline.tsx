import React, { useState, useRef, useEffect } from 'react';
import { TIMELINE_DATA } from '../constants';
import { Tag, TrendingDown, Store, Crown, ArrowRight } from 'lucide-react';

// --- Components ---

const PriceBadge = ({ price, active, position }: { price: string; active: boolean, position: 'top' | 'bottom' }) => (
  <div className={`
    absolute z-20 transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)
    ${position === 'top' ? '-bottom-16 left-1/2 -translate-x-1/2' : '-top-16 left-1/2 -translate-x-1/2'}
    ${active 
      ? 'scale-100 opacity-100 translate-y-0' 
      : `scale-50 opacity-0 ${position === 'top' ? '-translate-y-8' : 'translate-y-8'}`
    }
  `}>
    <div className={`
      relative bg-gradient-to-r from-amber-500 to-amber-600 text-white px-5 py-2 
      shadow-xl shadow-amber-900/20 rounded-full border border-amber-400/50
      flex items-center gap-2 whitespace-nowrap group
    `}>
      {/* Decorative arrow pointing to the node */}
      <div className={`
        absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-600 rotate-45
        ${position === 'top' ? '-top-1.5' : '-bottom-1.5'}
      `} />
      
      <span className="font-serif font-bold text-xl tracking-wide">
        {price}
      </span>
      <Tag size={14} className="opacity-80 group-hover:rotate-12 transition-transform" />
    </div>
  </div>
);

const PriceWarTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle Horizontal Scroll via Wheel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    const handleScroll = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;
      const progress = currentScroll / maxScroll;
      setScrollProgress(progress);

      // Calculate active index based on scroll position + viewport offset
      // We want the item roughly in the center (or slightly left) to be active
      const itemWidth = 600; // approximate width of one section
      const centerOffset = window.innerWidth / 2;
      const rawIndex = Math.floor((currentScroll + centerOffset - 200) / itemWidth);
      const safeIndex = Math.max(0, Math.min(TIMELINE_DATA.length - 1, rawIndex));
      setActiveIndex(safeIndex);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full overflow-x-auto overflow-y-hidden flex items-center relative scroll-smooth hide-scrollbar"
      style={{ cursor: 'grab' }}
    >
      {/* --- BACKGROUND LINE --- */}
      <div className="fixed top-1/2 left-0 right-0 h-px bg-stone-200 z-0" />
      
      {/* --- LIQUID PROGRESS LINE --- */}
      {/* We use a fixed div that grows in width based on scroll, masked by the container flow if needed, 
          but simpler is to have the line absolute inside the scroll container */}
      <div 
        className="absolute top-1/2 left-0 h-[3px] bg-gradient-to-r from-stone-300 via-amber-500 to-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.6)] z-0 transition-all duration-100 ease-out rounded-r-full"
        style={{ 
            width: `${Math.max(window.innerWidth / 2 + (containerRef.current?.scrollLeft || 0), 0)}px`,
        }}
      >
        {/* Glowing Head */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_4px_rgba(251,191,36,0.8)]" />
      </div>


      {/* --- PADDING START --- */}
      <div className="flex-shrink-0 w-[50vw]" />

      {/* --- TIMELINE ITEMS --- */}
      {TIMELINE_DATA.map((event, index) => {
        const isActive = index <= activeIndex;
        const isCurrent = index === activeIndex;
        const isTop = index % 2 === 0; // Alternating layout
        
        return (
          <div 
            key={event.id}
            className="relative flex-shrink-0 w-[500px] h-[60vh] flex flex-col justify-center items-center select-none"
          >
            {/* Connection Line to Node */}
            <div className={`
                absolute left-1/2 top-1/2 w-px bg-stone-200 transition-all duration-700
                ${isTop ? '-translate-y-full origin-bottom' : 'origin-top'}
                ${isActive ? 'h-[100px] bg-amber-300/50' : 'h-[60px]'}
            `} />

            {/* Central Node on the Line */}
            <div className={`
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10
              transition-all duration-500
            `}>
                <div className={`
                    w-4 h-4 rounded-full border-2 
                    ${isActive ? 'bg-amber-500 border-white shadow-lg scale-150' : 'bg-stone-100 border-stone-300'}
                `} />
                
                {/* Date Display near Node */}
                <div className={`
                    absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs font-bold tracking-widest mt-4
                    transition-all duration-500
                    ${isTop ? 'top-6' : '-top-12'}
                    ${isActive ? 'text-amber-600 opacity-100' : 'text-stone-300 opacity-0'}
                `}>
                    {event.date}
                </div>
            </div>

            {/* CONTENT CARD AREA */}
            <div className={`
                absolute w-full px-8 flex flex-col items-center text-center transition-all duration-1000
                ${isTop ? 'bottom-[calc(50%+80px)]' : 'top-[calc(50%+80px)]'}
                ${isActive ? 'opacity-100 translate-y-0' : `opacity-20 ${isTop ? 'translate-y-10' : '-translate-y-10'}`}
            `}>
                
                {/* Price Badge Popping Effect */}
                <PriceBadge price={event.priceTag} active={isCurrent} position={isTop ? 'top' : 'bottom'} />

                {/* Brand Name - Outline to Fill Animation */}
                <div className="relative mb-2">
                    {event.brands.map((brand, i) => (
                        <h2 key={i} 
                            className="font-serif text-6xl md:text-7xl font-black tracking-tighter leading-none whitespace-nowrap relative"
                            style={{ 
                                WebkitTextStroke: '1px #d6d3d1',
                                color: 'transparent'
                            }}
                        >
                            {/* Filled Version Overlay */}
                            <span 
                                className="absolute inset-0 text-stone-900 overflow-hidden transition-all duration-1000 ease-out"
                                style={{ 
                                    width: isActive ? '100%' : '0%',
                                    WebkitTextStroke: '0px',
                                }}
                            >
                                {brand}
                            </span>
                            {brand}
                        </h2>
                    ))}
                </div>

                {/* Title & Description */}
                <div className="max-w-xs mx-auto">
                    <h3 className={`
                        text-lg font-bold text-amber-700 mb-2 transition-all duration-700 delay-200
                        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    `}>
                        {event.title}
                    </h3>
                    <p className={`
                        text-sm text-stone-500 leading-relaxed transition-all duration-700 delay-300
                        ${isActive ? 'opacity-100' : 'opacity-0'}
                    `}>
                        {event.description}
                    </p>
                </div>
                
                {/* Major Event Crown */}
                {event.isMajor && (
                    <div className={`
                        absolute right-12 top-0 text-amber-200 rotate-12 transition-all duration-1000
                        ${isActive ? 'opacity-20 scale-150' : 'opacity-0 scale-50'}
                    `}>
                        <Crown size={100} strokeWidth={1} />
                    </div>
                )}
            </div>

          </div>
        );
      })}

      {/* --- PADDING END --- */}
      <div className="flex-shrink-0 w-[50vw]" />

    </div>
  );
};

export default PriceWarTimeline;