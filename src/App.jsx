

import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Minesweeper from "./components/Minesweeper";
import SudokuSolver from "./components/SudokuSolver";
import CatGallery from "./components/CatGallery";
import RickMortyExplorer from "./components/RickMortyExplorer";
import "./styles/retro.css";

function HomeMenu() {
  const navigate = useNavigate();
  return (
    <div className="retro-home-wrapper">
      <h1 className="retro-arcade-title">
        <span role="img" aria-label="play" style={{marginRight: '12px', fontSize: '2.2rem', verticalAlign: 'middle'}}>▶️</span>
        ArcadeReact App
      </h1>
      <div className="retro-btn-group">
        <button className="retro-btn" onClick={() => navigate("/minesweeper")}>Minesweeper</button>
        <button className="retro-btn" onClick={() => navigate("/sudoku")}>Sudoku Solver</button>
        <button className="retro-btn" onClick={() => navigate("/catgallery")}>CatGallery</button>
        <button className="retro-btn" onClick={() => navigate("/rickmorty")}>Rick & Morty Explorer</button>
      </div>
      <p className="retro-desc">Selecciona un juego para comenzar</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <main className="retro-main">
        <Routes>
          <Route path="/" element={<HomeMenu />} />
          <Route path="/minesweeper" element={<Minesweeper />} />
          <Route path="/sudoku" element={<SudokuSolver />} />
          <Route path="/catgallery" element={<CatGallery />} />
          <Route path="/rickmorty" element={<RickMortyExplorer />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
