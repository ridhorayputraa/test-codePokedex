import React from "react";
import { useGetPokemonByNameQuery } from "../../services/api";

type typeCard = {
  id: number;
  name: string;
  img: string;
  types: string[]; // Assuming types is an array of strings
};

function Card({ id, name, img, types }: typeCard) {
  const { data, error, isLoading } = useGetPokemonByNameQuery(name);

  // Assuming that `data` contains additional details about the Pokémon

  console.log(data)

  return (
    <div className="flex flex-col border border-red-500">
     {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        data && <>
        <p>{data.id}</p>
        <p>{data.name}</p>
        <p>{data.types[0].type.name}</p>
        </>
      )}
</div>
  );
}

export default Card;
