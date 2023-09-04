import React, { useState, useEffect } from "react";
import {  useGetPokemonByTypesQuery } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

const FilterPokemon = () => {
  const { data } = useGetPokemonByTypesQuery();
  const [selectedType, setSelectedType] = useState('');
  const navigate = useNavigate(); // Dapatkan fungsi navigate dari React Router

  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setSelectedType(newType);
    navigate(`/${newType}`); // Navigasi ke jenis yang dipilih
  };

  console.log(selectedType, "yang udah di selectttt");

  console.log(data, "ini type nyaaaa");
  return (
    <div>
      <h2>Pokemon List</h2>
      <label htmlFor="typeSelect">Filter by Type: </label>
      <select id="typeSelect" value={selectedType} onChange={handleTypeChange}>
        <option value="/">
          <Link to={"/"}> All</Link>
        </option>
        {data?.results?.map((data) => {
          return (
            <option value={data.name}>
              <Link to={"/pokemon" + data.name}>{data.name}</Link>
            </option>
          );
        })}
        {/* Tambahkan pilihan untuk tipe lainnya */}
      </select>
    </div>
  );
};

export default FilterPokemon;
