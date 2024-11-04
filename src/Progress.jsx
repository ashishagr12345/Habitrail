import React from 'react'
import './Progress.css' // You'll need to create this CSS file

const Progress = () => {
  const goals = [
    { name: 'Journaling everyday', achieved: 7, target: 7, status: 'Achieved' },
    { name: 'Cooking Practice', achieved: 7, target: 7, status: 'Achieved' },
    { name: 'Vitamin', achieved: 5, target: 7, status: 'Unachieved' },
  ];

  const totalAchieved = 11;
  const totalUnachieved = 6;
  const progressPercentage = 60;

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-brand">HabitRail</div>
        <div className="navbar-menu">
          <a href="#" className="navbar-item">
            <i className="fas fa-home"></i> Home
          </a>
          <a href="#" className="navbar-item active">
            <i className="fas fa-chart-line"></i> Progress
          </a>
          <a href="#" className="navbar-item">
            <i className="fas fa-cog"></i> Settings
          </a>
          <a href="#" className="navbar-item">
            <i className="fas fa-bell"></i>
          </a>
          <a href="#" className="navbar-item">
            <i className="fas fa-user-circle"></i>
          </a>
        </div>
      </nav>
      <div className="progress-container">
        <h1>Progress</h1>
        <div className="progress-header">
          <h2>Progress Report</h2>
          <select>
            <option>This Month</option>
            {/* Add more options if needed */}
          </select>
        </div>
        <h3>Your Goals</h3>
        <div className="progress-circle">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path className="circle-bg" d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="circle" strokeDasharray={`${progressPercentage}, 100`} d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831" />
            <text x="18" y="20.35" className="percentage">{progressPercentage}%</text>
          </svg>
        </div>
        <div className="progress-summary">
          <p>✓ {totalAchieved} Habits goal has achieved</p>
          <p>✗ {totalUnachieved} Habits goal hasn't achieved</p>
        </div>
        <div className="goals-list">
          {goals.map((goal, index) => (
            <div key={index} className="goal-item">
              <div className="goal-progress">
                <div className="progress-bar" style={{ width: `${(goal.achieved / goal.target) * 100}%` }}></div>
              </div>
              <div className="goal-details">
                <p>{goal.name}</p>
                <p>{goal.achieved} from {goal.target} days target</p>
              </div>
              <span className={`goal-status ${goal.status.toLowerCase()}`}>{goal.status}</span>
            </div>
          ))}
        </div>
        <button className="see-all-button">See All</button>
      </div>
    </div>
  );
};

export default Progress
