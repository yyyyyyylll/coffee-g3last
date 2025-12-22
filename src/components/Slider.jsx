import React, { useState, useRef, useEffect } from 'react';

const Slider = ({ children }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragHeight, setDragHeight] = useState(0);
    const [expanding, setExpanding] = useState(false);
    const containerRef = useRef(null);
    const curveRef = useRef(null);
    const startY = useRef(0);
    const maxDrag = 150; // Threshold to trigger transition

    const handleStart = (clientY) => {
        if (expanding) return;
        setIsDragging(true);
        startY.current = clientY;
    };

    const handleMove = (clientY) => {
        if (!isDragging || expanding) return;
        const deltaY = startY.current - clientY;
        const newHeight = Math.max(0, deltaY);
        setDragHeight(newHeight);

        if (newHeight > maxDrag) {
            handleComplete();
        }
    };

    const handleEnd = () => {
        if (expanding) return;
        setIsDragging(false);
        setDragHeight(0); // Snap back
    };

    const handleComplete = () => {
        setIsDragging(false);
        setExpanding(true);
        document.body.style.overflow = 'hidden'; // Lock body scroll
    };

    // Handle scroll inside the expanded slider to detect "return to top"
    useEffect(() => {
        const curveEl = curveRef.current;
        if (!curveEl || !expanding) return;

        const handleScroll = () => {
            // Logic to potentially collapse if scrolled to top
            // For now, we rely on the user dragging the handle down or a separate close button if requested.
            // But to emulate "scrolling back up to cover", we can check scrollTop.
            if (curveEl.scrollTop === 0) {
                // If the user tries to scroll up further, we could collapse.
                // This is complex to detect reliably without blocking scroll.
            }
        };

        curveEl.addEventListener('scroll', handleScroll);
        return () => curveEl.removeEventListener('scroll', handleScroll);
    }, [expanding]);

    useEffect(() => {
        const onMouseMove = (e) => handleMove(e.clientY);
        const onMouseUp = () => handleEnd();
        const onTouchMove = (e) => handleMove(e.touches[0].clientY);
        const onTouchEnd = () => handleEnd();

        if (isDragging) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('touchmove', onTouchMove);
            window.addEventListener('touchend', onTouchEnd);
        }

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, [isDragging, expanding]);

    // Base height for the visible curve
    const baseHeight = 220; 

    // Dynamic styles for the expansion animation
    const curveStyle = expanding ? {
        position: 'fixed',
        bottom: 0,
        left: 0,
        height: '100vh', 
        width: '100vw', 
        borderRadius: '0%', 
        transform: 'translateY(0)', 
        transition: 'all 0.8s cubic-bezier(0.5, 0.92, 0.24, 1.15)',
        zIndex: 40, // Below main content (50) but above hero content
        margin: 0,
        overflowY: 'auto', // Enable scrolling within the slider
        overflowX: 'hidden'
    } : {
        height: `${baseHeight + dragHeight}px`,
        transition: isDragging ? 'none' : 'height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    };

    return (
        <div 
            className="pull-trigger-container"
            ref={containerRef}
            onMouseDown={(e) => handleStart(e.clientY)}
            onTouchStart={(e) => handleStart(e.touches[0].clientY)}
        >
            <div 
                className="pull-curve" 
                style={curveStyle}
                ref={curveRef}
            >
                <div className="pull-text" style={{ 
                    opacity: expanding ? 0 : 1, 
                    transition: 'opacity 0.2s',
                    display: expanding ? 'none' : 'flex' // Hide completely when expanded to avoid blocking clicks
                }}>
                    <span className="arrow-icon">↑</span> 
                    {dragHeight > 50 ? " Release to Enter " : " Pull to Explore "}
                    <span className="arrow-icon">↑</span>
                </div>
                
                <div className="slider-content" style={{
                    opacity: expanding ? 1 : 0,
                    pointerEvents: expanding ? 'auto' : 'none',
                    transition: 'opacity 0.5s 0.4s', // Delay fade-in slightly
                    width: '100%',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: '80px' // Space for top area
                }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Slider;
