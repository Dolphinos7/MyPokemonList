import React from "react";
import Star from "../assets/star.png";
import api from "../apis";
const FavoriteButton = ({ pokemon }) => {
  return (
    <img
      className="btn-favorite"
      alt="start"
      src={Star}
      onClick={async (e) => {
        e.preventDefault();
        const response = await fetch(`${api.flask}pokemon`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            pokemonType: pokemon.type,
            name: pokemon.name,
            pokemon_id: pokemon.id,
          }),
        });
        const res = await response.json();
        alert(`Successfully Added ${res.name} To Your Favorites List`);
      }}
    ></img>
  );
};

export default FavoriteButton;
