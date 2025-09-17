import React from "react";
function CharacterList({ characters, setSelected, view = "list" }) {
  if (!characters.length) return <p>No se encontraron personajes.</p>;
  return (
    <div className={view === "grid" ? "rm-grid" : "rm-list"}>
      {characters.map(c => (
        <div key={c.id} className="card retro-card" onClick={() => setSelected(c.id)}>
          <img src={c.image} alt={c.name} className="retro-cat" />
          <div>{c.name}</div>
        </div>
      ))}
    </div>
  );
}
export default CharacterList;
