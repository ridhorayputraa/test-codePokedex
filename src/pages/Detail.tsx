import { useParams } from "react-router-dom";
import { useGetPokemonByNameQuery } from "../services/api";
import Navbar from "../components/molekuls/Navbar";
import { useEffect, useState } from "react";


function Detail() {
  const { name } = useParams<"name">();
  console.log(name);

  const { data, isLoading, error } = useGetPokemonByNameQuery(name);
  const [isFavorite, setIsFavorite] = useState(false);
  const id = data && data.id;
  console.log(data);


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
  return (
    <div className="w-full justify-center flex flex-col text-center items-center">
      <Navbar />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="relative flex max-w-screen-md items-center  border border-green-200 justify-center content-center flex-row flex-wrap">
        <p>{data.name}</p>
        <img src={data.sprites?.front_default} alt={data.name} />
            <button
              className="font-poppins font-reguler text-lg text-zinc-900"
              onClick={() => toggleFavorite(data)}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
        </div>
      )}
    </div>
  );
}

export default Detail;
