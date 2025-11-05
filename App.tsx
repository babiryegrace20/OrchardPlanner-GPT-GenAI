
import React, { useState, useCallback } from 'react';
import { Page, Task, Alert, LogEntry, ChatMessage } from './types';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import TaskManager from './pages/TaskManager';
import FieldLog from './pages/FieldLog';
import Assistant from './pages/Assistant';
import Alerts from './pages/Alerts';
import { generateAlert } from './services/geminiService';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Prune Block B', completed: false, priority: 'High' },
    { id: '2', text: 'Spray fungicide on Honeycrisp apples', completed: false, priority: 'Medium' },
    { id: '3', text: 'Check irrigation lines in Block A', completed: true, priority: 'Low' },
  ]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([
     { id: 'a1', risk: 'Medium', recommendation: 'Slight risk of powdery mildew due to humidity. Monitor closely.', sourceLog: 'Initial system check', timestamp: new Date().toISOString() }
  ]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleLogSubmit = useCallback(async (logText: string) => {
    setIsGenerating(true);
    const newLog: LogEntry = {
      id: `log-${Date.now()}`,
      text: logText,
      timestamp: new Date().toISOString(),
    };
    setLogs(prev => [newLog, ...prev]);

    try {
      // Mock weather data as per PRD
      const weatherData = "5-day forecast: Temp 75F, Humidity 80%, Rain in 2 days.";
      const aiResponse = await generateAlert(logText, weatherData);
      
      const newAlert: Alert = {
        id: `alert-${Date.now()}`,
        risk: aiResponse.risk,
        recommendation: aiResponse.recommendation,
        sourceLog: logText,
        timestamp: new Date().toISOString(),
      };
      setAlerts(prev => [newAlert, ...prev]);
      setCurrentPage(Page.Alerts);
    } catch (error) {
      console.error("Failed to generate alert:", error);
      const errorAlert: Alert = {
        id: `alert-error-${Date.now()}`,
        risk: 'High',
        recommendation: 'Could not connect to AI assistant. Please check your connection and try again.',
        sourceLog: logText,
        timestamp: new Date().toISOString(),
      };
      setAlerts(prev => [errorAlert, ...prev]);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Dashboard:
        return <Dashboard tasks={tasks} alerts={alerts} navigate={setCurrentPage} />;
      case Page.Tasks:
        return <TaskManager tasks={tasks} setTasks={setTasks} />;
      case Page.FieldLog:
        return <FieldLog onSubmit={handleLogSubmit} isGenerating={isGenerating} />;
      case Page.Assistant:
        return <Assistant chatHistory={chatHistory} setChatHistory={setChatHistory} />;
      case Page.Alerts:
        return <Alerts alerts={alerts} />;
      default:
        return <Dashboard tasks={tasks} alerts={alerts} navigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary font-sans flex flex-col">
      <main className="flex-grow pb-20">
        <div className="max-w-3xl mx-auto p-4">
          {renderPage()}
        </div>
      </main>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;
