import React, { useContext, useRef, useState } from 'react';
import DrawingContext from './DrawingContext';

function DrawingBoard() {
  const canvasRef = useRef(null);
  const { strokeColor, lineWidth, } = useContext(DrawingContext);

  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
 

  const startDrawing = (e) => {
    setIsDrawing(true);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
    setLastX(e.nativeEvent.offsetX);
    setLastY(e.nativeEvent.offsetY);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
    setLastX(e.nativeEvent.offsetX);
    setLastY(e.nativeEvent.offsetY);
  };

  const endDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current.getContext('2d');
    ctx.closePath();
  };

  // Update handleColorChange and handleLineWidthChange to use props
  const handleColorChange = (color) => {
    setStrokeColor(color);
  };

  const handleLineWidthChange = (width) => {
    setLineWidth(width);
  };

  return (
    <div className="container">
      <div className="main-content">
        <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={endDrawing} width="920" height="480" />
      </div>
    </div>
  );
}

export default DrawingBoard;
