import React from 'react'
import Navbar from '../components/molekuls/Navbar'

// API
import { useGetPokemonByNameQuery } from '../services/api'


function Home() {

    const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')

    console.log(data)

  return (
  <>
      <Navbar/>
    <div>Home</div>
  </>
  )
}

export default Home