
import React, { useState, useEffect } from "react";
import { useGetPokemonByNameQuery } from "../../services/api";
import Card from "../components/molekuls/Card"; // Ganti dengan path ke komponen Card yang sesuai
import Navbar from "../components/molekuls/Navbar";

function Favorite() {
  const [favoritePokemonIds, setFavoritePokemonIds] = useState([]);

  useEffect(() => {
    // Ambil daftar ID Pokémon favorit dari local storage
    const favoritesJson = localStorage.getItem("favorites");
    const favoritesArray = favoritesJson ? JSON.parse(favoritesJson) : [];
    setFavoritePokemonIds(favoritesArray);
  }, []);

  return (
    <div className='w-full justify-center flex flex-col text-center items-center'>
    <Navbar />
    
        <p className="font-poppins font-bold text-xl text-zinc-900">Favorites</p>
      {favoritePokemonIds.length === 0 ? (
          <p>Tidak ada Pokémon favorit yang tersimpan.</p>
          ) : (
              <div className='relative flex max-w-screen-md items-center  border border-green-200 justify-around content-center flex-row flex-wrap'>
          {favoritePokemonIds.map((id) => (
              <Card key={id} name={id} />
              ))}
        </div>
      )}
  </div>
  );
}

export default Favorite;

