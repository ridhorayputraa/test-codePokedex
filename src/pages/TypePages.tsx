import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/molekuls/Card';
import FilterPokemon from '../components/molekuls/FilterPokemon';
import Navbar from '../components/molekuls/Navbar';
import { useGetPokemonByTypesIdQuery } from '../services/api';

function TypePages() {
  const { type }:any = useParams<"type">();

  const { data, error, isLoading } = useGetPokemonByTypesIdQuery(type);
  const [pokemonList, setPokemonList] = useState([]);

  // Init pokemon data
  const numberOfPokemonToDisplay = 30; // Ubah jumlah data yang ingin ditampilkan ke 30

  console.log(data?.pokemon, 'Type pegaes');

  useEffect(() => {
    if (data && data.pokemon && data.pokemon.length > 0) {
      // Batasi jumlah data yang akan ditampilkan ke 30
      setPokemonList(data.pokemon.slice(0, numberOfPokemonToDisplay));
    }
  }, [data, numberOfPokemonToDisplay]);

  console.log(pokemonList, 'pokemon list');

  return (
    <div className='w-full justify-center flex flex-col text-center items-center'>
      <Navbar />
      <FilterPokemon />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error:</p>
      ) : (
        <div className='relative flex max-w-screen-lg items-center   justify-center content-center flex-row flex-wrap'>
          {pokemonList.map((pokemon:any, index) => {
            return (
              <Card key={index} name={pokemon?.pokemon?.name} />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TypePages;
