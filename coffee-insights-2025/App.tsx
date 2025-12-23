import React from 'react';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 selection:bg-amber-200 selection:text-amber-900 overflow-x-hidden">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] pointer-events-none mix-blend-multiply"></div>
      <Dashboard />
    </div>
  );
};

export default App;