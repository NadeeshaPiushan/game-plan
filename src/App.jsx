import React from 'react';
import { useState } from 'react';
import DrawingBoard from './components/DrawingBoard';
import Sidebar from './components/Sidebar';
import DrawingContext from './components/DrawingContext'; // Import the Context
import './App.css';


function App() {
  // previous code
  const [strokeColor, setStrokeColor] = useState('black');
  const [lineWidth, setLineWidth] = useState(3);

  const value = {
    strokeColor,
    lineWidth,
    setStrokeColor,
    setLineWidth,
  };

  return (
    <DrawingContext.Provider value={value}>
      <div className="app-container App">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main-content">
          <DrawingBoard />          
        </div>
      </div>
    </DrawingContext.Provider>
  );
}

export default App;
