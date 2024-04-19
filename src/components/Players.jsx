import React, { useState } from 'react';
import Draggable, {DraggableCore} from "react-draggable";


function NumberCard({ number, color, onDelete }) {
  let cardStyle = {
    backgroundColor: color, // Dynamically set based on color prop
    borderRadius: '10px',
    width: '50px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    cursor: 'grab',
  }

  return (
    <Draggable>
    <div style={{position: 'relative', zIndex:'10', width: '50px'}}>
        <div style={cardStyle}>{number}</div>
        <button onClick={onDelete}>x</button>
    </div>
    </Draggable>
  );
}

function Players() {
  const [number, setNumber] = useState('');
  const [cards, setCards] = useState([]);
  const [selectedColor, setSelectedColor] = useState('blue');

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const addNumberCard = () => {
    if (number) {
      setCards([...cards, { number, color: selectedColor }]);
      setNumber(''); // Clear input field after adding a card
    }
  };

  const deleteCard = (index) => {
    const updatedCards = [...cards]; // Copy the cards array
    updatedCards.splice(index, 1)
    setCards(updatedCards);
    
  };

  return (
    <div style={{marginTop: '10px'}}>
      <h2>Players</h2>
      {/* input the number for numbercard */}
      <input
        type="number"
        value={number}
        onChange={handleNumberChange}
        placeholder="Enter a number"
      />

      {/* select the color for the numbercard */}
      <select value={selectedColor} onChange={(event) => setSelectedColor(event.target.value)}>
        <option value="blue">Blue</option>
        <option value="pink">Pink</option>
      </select>
      {/* adding the numbercard below */}
      <button onClick={addNumberCard}>Add Number Card</button>
      
      <div className="cards-container">
        {cards.map((card, index) => (
          <NumberCard
            key={index}
            number={card.number}
            color={card.color}
            onDelete={() => deleteCard()}
          />
        ))}
      </div>
    </div>
  );
}

export default Players;
