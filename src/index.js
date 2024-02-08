import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

const playerStyle = {
  'color': 'black',
  'fontSize': '16px',
}

const initialGameBoard = [
  {
    position: 0,
    player: null,
    used: false
  },
  {
    position: 1,
    player: null,
    used: false
  },
  {
    position: 2,
    player: null,
    used: false
  },
  {
    position: 3,
    player: null,
    used: false
  },
  {
    position: 4,
    player: null,
    used: false
  },
  {
    position: 5,
    player: null,
    used: false
  },
  {
    position: 6,
    player: null,
    used: false
  },
  {
    position: 7,
    player: null,
    used: false
  },
  {
    position: 8,
    player: null,
    used: false
  },
];

const winningPattern = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function Board() {
  const [ playerTurn, setPlayerTurn] = useState("X");
  const [ gameBoard, setGameBoard] = useState(initialGameBoard);
  const [ winner, setWinner] = useState(null);

  // useEffect(() => {
   // if (winner) {
   // console.log(`We have a winner! ${winner} wins`);
   // }
  // },[winner]);

  function playsMadeByPlayer(player) {
    return gameBoard.filter(tile => tile.player === player).map(tile => tile.position);
  }

  function winnerCheck() {
    const xPlays = playsMadeByPlayer('X');
    const oPlays = playsMadeByPlayer('O');

    // console.log("X Played: ", xPlays);
    // console.log("O Played: ", oPlays);

    const thereIsAWinner = winningPattern.map(pattern => {
      if (pattern.every( position => xPlays.includes(position) ) ) {
        return 'X';
      }
      if (pattern.every( position => oPlays.includes(position) ) ) {
        return 'O';
      }
    });
    
    if (thereIsAWinner.includes("X")) {
      setWinner("X");
    } else {
      if (thereIsAWinner.includes("O")) {
        setWinner("O");
      }
    }
  }

  useEffect(() => {
   // console.log("GameBoard Updated: ", gameBoard);
    winnerCheck()
  }, [gameBoard, winnerCheck]);
  
  function getDataForPosition(position) {
    const positionalData = gameBoard[position];
    return positionalData;
  }

  function handleSelection(position, player) {
    const positionData = getDataForPosition(position);
    
    if (!positionData.used && !winner) {
      setGameBoard(gameBoard => {
        return gameBoard.map(square => {
          //console.log(`Square.position ${square.position} position: ${position} result ${square.position == position}`)
          const updatedTile = square.position === position ? 
            {
            ...square, 
            used: true, 
            player: player 
          } : square
          return updatedTile;
        });
      });
      setPlayerTurn(player === "X" ? "O" : "X");
    }
  }

  function Square(data) {
    const localData = data.data
    return (
      <div
        className="square"
        onClick={() => handleSelection(localData.position, playerTurn)}
        style={squareStyle}>
        { localData.used && (
          <span style={playerStyle}>{localData.player}</span>
        )}
      </div>
    );
  }

  function resetGame() {
    setGameBoard(initialGameBoard);
    setPlayerTurn("X");
    setWinner(null);
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{playerTurn}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner || 'None'}</span></div>
      <button style={buttonStyle} onClick={resetGame}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square data={getDataForPosition(0)}/>
          <Square data={getDataForPosition(1)}/>
          <Square data={getDataForPosition(2)}/>
        </div>
        <div className="board-row" style={rowStyle}>
          <Square data={getDataForPosition(3)}/>
          <Square data={getDataForPosition(4)}/>
          <Square data={getDataForPosition(5)}/>
        </div>
        <div className="board-row" style={rowStyle}>
          <Square data={getDataForPosition(6)}/>
          <Square data={getDataForPosition(7)}/>
          <Square data={getDataForPosition(8)}/>
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game />);
