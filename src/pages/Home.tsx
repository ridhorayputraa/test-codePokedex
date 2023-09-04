import React, { useEffect, useState } from 'react';
import Navbar from '../components/molekuls/Navbar';
import { useGetPokemonByTypesQuery, useGetPokemonQuery } from '../services/api';
import Card from '../components/molekuls/Card';
import PokemonList from '../components/molekuls/PokemonList';
import FilterPokemon from '../components/molekuls/FilterPokemon';

function Home() {
  const { data , error, isLoading } = useGetPokemonQuery();
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState('');

  // Init pokemon data
  const numberOfPokemonToDisplay = 10;

  useEffect(() => {
    if (data && data.results) {
      setPokemonList(data.results.slice(0, numberOfPokemonToDisplay));
      setNextUrl(data.next);
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {

        if (nextUrl) {
          fetchMorePokemon(nextUrl);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nextUrl]);

  const fetchMorePokemon = async (url:any) => {
    try {
      const response = await fetch(url);
      const newData = await response.json();
      if (newData && newData.results) {
        setPokemonList((prevList:any) => [
          ...prevList,
          ...newData.results.slice(0, numberOfPokemonToDisplay),
        ]);
        setNextUrl(newData.next);
      }
    } catch (error) {
      console.error('Error fetching more Pokémon:', error);
    }
  };


  // ...


  return (
    <div className='w-full justify-center flex flex-col text-center items-center'>
      <Navbar />
   <FilterPokemon />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className='relative flex max-w-screen-md items-center  border border-green-200 justify-center content-center flex-row flex-wrap'>
          {pokemonList.map((pokemon, index) => (
            <Card key={index}  name={pokemon.name} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
