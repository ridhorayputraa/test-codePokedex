/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import { css, useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

function DetailCard({ data }: any) {
  const theme: any = useTheme();

  const [isFavorite, setIsFavorite] = useState(false);
  const id = data && data.id;
  // console.log(data);

  const initTipe = data?.types[0].type.name;

  const tipe = initTipe;

  const toggleFavorite = (data: any) => {
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

  const card = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
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
      className="relative flex max-w-screen-md border border-green-200 flex-row flex-wrap"
    >
      <img width={"190px"} src={data?.sprites?.front_default} alt={data.name} />
      <div className="bg-slate-50 py-9 relative bottom-4 w-full h-full rounded-2xl">
     <div className="border border-cyan-500">
        <p className="font-poppins font-bold text-3xl text-zinc-900">
          {data.name}
        </p>
        <p className="font-poppins font-normal text-lg text-zinc-900">
          {data.id}
        </p>
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
        <button
          className="font-poppins font-reguler text-lg text-zinc-900"
          onClick={() => toggleFavorite(data)}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>


      {/* Stats */}
      <div className="border flex flex-col justify-start content-start items-start border-green-900">
        <p className="font-poppins font-bold text-xl text-zinc-900">
          About
        </p>
        <p className="font-poppins font-normal text-lg text-zinc-900">
          {data.id}
        </p>
    
      </div>

      </div>
    </div>
  );
}

export default DetailCard;
