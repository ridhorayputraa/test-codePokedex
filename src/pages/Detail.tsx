/** @jsxImportSource @emotion/react */
import { useParams } from "react-router-dom";
import { useGetPokemonByNameQuery } from "../services/api";
import Navbar from "../components/molekuls/Navbar";

import DetailCard from "../components/molekuls/DetailCard";


function Detail() {
  const { name }:any = useParams<"name">();


  const { data, isLoading, error } = useGetPokemonByNameQuery(name);
 

  return (
    <div className="w-full justify-center flex flex-col text-center items-center">
      <Navbar />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error</p>
      ) : (
      <DetailCard dataProps={data}/>
      )}
    </div>
  );
}

export default Detail;
