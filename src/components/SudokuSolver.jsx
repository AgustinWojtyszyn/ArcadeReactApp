
import React, { useState } from "react";
import GameMenu from "./GameMenu";

const SIZE = 9;
function emptyBoard() {
  return Array(SIZE * SIZE).fill("");
}

function isValid(board, idx, val) {
  const x = idx % SIZE, y = Math.floor(idx / SIZE);
  for (let i = 0; i < SIZE; i++) {
    if (board[y * SIZE + i] === val) return false;
    if (board[i * SIZE + x] === val) return false;
  }
  const sx = Math.floor(x / 3) * 3, sy = Math.floor(y / 3) * 3;
  for (let dy = 0; dy < 3; dy++) {
    for (let dx = 0; dx < 3; dx++) {
      if (board[(sy + dy) * SIZE + (sx + dx)] === val) return false;
    }
  }
  return true;
}

function solve(board) {
  const b = [...board];
  function backtrack(idx = 0) {
    if (idx === SIZE * SIZE) return true;
    if (b[idx]) return backtrack(idx + 1);
    for (let v = 1; v <= 9; v++) {
      if (isValid(b, idx, String(v))) {
        b[idx] = String(v);
        if (backtrack(idx + 1)) return true;
        b[idx] = "";
      }
    }
    return false;
  }
  return backtrack() ? b : null;
}

export default function SudokuSolver() {
  const [board, setBoard] = useState(emptyBoard());
  const [solved, setSolved] = useState(false);
  const [error, setError] = useState("");

  function handleChange(idx, val) {
    if (!/^[1-9]?$/.test(val)) return;
    const newBoard = [...board];
    newBoard[idx] = val;
    setBoard(newBoard);
    setSolved(false);
    setError("");
  }

  function handleSolve() {
    const result = solve(board);
    if (result) {
      setBoard(result);
      setSolved(true);
      setError("");
    } else {
      setError("No se puede resolver el tablero actual");
    }
  }

  function handleReset() {
    setBoard(emptyBoard());
    setSolved(false);
    setError("");
  }

  return (
    <section>
      <GameMenu />
      <h2 className="retro-title-game">Sudoku Solver</h2>
      <div className="retro-instructions">
        <strong>Instrucciones:</strong> Completa el tablero con números del 1 al 9 sin repetir en filas, columnas ni bloques. Pulsa "Resolver" para que la app lo resuelva automáticamente, o "Limpiar" para reiniciar.
      </div>
      <div style={{textAlign:"center", marginBottom:"1rem"}}>
        <button className="retro-btn" onClick={handleSolve}>Resolver</button>
        <button className="retro-btn" onClick={handleReset}>Limpiar</button>
      </div>
      <div className="sudoku-board">
        {board.map((val, idx) => (
          <input
            key={idx}
            className={"sudoku-cell" + (solved ? " solved" : "")}
            value={val}
            maxLength={1}
            onChange={e => handleChange(idx, e.target.value)}
            disabled={solved}
          />
        ))}
      </div>
      {error && <div className="retro-desc">{error}</div>}
      {solved && <div className="retro-desc">¡Resuelto! 🎉</div>}
    </section>
  );
}