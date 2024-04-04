import React, { createContext, useState } from 'react';

const DrawingContext = createContext({
  strokeColor: 'black',
  lineWidth: 3,
  setStrokeColor: () => {},
  setLineWidth: () => {},
});

export default DrawingContext;
