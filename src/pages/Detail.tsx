
import React, { useState, useEffect } from "react";
import { useGetPokemonByNameQuery } from "../../services/api";
import Card from "../components/molekuls/Card"; // Ganti dengan path ke komponen Card yang sesuai

function Detail() {
  const [favoritePokemonIds, setFavoritePokemonIds] = useState([]);

  useEffect(() => {
    // Ambil daftar ID Pokémon favorit dari local storage
    const favoritesJson = localStorage.getItem("favorites");
    const favoritesArray = favoritesJson ? JSON.parse(favoritesJson) : [];
    setFavoritePokemonIds(favoritesArray);
  }, []);

  return (
    <div>
      <h2>Favorite Pokémon</h2>
      {favoritePokemonIds.length === 0 ? (
        <p>Tidak ada Pokémon favorit yang tersimpan.</p>
      ) : (
        <div className="pokemon-list">
          {favoritePokemonIds.map((id) => (
            <Card key={id} name={id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Detail;