
import React from 'react';
import { Task, Alert, Page } from '../types';

interface DashboardProps {
  tasks: Task[];
  alerts: Alert[];
  navigate: (page: Page) => void;
}

const riskColorMap = {
  High: 'bg-red-100 text-red-800 border-red-500',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-500',
  Low: 'bg-green-100 text-green-800 border-green-500',
};

const Dashboard: React.FC<DashboardProps> = ({ tasks, alerts, navigate }) => {
  const priorityTasks = tasks.filter(t => !t.completed).slice(0, 3);
  const latestAlert = alerts[0];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-brand-text-primary">Orchard Planner</h1>
        <p className="text-brand-text-secondary">Welcome back! Here's your daily summary.</p>
      </header>

      {/* Weather Card */}
      <div className="bg-brand-surface p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Today's Weather</h2>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-4xl font-bold">75°F</p>
            <p className="text-brand-text-secondary">Sunny with a slight breeze</p>
          </div>
          <div className="text-right">
            <p>Precipitation: 5%</p>
            <p>Humidity: 60%</p>
          </div>
        </div>
      </div>

      {/* AI Alerts Card */}
      {latestAlert && (
        <div className={`border-l-4 p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow ${riskColorMap[latestAlert.risk]}`} onClick={() => navigate(Page.Alerts)}>
           <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">New AI Alert: {latestAlert.risk} Risk</h2>
              <p className="mt-1">{latestAlert.recommendation}</p>
            </div>
            <span className="text-sm font-medium">VIEW</span>
           </div>
        </div>
      )}

      {/* Tasks Card */}
      <div className="bg-brand-surface p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Priority Tasks</h2>
          <button onClick={() => navigate(Page.Tasks)} className="text-brand-green font-semibold">View All</button>
        </div>
        <ul className="space-y-2">
          {priorityTasks.length > 0 ? (
            priorityTasks.map(task => (
              <li key={task.id} className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                <span>{task.text}</span>
              </li>
            ))
          ) : (
            <p className="text-brand-text-secondary">No pending tasks. Great job!</p>
          )}
        </ul>
      </div>

    </div>
  );
};

export default Dashboard;
