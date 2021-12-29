import React, { useState, useEffect } from "react";
import PokemonImage from "./PokemonImage";
import Pagination from "./Pagination";
import api from "../apis";
const PokemonPage = () => {
  const [data, setData] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [status, setStatus] = useState("null");
  const [stateUrl, setStateUrl] = useState(
    `${api.pokemon}pokemon?limit=9&offset=0`
  );

  // const cache = useRef({});

  const getPokemon = async (pokemon) => {
    const response = await fetch(pokemon.url);
    return response.json();
  };

  useEffect(() => {
    if (localStorage.getItem(stateUrl)) {
      const myData = JSON.parse(localStorage.getItem(stateUrl));
      setData(myData);
      setStatus("fetched");
      return;
    }
    const fetchData = async () => {
      console.log("Api Request");
      setStatus("fetching");
      const response = await fetch(stateUrl);
      const allPokemon = await response.json();
      let pokemonData = await Promise.all(
        allPokemon.results.map(async (pokemon) => {
          return await getPokemon(pokemon);
        })
      );
      // cache.current[stateUrl] = pokemonData;
      let tempData = [];
      pokemonData.forEach((pokemon) => {
        tempData.push({
          id: pokemon.id,
          name: pokemon.name,
          type: pokemon.types[0].type.name,
        });
      });

      try {
        localStorage.setItem(stateUrl, JSON.stringify(tempData));
      } catch (error) {
        console.log("Local storage full could not add new item");
      }
      setData(tempData);
      setStatus("fetched");
    };
    fetchData();
  }, [stateUrl]);

  const goToPage = (page) => {
    if (page < 1 || page > 100) {
      return;
    }
    let offset;
    if (page === 1) {
      offset = 0;
    } else {
      offset = (page - 1) * 9;
    }

    setCurPage(page);
    setStateUrl(`${api.pokemon}pokemon?limit=9&offset=${offset}`);
  };

  return (
    <div className="container-fluid justify-content-center">
      <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
        {status === "fetched" && <PokemonImage pokemon={data[0]} />}
        {status === "fetched" && <PokemonImage pokemon={data[1]} />}
        {status === "fetched" && <PokemonImage pokemon={data[2]} />}
      </div>
      <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
        {status === "fetched" && <PokemonImage pokemon={data[3]} />}
        {status === "fetched" && <PokemonImage pokemon={data[4]} />}
        {status === "fetched" && <PokemonImage pokemon={data[5]} />}
      </div>
      <div className="d-flex flex-column flex-sm-row d-row-lg justify-content-center align-items-center">
        {status === "fetched" && <PokemonImage pokemon={data[6]} />}
        {status === "fetched" && <PokemonImage pokemon={data[7]} />}
        {status === "fetched" && <PokemonImage pokemon={data[8]} />}
      </div>
      <Pagination curPage={curPage} goToPage={goToPage} maxPages={100} />
    </div>
  );
};

export default PokemonPage;
