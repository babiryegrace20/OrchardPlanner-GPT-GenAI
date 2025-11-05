import React, { useState } from 'react';
import { Task } from '../types';

interface TaskManagerProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskItem: React.FC<{
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ task, onToggle, onDelete }) => {
    return (
        <li className="flex items-center justify-between bg-brand-surface p-3 rounded-lg shadow-sm">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                    className="h-5 w-5 rounded text-brand-green focus:ring-brand-green-light"
                />
                <span className={`ml-3 ${task.completed ? 'line-through text-brand-text-secondary' : ''}`}>{task.text}</span>
            </div>
            <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    task.priority === 'High' ? 'bg-red-100 text-red-800' :
                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                }`}>
                    {task.priority}
                </span>
                <button onClick={() => onDelete(task.id)} className="text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </li>
    );
};

const TaskManager: React.FC<TaskManagerProps> = ({ tasks, setTasks }) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        text: newTaskText,
        completed: false,
        priority: priority,
      };
      setTasks(prev => [newTask, ...prev]);
      setNewTaskText('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };
  
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-text-primary">Task Manager</h1>
      
      <form onSubmit={addTask} className="bg-brand-surface p-4 rounded-lg shadow-sm space-y-3">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="e.g., Irrigate Block C"
          className="w-full p-2 bg-brand-surface border border-gray-300 rounded-md focus:ring-brand-green focus:border-brand-green"
        />
        <div className="flex items-center justify-between">
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
                className="p-2 bg-brand-surface border border-gray-300 rounded-md focus:ring-brand-green focus:border-brand-green"
            >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
            </select>
            <button type="submit" className="px-4 py-2 bg-brand-green text-white font-semibold rounded-md hover:bg-brand-green-light">
                Add Task
            </button>
        </div>
      </form>

      <ul className="space-y-3">
        {tasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;