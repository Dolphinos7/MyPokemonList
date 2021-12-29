import React, { useState, useEffect } from "react";
import PokemonImage from "./PokemonImage";
import Pagination from "./Pagination";
import api from "../apis";
const MyPokemonPage = () => {
  const [data, setData] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [status, setStatus] = useState("null");
  const [stateUrl, setStateUrl] = useState(`${api.flask}pokemon`);
  const [curData, setCurData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setStatus("fetching");
      const response = await fetch(stateUrl, {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      const allPokemon = await response.json();
      const fixedPokemon = [];
      allPokemon.forEach((pokemon) => {
        fixedPokemon.push({
          id: pokemon.pokemon_id,
          name: pokemon.name,
          type: pokemon.pokemonType,
        });
      });
      let curData = [];
      for (let i = 0; i < 9 && i < allPokemon.length; i++) {
        curData[i] = fixedPokemon[i];
      }
      setData(fixedPokemon);
      setCurData(curData);
      setStatus("fetched");
    };
    fetchData();
  }, [stateUrl]);

  const goToPage = (page) => {
    let tempData = [];
    let j = 0;
    for (let i = (page - 1) * 9; i < i + 9 && i < data.length; i++) {
      tempData[j] = data[i];
      j++;
    }
    setCurPage(page);
    setCurData(tempData);
  };

  return (
    <div className="container-fluid justify-content-center">
      <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
        {status === "fetched" && curData.length > 0 && (
          <PokemonImage pokemon={curData[0]} />
        )}
        {status === "fetched" && curData.length > 1 && (
          <PokemonImage pokemon={curData[1]} />
        )}
        {status === "fetched" && curData.length > 2 && (
          <PokemonImage pokemon={curData[2]} />
        )}
      </div>
      <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
        {status === "fetched" && curData.length > 3 && (
          <PokemonImage pokemon={curData[3]} />
        )}
        {status === "fetched" && curData.length > 4 && (
          <PokemonImage pokemon={curData[4]} />
        )}
        {status === "fetched" && curData.length > 5 && (
          <PokemonImage pokemon={curData[5]} />
        )}
      </div>
      <div className="d-flex flex-column flex-sm-row d-row-lg justify-content-center align-items-center">
        {status === "fetched" && curData.length > 6 && (
          <PokemonImage pokemon={curData[6]} />
        )}
        {status === "fetched" && curData.length > 7 && (
          <PokemonImage pokemon={curData[7]} />
        )}
        {status === "fetched" && curData.length > 8 && (
          <PokemonImage pokemon={curData[8]} />
        )}
      </div>
      <Pagination
        curPage={curPage}
        goToPage={goToPage}
        maxPages={data.length / 9}
      />
    </div>
  );
};

export default MyPokemonPage;
