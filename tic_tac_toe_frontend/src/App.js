import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Main App component for Tic Tac Toe - modern, minimalistic, responsive UI.
 * - Two-player mode: X and O
 * - Displays interactive game board
 * - Shows current player, winner, or draw status
 * - Allows restart/reset of game
 * - Includes subtle highlight animations and responsive layout
 */
function App() {
  // Possible values: 'X', 'O', null
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [status, setStatus] = useState('Next player: X');
  const [winnerLine, setWinnerLine] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  // Calculate winner
  useEffect(() => {
    const winnerCheck = calculateWinner(board);
    if (winnerCheck) {
      setStatus(`Winner: ${winnerCheck.winner}`);
      setWinnerLine(winnerCheck.line);
      setIsGameOver(true);
    } else if (board.every(cell => cell)) {
      setStatus("It's a draw!");
      setIsGameOver(true);
    } else {
      setStatus(`Next player: ${isX ? 'X' : 'O'}`);
      setWinnerLine([]);
      setIsGameOver(false);
    }
  }, [board, isX]);

  // Handles cell click
  function handleClick(i) {
    if (board[i] || isGameOver) return;
    const next = board.slice();
    next[i] = isX ? 'X' : 'O';
    setBoard(next);
    setIsX(!isX);
  }

  function handleRestart() {
    setBoard(Array(9).fill(null));
    setIsX(true);
    setStatus('Next player: X');
    setWinnerLine([]);
    setIsGameOver(false);
  }

  // For animated highlighting of winning line
  const cellClass = (idx) =>
    [
      "ttt-cell",
      winnerLine.includes(idx) ? "win-highlight" : "",
      board[idx] ? `filled${board[idx]}` : "",
    ]
      .join(" ")
      .trim();

  return (
    <div className="ttt-outer">
      <main className="ttt-main-wrap">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <div className="ttt-status" aria-live="polite">
          {status}
        </div>
        <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
          {board.map((val, idx) => (
            <button
              data-testid={`cell-${idx}`}
              key={idx}
              className={cellClass(idx)}
              onClick={() => handleClick(idx)}
              aria-label={
                val
                  ? `Cell ${idx + 1}, played by ${val}`
                  : `Cell ${idx + 1}, empty`
              }
              disabled={!!val || isGameOver}
            >
              <span className="ttt-cell-content">{val}</span>
            </button>
          ))}
        </div>
        <div className="ttt-controls">
          <button
            className="ttt-btn"
            onClick={handleRestart}
            aria-label="Restart Game"
          >
            {isGameOver ? "New Game" : "Restart"}
          </button>
        </div>
        <footer className="ttt-footer">
          <span>
            <a
              href="https://reactjs.org/"
              className="ttt-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Built with React
            </a>
          </span>
        </footer>
      </main>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Calculate the winner of tic-tac-toe.
 * Returns {winner: "X"|"O", line: [number,number,number]} or null
 */
function calculateWinner(squares) {
  // Winning line indices (rows, cols, diagonals)
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6], // diagonals
  ];
  for (const [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export default App;
