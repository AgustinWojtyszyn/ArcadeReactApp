import React from "react";
import { NavLink } from "react-router-dom";
export default function Menu() {
  return (
    <nav className="menu">
      <NavLink to="/" className="link">Home</NavLink>
      <NavLink to="/minesweeper" className="link">Minesweeper</NavLink>
      <NavLink to="/sudoku" className="link">Sudoku Solver</NavLink>
      <NavLink to="/catgallery" className="link">CatGallery</NavLink>
      <NavLink to="/rickmorty" className="link">Rick & Morty Explorer</NavLink>
    </nav>
  );
}