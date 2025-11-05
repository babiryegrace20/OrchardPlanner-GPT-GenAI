
import React from 'react';
import { Alert } from '../types';

const riskColorMap = {
  High: 'border-red-500 bg-red-50',
  Medium: 'border-yellow-500 bg-yellow-50',
  Low: 'border-green-500 bg-green-50',
};
const riskTextColorMap = {
  High: 'text-red-800',
  Medium: 'text-yellow-800',
  Low: 'text-green-800',
};

const AlertItem: React.FC<{ alert: Alert }> = ({ alert }) => (
  <li className={`border-l-4 p-4 rounded-r-lg shadow-sm ${riskColorMap[alert.risk]}`}>
    <div className="flex justify-between items-start">
      <div>
        <span className={`font-bold ${riskTextColorMap[alert.risk]}`}>{alert.risk} Risk Detected</span>
        <p className="mt-1 text-brand-text-primary">{alert.recommendation}</p>
      </div>
      <span className="text-xs text-brand-text-secondary whitespace-nowrap ml-2">{new Date(alert.timestamp).toLocaleTimeString()}</span>
    </div>
    <p className="mt-2 text-sm text-brand-text-secondary italic">Triggered by: "{alert.sourceLog}"</p>
  </li>
);

const Alerts: React.FC<{ alerts: Alert[] }> = ({ alerts }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-text-primary">AI Alerts</h1>
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-r-lg" role="alert">
        <p className="font-bold">Disclaimer</p>
        <p>AI recommendations are based on provided data and horticultural models. Always confirm with your local extension office before making major changes.</p>
      </div>
      {alerts.length > 0 ? (
        <ul className="space-y-4">
          {alerts.map(alert => <AlertItem key={alert.id} alert={alert} />)}
        </ul>
      ) : (
        <div className="text-center py-10">
          <p className="text-brand-text-secondary">No alerts yet. Submit a field log to get your first AI-powered insight!</p>
        </div>
      )}
    </div>
  );
};

export default Alerts;
