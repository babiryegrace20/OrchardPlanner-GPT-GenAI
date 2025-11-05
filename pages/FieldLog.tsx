import React, { useState } from 'react';

interface FieldLogProps {
  onSubmit: (logText: string) => void;
  isGenerating: boolean;
}

const FieldLog: React.FC<FieldLogProps> = ({ onSubmit, isGenerating }) => {
  const [logText, setLogText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (logText.trim() && !isGenerating) {
      onSubmit(logText);
      setLogText('');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-text-primary">New Field Log</h1>
      <p className="text-brand-text-secondary">Log your observations to get AI-powered insights and alerts. Be as descriptive as possible.</p>

      <form onSubmit={handleSubmit} className="bg-brand-surface p-4 rounded-lg shadow-sm space-y-4">
        <textarea
          value={logText}
          onChange={(e) => setLogText(e.target.value)}
          rows={6}
          placeholder="e.g., 'Spotted 5 apple scab lesions in Block C.' or 'Irrigated Honeycrisp block for 2 hours.'"
          className="w-full p-2 bg-brand-surface border border-gray-300 rounded-md focus:ring-brand-green focus:border-brand-green"
          disabled={isGenerating}
        />
        <button
          type="submit"
          disabled={isGenerating || !logText.trim()}
          className="w-full px-4 py-3 bg-brand-green text-white font-bold rounded-md hover:bg-brand-green-light transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Submit & Analyze'
          )}
        </button>
      </form>
    </div>
  );
};

export default FieldLog;