/** @jsxImportSource @emotion/react */

import { css, useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { useGetPokemonByNameQuery } from "../../services/api";
import { Link } from "react-router-dom";

type typeCard = {
  idParam?: number;
  name?: string;
  img?: string;
  types?: string[];
};

function Card({ idParam, name }: typeCard) {
  console.log(idParam);
  const theme: any = useTheme();

  const { data, error, isLoading } = useGetPokemonByNameQuery(name);
  const [isFavorite, setIsFavorite] = useState(false);

  const id = data && data.id;

  console.log(data);

  // Function to add/remove a Pokémon from favorites
  const toggleFavorite = (data: any) => {
    console.log(data.id);
    const favorites = getFavoritesFromLocalStorage();
    console.log(favorites, "variable favorite di fn toogle favorite");

    console.log(isFavorite);

    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(
        (favoriteId: any) => favoriteId !== data.id
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

  const initTipe = data?.types[0].type.name;

  const tipe = initTipe;

  console.log(`${theme.color.type[tipe]} hayoo`);

  console.log(tipe);

  console.log(theme.color.type.normal);

  const card = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    border-radius: 5px;
    padding: 0.5em;
    transition: 0.1s all ease;
    background: ${theme.color.type[tipe]};

    &:hover {
      transform: scale(1.02);
      transition: 0.1s all ease;
      opacity: 0.8;
    }
  `;

  return (
    <div
      css={card}
      className="flex flex-col mt-2 max-w-screen-lg border border-red-500 w-1/3"
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error...</p>
      ) : (
        data && (
          <div className="w-full text-center items-center flex flex-col border border-red-300">
            <Link to={"/pokemon/" + data.name}>
              <p className="font-poppins font-reguler text-lg text-zinc-900">
                {data.id}
              </p>
              <p className="font-poppins font-bold text-lg text-zinc-900">
                {data.name}
              </p>
            </Link>
            <div className="flex flex-row justify-around w-full border border-red-500">
              <Link to={`/${data?.types[0]?.type?.name}`}>
                <p className="font-poppins font-semibold hover:opacity-90 text-lg text-orange-900">
                  {data.types[0]?.type?.name}
                </p>
              </Link>
              <Link to={`/${data?.types[1]?.type?.name}`}>
                <p className="font-poppins text-purple-900 font-semibold hover:opacity-90 text-lg ">
                  {data.types[1]?.type?.name}
                </p>
              </Link>
            </div>
            <img src={data.sprites?.front_default} alt={data.name} />
            <button
              className="font-poppins bg-slate-50 px-6 rounded-2xl hover:opacity-90 py-2 font-medium  text-zinc-900"
              onClick={() => toggleFavorite(data)}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default Card;
