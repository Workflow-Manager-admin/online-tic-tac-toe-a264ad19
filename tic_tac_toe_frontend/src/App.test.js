import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the game board and restart button', () => {
  render(<App />);
  // Check if board exists
  expect(screen.getByRole('grid', { name: /tic tac toe board/i })).toBeInTheDocument();
  // Check for restart button
  expect(screen.getByRole('button', { name: /restart/i })).toBeInTheDocument();
  // Check that status renders
  expect(screen.getByText(/Next player:/i)).toBeInTheDocument();
});

test('board allows moves and displays winner', () => {
  render(<App />);
  const cells = [
    screen.getByTestId('cell-0'),
    screen.getByTestId('cell-1'),
    screen.getByTestId('cell-2'),
    screen.getByTestId('cell-3'),
    screen.getByTestId('cell-4'),
  ];
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[3]); // O
  fireEvent.click(cells[1]); // X
  fireEvent.click(cells[4]); // O
  fireEvent.click(cells[2]); // X wins

  expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();
  // And New Game/restart button present
  expect(screen.getByRole('button', { name: /new game/i })).toBeInTheDocument();
});

test('restart button resets the board', () => {
  render(<App />);
  const cell = screen.getByTestId('cell-0');
  fireEvent.click(cell);
  expect(cell.textContent).toBe('X');
  fireEvent.click(screen.getByRole('button', { name: /restart/i }));
  // Board should clear
  expect(cell.textContent).toBe('');
});
