import React, { useState } from 'react';


// Import your three masterpieces from the pages folder
import Home from './pages/Home';
import Portal from './pages/Portal';
import Client from './pages/Client';


export default function App() {
  // This state is the "router". It tracks which page is currently visible.
  // We start on the 'home' landing page by default.
  const [currentView, setCurrentView] = useState('home');


  // These navigation functions will be passed down to your buttons
  const navigateToPortal = () => setCurrentView('portal');
  const navigateToClient = () => setCurrentView('client');
  const navigateToHome = () => setCurrentView('home');


  return (
    <div className="w-full h-screen overflow-hidden bg-[#020617] text-slate-300 font-sans">
     
      {/* THE TRAFFIC COP LOGIC:
        If currentView matches the string, it renders that component.
        We pass the navigation functions as "props" so the buttons inside
        those files know how to talk back to this main App file.
      */}


      {currentView === 'home' && (
        <Home
          onOpenPortal={navigateToPortal}
          onOpenClient={navigateToClient}
        />
      )}


      {currentView === 'portal' && (
        <Portal
          onBack={navigateToHome}
          onOpenClient={navigateToClient}
        />
      )}


      {currentView === 'client' && (
        <Client
          onBack={navigateToPortal}
        />
      )}


    </div>
  );
}

