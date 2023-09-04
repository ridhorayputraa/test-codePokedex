import { Type } from "./api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints

// Define a type for Pokemon
export type Pokemon = {
  sprites: any;
  id: number;
  name: string;
  results: [];
  slice: any;
  next: any;
  types: any;
  // Add other fields relevant to Pokemon here
};

export type Type = {
  id: number;
  name: string;
  error: string;
  message: string;
  type: string;
};

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),

  endpoints: (builder) => ({
    getPokemon: builder.query<Pokemon, any>({
      query: () => `pokemon`,
    }),

    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),

    // Get By Types
    getPokemonByTypesId: builder.query<Type, string>({
      query: (type) => `type/${type}`,
    }),

    getPokemonByTypes: builder.query<Type, string>({
      query: () => `type`,
    }),

    getPokemonSpecies: builder.query<Type, string>({
      query: (name) => `pokemon-species/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPokemonQuery,
  useGetPokemonByNameQuery,
  useGetPokemonByTypesIdQuery,
  useGetPokemonByTypesQuery,
  useGetPokemonSpeciesQuery,
} = pokemonApi;
