import React, { useState, useEffect } from 'react';

const ProgressBar = ({ current, goal, showAnimation = false }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const actualPercentage = Math.min((current / goal) * 100, 100);

  useEffect(() => {
    if (showAnimation) {
      // Animate the progress bar fill
      const timer = setTimeout(() => {
        setAnimatedWidth(actualPercentage);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setAnimatedWidth(actualPercentage);
    }
  }, [actualPercentage, showAnimation]);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ 
            width: `${animatedWidth}%`,
            transition: showAnimation ? 'width 2s ease-out' : 'none'
          }}
        >
          <div className="progress-shine"></div>
        </div>
        
        {/* Milestone markers */}
        <div className="milestone-markers">
          {[25, 50, 75, 100].map(milestone => (
            <div 
              key={milestone}
              className={`milestone ${actualPercentage >= milestone ? 'reached' : ''}`}
              style={{ left: `${milestone}%` }}
            >
              <div className="milestone-dot"></div>
              <div className="milestone-label">₹{(goal * milestone / 100).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Current amount indicator */}
      <div 
        className="current-indicator"
        style={{ left: `${Math.min(actualPercentage, 95)}%` }}
      >
        <div className="indicator-arrow"></div>
        <div className="indicator-label">₹{current.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default ProgressBar;