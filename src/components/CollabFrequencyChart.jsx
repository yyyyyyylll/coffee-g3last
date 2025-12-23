import React from 'react';

const CollabFrequencyChart = () => {
  // Raw Data
  const rawData = [
    { brand: '星巴克', year: '2022', count: 6, label: '2022' },
    { brand: '瑞幸', year: '2022', count: 17, label: '2022' },
    { brand: '星巴克', year: '2023', count: 14, label: '2023' },
    { brand: '瑞幸', year: '2023', count: 46, label: '2023' },
    { brand: '星巴克', year: '2024', count: 18, label: '2024' },
    { brand: '瑞幸', year: '2024', count: 37, label: '2024' },
    { brand: '星巴克', year: '2025（M1-11）', count: 18, label: '2025', sublabel: 'M1-11' },
    { brand: '瑞幸', year: '2025（M1-11）', count: 47, label: '2025', sublabel: 'M1-11' },
  ];

  // Group data by year
  const groupedData = rawData.reduce((acc, curr) => {
    const yearKey = curr.year.split('（')[0];
    if (!acc[yearKey]) {
      acc[yearKey] = [];
    }
    acc[yearKey].push(curr);
    return acc;
  }, {});

  const years = Object.keys(groupedData).sort();
  const MAX_COUNT = Math.max(...rawData.map(d => d.count)); // 47
  const MAX_BAR_WIDTH_PERCENT = 45; // 45% of the container half

  // Colors
  const starbucksColor = '#a7f3d0';
  const luckinColor = '#93c5fd';

  // Styles
  const containerStyle = {
    fontFamily: "'Inter', 'Noto Sans SC', sans-serif",
    backgroundColor: 'transparent', // Match page bg or white? Reference has #f7f7f7 but Page 3 is orange. Chart col is white-ish.
    // Chart col in PageThree has: backgroundColor: 'rgba(255, 255, 255, 0.3)'
    padding: '20px',
    borderRadius: '12px',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: '20px',
    textAlign: 'center',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '10px',
    width: '100%'
  };

  const legendStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
    gap: '24px',
    fontSize: '14px',
    fontWeight: 500
  };

  const legendItemStyle = {
    display: 'flex',
    alignItems: 'center'
  };

  const dotStyle = (color) => ({
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: color,
    marginRight: '8px'
  });

  const timelineContainerStyle = {
    position: 'relative',
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
    // gap is handled by margin in rows
  };

  const centerLineStyle = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: 0,
    bottom: 0,
    width: '2px',
    backgroundColor: '#4b5563',
    zIndex: 0
  };

  const yearRowStyle = {
    display: 'flex',
    width: '100%',
    position: 'relative',
    zIndex: 10,
    alignItems: 'center',
    marginBottom: '32px',
    minHeight: '60px' // Ensure enough height
  };

  const halfContainerStyle = (alignItems, paddingRight, paddingLeft) => ({
    width: '50%',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: alignItems,
    paddingRight: paddingRight,
    paddingLeft: paddingLeft,
    boxSizing: 'border-box'
  });

  const barContainerStyle = (flexDirection) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    margin: '4px 0',
    flexDirection: flexDirection
  });

  const barStyle = (widthPercent, color, origin) => ({
    height: '24px',
    minWidth: '20px',
    width: `${widthPercent}%`,
    backgroundColor: color,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'width 0.3s ease-in-out, transform 0.3s ease-in-out',
    transformOrigin: origin,
    justifyContent: origin === 'left' ? 'flex-start' : 'flex-end'
  });

  const countTextStyle = (color) => ({
    fontSize: '12px',
    fontWeight: 'bold',
    padding: '0 4px',
    color: color === starbucksColor ? '#166534' : '#1e40af' // Darker green/blue for text
  });

  const timelineLabelContainerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 20
  };

  const labelBoxStyle = {
    border: '1px solid #000',
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 600,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    whiteSpace: 'nowrap'
  };

  const sublabelStyle = {
    fontSize: '10px',
    fontWeight: 'normal',
    marginTop: '2px'
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>星巴克与瑞幸联名及限定数据（2022-2025M1-11）</div>
      
      <div style={legendStyle}>
        <div style={legendItemStyle}>
          <div style={dotStyle(starbucksColor)}></div>
          <span>星巴克 (Starbucks)</span>
        </div>
        <div style={legendItemStyle}>
          <div style={dotStyle(luckinColor)}></div>
          <span>瑞幸 (Luckin)</span>
        </div>
      </div>

      <div style={timelineContainerStyle}>
        <div style={centerLineStyle}></div>
        
        {years.map((year, index) => {
          const yearData = groupedData[year];
          const firstItem = yearData[0]; // For label info
          const stretchLeft = index % 2 === 0; // 2022(0) Left, 2023(1) Right...
          
          // Data
          const starbucks = yearData.find(d => d.brand === '星巴克');
          const luckin = yearData.find(d => d.brand === '瑞幸');
          
          const renderBar = (item, isLeft) => {
            if (!item) return null;
            const widthPercent = (item.count / MAX_COUNT) * MAX_BAR_WIDTH_PERCENT;
            const color = item.brand === '星巴克' ? starbucksColor : luckinColor;
            
            // If stretching left (bars on left side):
            // Container is flex-row-reverse (starts from right/center). Bar origin is right.
            // If stretching right (bars on right side):
            // Container is flex-row (starts from left/center). Bar origin is left.
            
            const flexDirection = isLeft ? 'row-reverse' : 'row';
            const origin = isLeft ? 'right' : 'left';
            
            return (
              <div key={item.brand} style={barContainerStyle(flexDirection)}>
                <div 
                  className="collaboration-bar" // For hover effect if we can add CSS, otherwise inline hover is hard.
                  // We'll rely on basic style for now.
                  style={barStyle(widthPercent, color, origin)}
                  title={`${item.brand}: ${item.count} 次`}
                >
                  <span style={countTextStyle(color)}>{item.count}</span>
                </div>
              </div>
            );
          };

          return (
            <div key={year} style={yearRowStyle}>
              {/* Left Half */}
              <div style={halfContainerStyle(stretchLeft ? 'flex-end' : 'flex-start', '40px', '0')}>
                {stretchLeft && (
                  <>
                    {renderBar(starbucks, true)}
                    {renderBar(luckin, true)}
                  </>
                )}
              </div>

              {/* Center Label */}
              <div style={timelineLabelContainerStyle}>
                <div style={labelBoxStyle}>
                  <span>{firstItem.label}</span>
                  {firstItem.sublabel && <div style={sublabelStyle}>({firstItem.sublabel})</div>}
                </div>
              </div>

              {/* Right Half */}
              <div style={halfContainerStyle(stretchLeft ? 'flex-end' : 'flex-start', '0', '40px')}>
                {!stretchLeft && (
                  <>
                    {renderBar(starbucks, false)}
                    {renderBar(luckin, false)}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div style={{ fontSize: '10px', color: '#6b7280', marginTop: 'auto', textAlign: 'center' }}>
        数据来源: 星巴克&瑞幸微信公众号，2025年数据截至M11。
      </div>

      <style>{`
        .collaboration-bar:hover {
          transform: scaleX(1.05);
          z-index: 30;
        }
      `}</style>
    </div>
  );
};

export default CollabFrequencyChart;
