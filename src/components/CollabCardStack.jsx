import React, { useRef, useEffect, useState } from 'react';

const CollabCardStack = () => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Card data - Only 3 cards as requested
  const cards = [
    {
      id: 1,
      title: "Luckin x Tom & Jerry",
      color: "#FFFFFF",
      textColor: "#000000",
      direction: -1 // First card slides Left
    },
    {
      id: 2,
      title: "Starbucks x Disney",
      color: "#000000",
      textColor: "#FFFFFF",
      direction: 1 // Second card slides Right
    },
    {
      id: 3,
      title: "Luckin x Kweichow Moutai",
      color: "#FFFFFF",
      textColor: "#000000",
      direction: 0 // Last card stays
    }
  ];

  // We need n-1 scroll segments to reveal the last card.
  // The last card stays visible at the end.
  const totalCardsToMove = cards.length - 1;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far we've scrolled into the container
      // Start counting when the top of container hits the top of viewport (or slightly before/after depending on sticky)
      // Since it's sticky, the 'top' will stay at 0 for a while.
      // We need the parent's position relative to the document or calculate based on rect.top.
      
      // Actually, standard sticky behavior:
      // When rect.top <= 0, we are in the sticky phase.
      // The container height is large (e.g. 300vh).
      // The sticky content tracks with us.
      // We want to map the scroll distance within the container to 0-1 progress.
      
      // rect.top is the distance from viewport top to container top.
      // When rect.top is 0, we start.
      // When rect.bottom is windowHeight, we end.
      // Total scrollable distance = containerHeight - windowHeight.
      // Scrolled amount = -rect.top (when rect.top < 0)
      
      const totalScrollableDistance = container.offsetHeight - windowHeight;
      
      let scrolled = -rect.top;
      if (scrolled < 0) scrolled = 0;
      if (scrolled > totalScrollableDistance) scrolled = totalScrollableDistance;
      
      const newProgress = totalScrollableDistance > 0 ? scrolled / totalScrollableDistance : 0;
      setProgress(newProgress);
    };

    // Find the scrollable parent dynamically
    let scrollParent = window;
    let el = containerRef.current;
    
    // Explicitly look for the known overlay class first
    const overlay = document.querySelector('.page-three-overlay');
    if (overlay) {
        scrollParent = overlay;
    } else {
        // Fallback heuristic
        while (el) {
            const style = window.getComputedStyle(el);
            if (['auto', 'scroll'].includes(style.overflowY)) {
                scrollParent = el;
                break;
            }
            el = el.parentElement;
        }
    }

    // Ensure we handle the case where overlay might be hidden initially but is the correct parent
    // If found via querySelector, we trust it.

    scrollParent.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => scrollParent.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        height: '400vh', // Adjust height to control scroll speed
        position: 'relative',
        width: '100%',
        marginBottom: '100px' // Space after
      }}
    >
      <div 
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100vw', // Full viewport width
          marginLeft: 'calc(50% - 50vw)', // Break out of parent container
          marginRight: 'calc(50% - 50vw)', // Break out of parent container
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            position: 'relative',
            width: '667px',
            height: '375px', // 2/3 of previous size
            perspective: '2000px'
          }}
        >
          {cards.map((card, index) => {
            // Logic to determine position based on progress
            // We want card 0 to move first, then card 1, etc.
            // Range for card i: [i / totalCardsToMove, (i+1) / totalCardsToMove]
            
            // Reverse index for rendering order (Last card at bottom of stack in DOM, but visually we want First card on Top)
            // Actually, if we use absolute positioning, the last one in DOM is on top by default.
            // So we should reverse the array for mapping if we want the first item in data to be on top.
            // OR use z-index. Let's use z-index.
            // Card 0: z-index 10
            // Card 1: z-index 9
            // ...
            
            const zIndex = cards.length - index;
            
            // Calculate movement for this specific card
            // Each card moves during its specific slice of the total progress
            const cardStart = index / totalCardsToMove;
            const cardEnd = (index + 1) / totalCardsToMove;
            
            // Normalize progress for this card to 0-1
            let cardProgress = (progress - cardStart) / (cardEnd - cardStart);
            if (cardProgress < 0) cardProgress = 0;
            if (cardProgress > 1) cardProgress = 1;
            
            // If it's the last card, it doesn't move away, it just stays.
            // Actually, the loop goes up to cards.length.
            // But we only want to move cards 0 to n-2. Card n-1 (last one) stays.
            const isLastCard = index === cards.length - 1;
            
            // Random rotation for the "messy stack" look in resting state
            // Use a deterministic "random" based on index so it doesn't jitter on re-render
            const restingRotation = (index * 7 % 10) - 5; // -5 to 5 degrees

            // Card width is 667px
            const CARD_WIDTH = 667;
            
            // Calculate max translation to leave 1/3 visible at the edge
            // Target position: Card center should be at (ScreenEdge + CardWidth/6) * direction
            // Distance = (window.innerWidth / 2) + (CARD_WIDTH / 6)
            const maxTranslate = (window.innerWidth / 2) + (CARD_WIDTH / 6);
            
            // Flat translation only, no rotation
            const currentX = isLastCard ? 0 : cardProgress * maxTranslate * card.direction;
            // Remove rotation for flat sliding look
            const currentRotate = 0; 
            const currentOpacity = 1; // Keep fully visible as requested

            return (
              <div
                key={card.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: card.color,
                  borderRadius: '20px',
                  border: '4px solid #000',
                  color: card.textColor,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: zIndex,
                  transform: `translate(${currentX}px, 0) rotate(${currentRotate}deg)`,
                  opacity: currentOpacity,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  padding: '20px',
                  boxSizing: 'border-box',
                  transition: 'transform 0.1s linear, opacity 0.1s linear', // Smooth out slight jitters
                }}
              >
                <h3 style={{ fontSize: '32px', textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>{card.title}</h3>
                <div style={{ fontSize: '60px', fontWeight: 'bold' }}>+</div>
                <div style={{ marginTop: '20px', fontSize: '18px', opacity: 0.8, fontWeight: 'bold' }}>Limited Edition</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CollabCardStack;
