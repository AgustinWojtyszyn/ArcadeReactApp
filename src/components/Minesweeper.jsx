
import React, { useState } from "react";
import GameMenu from "./GameMenu";

const SIZE = 8;
const MINES = 10;

function generateBoard() {
  const board = Array(SIZE * SIZE).fill({ mine: false, revealed: false, count: 0 });
  let placed = 0;
  while (placed < MINES) {
    const idx = Math.floor(Math.random() * board.length);
    if (!board[idx].mine) {
      board[idx] = { ...board[idx], mine: true };
      placed++;
    }
  }
  // Set counts
  for (let i = 0; i < board.length; i++) {
    if (board[i].mine) continue;
    let count = 0;
    const x = i % SIZE, y = Math.floor(i / SIZE);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && nx < SIZE && ny >= 0 && ny < SIZE) {
          if (board[ny * SIZE + nx].mine) count++;
        }
      }
    }
    board[i] = { ...board[i], count };
  }
  return board;
}

export default function Minesweeper() {
  const [board, setBoard] = useState(generateBoard());
  const [lost, setLost] = useState(false);
  const [won, setWon] = useState(false);

  function reveal(idx) {
    if (lost || won || board[idx].revealed) return;
    if (board[idx].mine) {
      setLost(true);
      setBoard(board.map(cell => ({ ...cell, revealed: true })));
      return;
    }
    const newBoard = [...board];
    function flood(i) {
      if (newBoard[i].revealed || newBoard[i].mine) return;
      newBoard[i] = { ...newBoard[i], revealed: true };
      if (newBoard[i].count === 0) {
        const x = i % SIZE, y = Math.floor(i / SIZE);
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < SIZE && ny >= 0 && ny < SIZE) {
              flood(ny * SIZE + nx);
            }
          }
        }
      }
    }
    flood(idx);
    setBoard(newBoard);
    // Check win
    if (newBoard.filter(c => !c.mine && c.revealed).length === SIZE * SIZE - MINES) setWon(true);
  }

  function reset() {
    setBoard(generateBoard());
    setLost(false);
    setWon(false);
  }

  return (
    <section>
      <GameMenu />
      <h2 className="retro-title-game">Minesweeper 8-bit</h2>
      <div className="retro-instructions">
        <strong>Instrucciones:</strong> Haz clic en las celdas para descubrirlas. Evita las minas 💣. Si revelas todas las celdas sin mina, ¡ganas! Usa "Reiniciar" para empezar de nuevo.
      </div>
      <div style={{textAlign:"center", marginBottom:"1rem"}}>
        <button className="retro-btn" onClick={reset}>Reiniciar</button>
      </div>
      <div className="minesweeper-board">
        {board.map((cell, idx) => (
          <button
            key={idx}
            className={"minesweeper-cell" + (cell.revealed ? " revealed" : "")}
            onClick={() => reveal(idx)}
            disabled={lost || won}
          >
            {cell.revealed ? (cell.mine ? "💣" : cell.count || "") : ""}
          </button>
        ))}
      </div>
      {lost && <div className="retro-desc">¡Perdiste! 💣</div>}
      {won && <div className="retro-desc">¡Ganaste! 🎉</div>}
    </section>
  );
}