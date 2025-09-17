import React, { useState, useEffect } from "react";
import CharacterList from "./CharacterList";
import SearchBar from "./SearchBar";
import CharacterDetail from "./CharacterDetail";
import GameMenu from "./GameMenu";

function RickMortyExplorer() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("list");

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?name=${search}`)
      .then(res => res.json())
      .then(data => setCharacters(data.results || []));
  }, [search]);

  return (
    <section>
      <GameMenu />
      <h2 className="retro-title-game">Rick & Morty Explorer</h2>
      <div className="retro-instructions">
        <strong>Instrucciones:</strong> Busca personajes por nombre, haz clic para ver detalles y cambia el formato de la vista con los botones. ¡Explora el universo Rick & Morty!
      </div>
      <SearchBar setSearch={setSearch} />
      <div style={{textAlign:"center", marginBottom:"1rem"}}>
        <button className={view==="list"?"retro-btn active":"retro-btn"} onClick={()=>setView("list")}>Vista Lista</button>
        <button className={view==="grid"?"retro-btn active":"retro-btn"} onClick={()=>setView("grid")}>Vista Horizontal</button>
      </div>
      {!selected ? (
        <CharacterList characters={characters} setSelected={setSelected} view={view} />
      ) : (
        <CharacterDetail id={selected} goBack={() => setSelected(null)} />
      )}
    </section>
  );
}

export default RickMortyExplorer;
