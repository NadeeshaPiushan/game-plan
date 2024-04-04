import React, { useState, useContext } from 'react';
import DrawingContext from './DrawingContext.jsx';

const Sidebar = ({ onColorChange, onLineWidthChange }) => {
  const { strokeColor, lineWidth, setStrokeColor, setLineWidth } = useContext(DrawingContext);

  const handleColorClick = (color) => {
    setStrokeColor(color);
    onColorChange(color); // Call prop to update DrawingBoard state
  };

  const handleLineWidthChange = (e) => {
    setLineWidth(parseInt(e.target.value));
    onLineWidthChange(parseInt(e.target.value)); // Call prop to update DrawingBoard state
  };

  return (
    <div className="side-menu">
      <h2>Color Picker</h2>
      <button onClick={() => handleColorClick('black')}>Black</button>
      <button onClick={() => handleColorClick('red')}>Red</button>
      <button onClick={() => handleColorClick('blue')}>Blue</button>
      <h2>Line Width</h2>
      <input type="number" value={lineWidth} onChange={handleLineWidthChange} />
    </div>
  );
};

export default Sidebar;
