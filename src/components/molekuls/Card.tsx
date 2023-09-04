/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from "react";
import { useGetPokemonByNameQuery } from "../../services/api";
import { css, useTheme } from "@emotion/react";
import {Link} from 'react-router-dom'
import { lighten } from "polished";


type typeCard = {
  idParam?: number;
  name: string;
  img: string;
  types: string[];
};

function Card({ idParam, name, img, types }: typeCard) {
  console.log(idParam)
  const theme = useTheme();

  const { data, error, isLoading } = useGetPokemonByNameQuery(name);
  const [isFavorite, setIsFavorite] = useState(false);

  const id = data && data.id;

  console.log(data);

  // Function to add/remove a Pokémon from favorites
  const toggleFavorite = (data) => {
    
    console.log(data.id);
    const favorites = getFavoritesFromLocalStorage();
    console.log(favorites, "variable favorite di fn toogle favorite");

    console.log(isFavorite);

    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(
        (favoriteId) => favoriteId !== data.id
      );
      console.log(updatedFavorites, "update favorite");
      setFavoritesToLocalStorage(updatedFavorites);
      setIsFavorite(false);
    } else {
      // Add to favorites
      const updatedFavorites = [...favorites, data.id];
      console.log(updatedFavorites);
      setFavoritesToLocalStorage(updatedFavorites);
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    const favorites = getFavoritesFromLocalStorage();
    console.log(favorites, "useEffect favorites");
    console.log(id, "useEffect id");

    // Check if the current Pokémon's ID is in the favorites array
    const isCurrentPokemonFavorite = favorites.includes(id);
    console.log(isCurrentPokemonFavorite, "isCurrentPokemonFavorite");

    // Set the isFavorite state based on the check
    setIsFavorite(isCurrentPokemonFavorite);
  }, [id]);

  const getFavoritesFromLocalStorage = () => {
    const favoritesJson = localStorage.getItem("favorites");
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  };

  const setFavoritesToLocalStorage = (favorites: number[]) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };


  const initTipe = data && data.types[0].type.name

  const tipe = initTipe
  
  console.log(`${theme.color.type[tipe]} hayoo`)

  console.log(tipe)


  console.log(theme.color.type.normal)

  const card = css`
  
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  border-radius: 5px;
  padding: 0.5em;
  cursor: pointer;
  transition: 0.1s all ease;
  background: ${theme.color.type[tipe]};

  &:hover {
    transform: scale(1.02);
    transition: 0.1s all ease;
  }
`;

  return (
  
    <div css={card}  className="flex flex-col  max-w-screen-lg border border-red-500 w-1/3">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        data && (
          <>
            <p>{data.id}</p>
            <p>{data.name}</p>
            <p>{data.types[0].type.name}</p>
            <img src={data.sprites.front_default} />
            <button onClick={() => toggleFavorite(data)}>
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </>
        )
        )}
    </div>
        
  );
}

export default Card;
