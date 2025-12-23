import React, { useState, useRef, useEffect } from 'react';
import { TIMELINE_DATA } from '../data/priceWarData';
import { Tag, TrendingDown, Store, Crown, ArrowRight } from 'lucide-react';
import './PriceWarTimeline.css';

// --- Components ---

const PriceBadge = ({ price, active, position }) => (
  <div className={`price-badge-wrapper ${position} ${active ? 'active' : `inactive-${position}`}`}>
    <div className="price-badge group">
      {/* Decorative arrow pointing to the node */}
      <div className={`badge-arrow ${position}`} />
      
      <span className="badge-text">
        {price}
      </span>
      <Tag size={14} className="tag-icon" />
    </div>
  </div>
);

const PriceWarTimeline = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle Horizontal Scroll via Wheel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // Check if we are scrolling horizontally (some trackpads do this)
      // or if we want to map vertical wheel to horizontal scroll
      if (e.deltaY !== 0) {
        // Only prevent default if we actually scroll the timeline
        // This allows normal page scroll when at edges if desired, 
        // but for a strong effect, we often capture it.
        // Let's capture it.
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
      const itemWidth = 600; // Width of one section as defined in CSS
      const centerOffset = window.innerWidth / 2;
      
      // Calculate which item is closest to the center
      // We add padding-left (50vw) to the calculation
      const paddingLeft = window.innerWidth / 2;
      const relativeScroll = currentScroll; // Start from 0
      
      // The items start after 50vw padding.
      // So item 0 center is at 50vw + 250px (half width).
      // When scroll is 0, item 0 is at center + 250px? No.
      // Let's rely on simple index math:
      // Scroll moves the items left.
      // We want index where (Index * Width) is roughly equal to Scroll.
      const rawIndex = Math.floor((currentScroll + 250) / itemWidth);
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
      className="price-war-container"
    >
      {/* --- BACKGROUND LINE --- */}
      <div className="timeline-bg-line" />
      
      {/* --- LIQUID PROGRESS LINE --- */}
      <div 
        className="timeline-progress-line"
        style={{ 
            width: `${Math.max(window.innerWidth / 2 + (containerRef.current?.scrollLeft || 0), 0)}px`,
        }}
      >
        {/* Glowing Head */}
        <div className="timeline-progress-head" />
      </div>


      {/* --- PADDING START --- */}
      <div className="timeline-padding" />

      {/* --- TIMELINE ITEMS --- */}
      {TIMELINE_DATA.map((event, index) => {
        const isActive = index <= activeIndex;
        const isCurrent = index === activeIndex;
        const isTop = index % 2 === 0; // Alternating layout
        
        return (
          <div 
            key={event.id}
            className="timeline-item"
          >
            {/* Connection Line to Node */}
            <div className={`connection-line ${isTop ? 'top' : 'bottom'} ${isActive ? 'active' : 'inactive'}`} />

            {/* Central Node on the Line */}
            <div className="central-node">
                <div className={`node-circle ${isActive ? 'active' : 'inactive'}`} />
                
                {/* Date Display near Node */}
                <div className={`node-date ${isTop ? 'top' : 'bottom'} ${isActive ? 'active' : 'inactive'}`}>
                    {event.date}
                </div>
            </div>

            {/* CONTENT CARD AREA */}
            <div className={`content-card ${isTop ? 'top' : 'bottom'} ${isActive ? 'active' : `inactive-${isTop ? 'top' : 'bottom'}`}`}>
                
                {/* Price Badge Popping Effect */}
                <PriceBadge price={event.priceTag} active={isActive} position={isTop ? 'top' : 'bottom'} />

                {/* Brand Name - Outline to Fill Animation */}
                <div style={{ position: 'relative', marginBottom: '0' }}>
                    {event.brands.map((brand, i) => (
                        <h2 key={i} className="brand-name">
                            {/* Filled Version Overlay */}
                            <span 
                                className="brand-name-fill"
                                style={{ width: isActive ? '100%' : '0%' }}
                            >
                                {brand}
                            </span>
                            {brand}
                        </h2>
                    ))}
                </div>

                {/* Title & Description */}
                <div style={{ maxWidth: '20rem', margin: '0 auto' }}>
                    <h3 className={`card-title ${isActive ? 'active' : 'inactive'}`}>
                        {event.title}
                    </h3>
                    <p className={`card-desc ${isActive ? 'active' : 'inactive'}`}>
                        {event.description}
                    </p>
                </div>
                
                {/* Major Event Crown */}
                {event.isMajor && (
                    <div className={`crown-icon ${isActive ? 'active' : 'inactive'}`}>
                        <Crown size={60} strokeWidth={1} />
                    </div>
                )}
            </div>
          </div>
        );
      })}
       {/* --- PADDING END --- */}
       <div className="timeline-padding" />
    </div>
  );
};

export default PriceWarTimeline;
