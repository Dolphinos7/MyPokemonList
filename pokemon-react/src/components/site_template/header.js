import React from "react";
import Navbar from "../navbar/Navbar";

const header = () => {
  const pokemonSearch = (pokemon) => {
    window.location.href = `/search?=pokemonName=${pokemon}`;
  };

  return (
    <header className="sticky-top">
      <Navbar searchFunction={pokemonSearch} />
    </header>
  );
};

export default header;
