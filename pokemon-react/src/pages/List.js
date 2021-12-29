import React from "react";
import MyPokemonPage from "../components/MyPokemonPage";
const List = () => {
  return (
    <div className="d-flex flex-column align-items-center mb-5">
      <h1>Your Pokemon List</h1>
      <MyPokemonPage />
    </div>
  );
};

export default List;
