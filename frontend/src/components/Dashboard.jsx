import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import RewardsSection from './RewardsSection';
import axios from 'axios';

const Dashboard = ({ internData, onLogout }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/leaderboard');
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      // Fallback data for demo
      setLeaderboard([
        { name: "Sarah Chen", donationsRaised: 1200, position: 1 },
        { name: "Mike Rodriguez", donationsRaised: 950, position: 2 },
        { name: internData.name, donationsRaised: internData.donationsRaised, position: 3 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = (internData.donationsRaised / internData.goal) * 100;
  const isGoalReached = progressPercentage >= 100;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Welcome, {internData.name}!</h1>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Main Stats Card */}
        <div className="stats-card">
          <div className="stat-item">
            <h3>Your Referral Code</h3>
            <div className="referral-code">
              <span>{internData.referralCode}</span>
              <button className="copy-btn" onClick={() => navigator.clipboard.writeText(internData.referralCode)}>
                📋 Copy
              </button>
            </div>
          </div>

          <div className="stat-item">
            <h3>Total Donations Raised</h3>
            <div className="amount">₹{internData.donationsRaised.toLocaleString()}</div>
            <div className="goal-text">Goal: ₹{internData.goal.toLocaleString()}</div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="progress-section">
          <h3>Progress Toward Goal {isGoalReached && '🎉'}</h3>
          <ProgressBar 
            current={internData.donationsRaised} 
            goal={internData.goal}
            showAnimation={true}
          />
          <div className="progress-stats">
            <span>{progressPercentage.toFixed(1)}% Complete</span>
            <span>₹{(internData.goal - internData.donationsRaised).toLocaleString()} to go</span>
          </div>
        </div>

        {/* Rewards Section */}
        <RewardsSection 
          currentAmount={internData.donationsRaised}
          rewards={internData.rewards || [
            { name: "First Donation", unlocked: true, threshold: 100 },
            { name: "Rising Star", unlocked: true, threshold: 500 },
            { name: "Goal Crusher", unlocked: false, threshold: 1000 },
            { name: "Super Achiever", unlocked: false, threshold: 1500 }
          ]}
        />

        {/* Leaderboard */}
        <div className="leaderboard-section">
          <h3>🏆 Leaderboard</h3>
          {loading ? (
            <div className="loading">Loading leaderboard...</div>
          ) : (
            <div className="leaderboard">
              {leaderboard.map((intern, index) => (
                <div 
                  key={index} 
                  className={`leaderboard-item ${intern.name === internData.name ? 'current-user' : ''}`}
                >
                  <span className="position">#{intern.position}</span>
                  <span className="name">{intern.name}</span>
                  <span className="amount">₹{intern.donationsRaised.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;