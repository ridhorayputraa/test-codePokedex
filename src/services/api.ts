import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints

// Define a type for Pokemon
export type Pokemon = {
    id: number;
    name: string;
    // Add other fields relevant to Pokemon here
  };


export type Type = {
    name: string;
}; 

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),

  endpoints: (builder) => ({

    getPokemon: builder.query<Pokemon, any>({
      query: () => `pokemon`,
    }),

    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),

    // Get By Types
    getPokemonByTypes: builder.query<Type, string>({
        query: (id) => `type/${id}`,
    })

    

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonQuery ,useGetPokemonByNameQuery, useGetPokemonByTypesQuery } = pokemonApi