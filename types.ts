
export enum Page {
  Dashboard = 'Dashboard',
  Tasks = 'Tasks',
  FieldLog = 'FieldLog',
  Assistant = 'Assistant',
  Alerts = 'Alerts',
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

export interface LogEntry {
  id: string;
  text: string;
  timestamp: string;
}

export interface Alert {
  id: string;
  risk: 'Low' | 'Medium' | 'High';
  recommendation: string;
  sourceLog: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}
