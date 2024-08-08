import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [clickedTileIndex, setClickedTileIndex] = useState(null); // New state for tracking clicked tile

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const shuffledTiles = shuffle([...Array(15).keys()].map(x => x + 1).concat(null));
    setTiles(shuffledTiles);
    setMoves(0);
    setTime(0);
    clearInterval(intervalId);
    const newIntervalId = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
    setIntervalId(newIntervalId);
  };

  const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  const canMove = (index) => {
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [
      emptyIndex - 1, emptyIndex + 1, emptyIndex - 4, emptyIndex + 4
    ];
    return validMoves.includes(index);
  };

  const handleTileClick = (index) => {
    if (canMove(index)) {
      const newTiles = [...tiles];
      const emptyIndex = tiles.indexOf(null);
      newTiles[emptyIndex] = tiles[index];
      newTiles[index] = null;
      setTiles(newTiles);
      setMoves(moves + 1);
    }
    setClickedTileIndex(index); // Set the clicked tile index
  };

  return (
    <div className="game-container">
      <h1>15 Puzzle Game</h1>
      <div className="game-info">
        <p>Moves: {moves}</p>
        <p>Time: {time}s</p>
      </div>
      <div className="game-board">
        {tiles.map((tile, index) => (
          <div 
            key={index} 
            className={`tile ${tile === null ? 'empty' : ''} ${index === clickedTileIndex ? 'clicked' : ''}`} 
            onClick={() => handleTileClick(index)}
          >
            {tile}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>New Game</button>
    </div>
  );
};

export default App;
