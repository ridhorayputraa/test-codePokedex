/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import { css, useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { useGetPokemonSpeciesQuery } from "../../services/api";

function DetailCard({ dataProps }: any) {
  const theme: any = useTheme();

  console.log(dataProps);

  const [isFavorite, setIsFavorite] = useState(false);
  const id = dataProps && dataProps.id;
  const dataNama = dataProps && dataProps.name;

  const { data, isLoading, error } = useGetPokemonSpeciesQuery(dataNama);
  // console.log(data);
  console.log(data);
  const initTipe = dataProps?.types[0].type.name;

  const tipe = initTipe;

  const toggleFavorite = (dataProps: any) => {
    const favorites = getFavoritesFromLocalStorage();
    console.log(favorites, "variable favorite di fn toogle favorite");

    console.log(isFavorite);

    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(
        (favoriteId: any) => favoriteId !== dataProps.id
      );
      console.log(updatedFavorites, "update favorite");
      setFavoritesToLocalStorage(updatedFavorites);
      setIsFavorite(false);
    } else {
      // Add to favorites
      const updatedFavorites = [...favorites, dataProps.id];
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
    -radius: 5px;
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
      className="relative flex max-w-screen-md  -green-200 flex-row flex-wrap"
    >
      <img
        width={"190px"}
        src={dataProps?.sprites?.front_default}
        alt={dataProps.name}
      />
      <div className="bg-slate-50 py-9 relative bottom-4 w-full h-full rounded-2xl">
        <div className=" -cyan-500">
          <p className="font-poppins font-bold text-3xl text-zinc-900">
            {dataProps.name}
          </p>
          <p className="font-poppins font-normal text-lg text-zinc-900">
            {dataProps.id}
          </p>
          <div className="flex flex-row justify-around w-full  -red-500">
            <Link to={`/${dataProps?.types[0]?.type?.name}`}>
              <p className="font-poppins font-semibold hover:opacity-90 text-lg text-orange-900">
                {dataProps.types[0]?.type?.name}
              </p>
            </Link>
            <Link to={`/${dataProps?.types[1]?.type?.name}`}>
              <p className="font-poppins text-purple-900 font-semibold hover:opacity-90 text-lg ">
                {dataProps.types[1]?.type?.name}
              </p>
            </Link>
          </div>
          <button
            className="font-poppins bg-green-200  px-6 rounded-3xl hover:opacity-90 py-2 font-semibold text-xl  text-zinc-900"
            onClick={() => toggleFavorite(dataProps)}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>

        {/* About */}
        <div className=" flex mt-10 flex-col justify-start content-start items-start -green-900">
          <p className="font-poppins font-bold text-xl text-zinc-900">Description</p>
          <p className="font-poppins font-normal text-base text-zinc-800">
            {data?.flavor_text_entries[1]?.flavor_text}
          </p>
        </div>

        {/* Stats */}
        <div className=" flex mt-10 flex-col justify-start content-start items-start -green-900">
          <p className="font-poppins font-bold text-xl text-zinc-900">Stats </p>
          <p className="font-poppins font-normal text-base text-zinc-800">
            Hp :{" "}
            <span className="font-poppins font-semibold text-zinc-900">
              {dataProps?.stats[0]?.base_stat}
            </span>
          </p>
          <p className="font-poppins font-normal text-base text-zinc-800">
            Attack :{" "}
            <span className="font-poppins font-semibold text-zinc-900">
              {dataProps?.stats[1]?.base_stat}
            </span>
          </p>
          <p className="font-poppins font-normal text-base text-zinc-800">
            Deffense :{" "}
            <span className="font-poppins font-semibold text-zinc-900">
              {dataProps?.stats[2]?.base_stat}
            </span>
          </p>
          <p className="font-poppins font-normal text-base text-zinc-800">
            Special attack :{" "}
            <span className="font-poppins font-semibold text-zinc-900">
              {dataProps?.stats[3]?.base_stat}
            </span>
          </p>
          <p className="font-poppins font-normal text-base text-zinc-800">
            Special defense :{" "}
            <span className="font-poppins font-semibold text-zinc-900">
              {dataProps?.stats[4]?.base_stat}
            </span>
          </p>
          <p className="font-poppins font-normal text-base text-zinc-800">
            Speed :{" "}
            <span className="font-poppins font-semibold text-zinc-900">
              {dataProps?.stats[5]?.base_stat}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailCard;
