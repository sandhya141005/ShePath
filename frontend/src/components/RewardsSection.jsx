import React from 'react';

const RewardsSection = ({ currentAmount, rewards }) => {
  const getRewardIcon = (rewardName) => {
    const icons = {
      "First Donation": "🏅",
      "Rising Star": "⭐",
      "Goal Crusher": "🎯",
      "Super Achiever": "🏆",
      "Champion": "👑"
    };
    return icons[rewardName] || "🎖️";
  };

  return (
    <div className="rewards-section">
      <h3>🎁 Rewards & Achievements</h3>
      <div className="rewards-grid">
        {rewards.map((reward, index) => {
          const isUnlocked = reward.unlocked || currentAmount >= reward.threshold;
          const isNext = !isUnlocked && 
            rewards.filter(r => r.unlocked || currentAmount >= r.threshold).length === index;

          return (
            <div 
              key={index}
              className={`reward-card ${isUnlocked ? 'unlocked' : ''} ${isNext ? 'next-reward' : ''}`}
            >
              <div className="reward-icon">
                {getRewardIcon(reward.name)}
              </div>
              <div className="reward-info">
                <h4>{reward.name}</h4>
                <p className="reward-threshold">₹{reward.threshold.toLocaleString()}</p>
                {isUnlocked ? (
                  <span className="reward-status unlocked">✅ Unlocked!</span>
                ) : isNext ? (
                  <span className="reward-status next">
                    ⏳ ₹{(reward.threshold - currentAmount).toLocaleString()} to go
                  </span>
                ) : (
                  <span className="reward-status locked">🔒 Locked</span>
                )}
              </div>
              {isUnlocked && <div className="reward-glow"></div>}
            </div>
          );
        })}
      </div>
      
      {/* Next milestone preview */}
      <div className="next-milestone">
        {(() => {
          const nextReward = rewards.find(r => !r.unlocked && currentAmount < r.threshold);
          if (nextReward) {
            const progress = (currentAmount / nextReward.threshold) * 100;
            return (
              <div className="milestone-preview">
                <h4>Next Milestone: {nextReward.name}</h4>
                <div className="mini-progress">
                  <div className="mini-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <p>₹{(nextReward.threshold - currentAmount).toLocaleString()} away from {getRewardIcon(nextReward.name)} {nextReward.name}</p>
              </div>
            );
          }
          return (
            <div className="milestone-preview completed">
              <h4>🎉 All current milestones completed!</h4>
              <p>Keep raising funds for future rewards</p>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default RewardsSection;