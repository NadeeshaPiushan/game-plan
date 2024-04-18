import React, { useState } from 'react';
import Draggable, {DraggableCore} from "react-draggable";


function NumberCard({ number, color, onDelete }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (event, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  let cardStyle = {
    backgroundColor: color, // Dynamically set based on color prop
    borderRadius: '10px',
    width: '30px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    cursor: 'grab',
  }

  return (
    <Draggable>
    <div>
        <div style={cardStyle}>{number}</div>
        <button onClick={onDelete}>Delete</button>
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
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };

  return (


    <div style={{marginTop: '10px'}}>
      <h2>Players</h2>
      <input
        type="number"
        value={number}
        onChange={handleNumberChange}
        placeholder="Enter a number"
      />
      <select value={selectedColor} onChange={(event) => setSelectedColor(event.target.value)}>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </select>
      <button onClick={addNumberCard}>Add Number Card</button>
      <div className="cards-container">
        {cards.map((card, index) => (
          <NumberCard
            key={index}
            number={card.number}
            color={card.color}
            onDelete={() => deleteCard(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Players;
