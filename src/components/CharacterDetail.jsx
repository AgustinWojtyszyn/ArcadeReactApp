import React, { useEffect, useState } from "react";
function CharacterDetail({ id, goBack }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => res.json())
      .then(setData);
  }, [id]);

  if (!data) return <p>Cargando...</p>;

  return (
    <div>
      <button onClick={goBack}>Volver</button>
      <h2>{data.name}</h2>
      <img src={data.image} alt={data.name} />
      <ul>
        <li>Status: {data.status}</li>
        <li>Species: {data.species}</li>
        <li>Gender: {data.gender}</li>
        <li>Origin: {data.origin.name}</li>
        <li>Location: {data.location.name}</li>
      </ul>
    </div>
  );
}
export default CharacterDetail;
