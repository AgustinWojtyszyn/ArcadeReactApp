import React, { useEffect, useState } from "react";
import GameMenu from "./GameMenu";

export default function CatGallery() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  function fetchCats() {
    setLoading(true);
    fetch("https://api.thecatapi.com/v1/images/search?limit=8")
      .then(res => res.json())
      .then(data => {
        setCats(data);
        setLoading(false);
      });
  }
  useEffect(() => { fetchCats(); }, []);
  return (
    <section>
      <GameMenu />
      <h2 className="retro-title-game">CatGallery</h2>
      <div className="retro-instructions">
        <strong>Instrucciones:</strong> Haz clic en "Recargar" para ver nuevas fotos de gatos aleatorios. ¡Disfruta la galería retro!
      </div>
      <div style={{textAlign:"center", marginBottom:"1rem"}}>
        <button className="retro-btn" onClick={fetchCats} disabled={loading}>Recargar</button>
      </div>
      <div className="retro-gallery">
        {cats.map(c =>
          <img key={c.id || c.url} src={c.url} alt="cat" className="retro-cat" />
        )}
      </div>
      {loading && <div className="retro-desc">Cargando...</div>}
    </section>
  );
}