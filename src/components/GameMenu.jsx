import React from "react";
import { useNavigate } from "react-router-dom";

export default function GameMenu() {
  const navigate = useNavigate();
  return (
    <nav className="retro-menu" style={{marginBottom: '2rem'}}>
      <button className="retro-btn" onClick={() => navigate("/")}>🏠 Principal</button>
      <button className="retro-btn" onClick={() => navigate("/minesweeper")}>Minesweeper</button>
      <button className="retro-btn" onClick={() => navigate("/sudoku")}>Sudoku</button>
      <button className="retro-btn" onClick={() => navigate("/catgallery")}>CatGallery</button>
      <button className="retro-btn" onClick={() => navigate("/rickmorty")}>Rick & Morty</button>
    </nav>
  );
}
