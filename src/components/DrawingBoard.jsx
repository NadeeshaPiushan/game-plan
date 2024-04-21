import React, { useContext, useRef, useState } from 'react';
import DrawingContext from './DrawingContext';

function DrawingBoard() {
  const canvasRef = useRef(null);
  const { strokeColor, lineWidth } = useContext(DrawingContext);

  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  // State to store drawing history
  const [history, setHistory] = useState([]);
  // Pointer to current history state
  let currentIdx = history.length - 1;

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

    // Add current canvas state to history on every draw
    setHistory((prevHistory) => [...prevHistory, ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)]);
    currentIdx = history.length - 1;
  };

  const endDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current.getContext('2d');
    ctx.closePath();
    // Reset globalCompositeOperation here to ensure normal drawing mode
    ctx.globalCompositeOperation = 'source-over';
  };

  const erase = (type) => {
    const ctx = canvasRef.current.getContext('2d');
    if (type === 'partial') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillRect(e.nativeEvent.offsetX, e.nativeEvent.offsetY, lineWidth, lineWidth); // Adjust size based on your needs
    } else {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      // Clear history on full erase
      setHistory([]);
      currentIdx = -1;
    }
    // Reset globalCompositeOperation after erase too
    ctx.globalCompositeOperation = 'source-over';
  };

  const undo = () => {
    if (currentIdx > 0) {
      currentIdx--;
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      // Restore previous canvas state from history
      ctx.putImageData(history[currentIdx], 0, 0);
    }
  };

  const redo = () => {
    if (currentIdx < history.length - 1) {
      currentIdx++;
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      // Restore next canvas state from history
      ctx.putImageData(history[currentIdx], 0, 0);
    }
  };

  const handleColorChange = (color) => {
    setStrokeColor(color);
  };

  const handleLineWidthChange = (width) => {
    setLineWidth(width);
  };

  return (
    <div className="container">
      <div className="main-content">
        <div className='canv-con' style={{marginBottom: '5px'}}>
          <button onClick={undo}>Undo</button>
          <button onClick={redo}>Redo</button>
          <button onClick={() => erase('partial')}>Erase (Partial)</button>
          <button onClick={() => erase('full')}>Erase (Full)</button>
        </div>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          width="920"
          height="480"
          style={{ position: 'absolute', zIndex: '0' }}
        />
        <br />   
      </div>
    </div>
  );
}

export default DrawingBoard;
