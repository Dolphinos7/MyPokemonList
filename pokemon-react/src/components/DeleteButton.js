import React from "react";
import X from "../assets/x.png";
import api from "../apis";

const DeleteButton = (pokemon) => {
  return (
    <img
      className="btn-favorite"
      alt="start"
      src={X}
      onClick={async (e) => {
        e.preventDefault();
        const response = await fetch(
          `${api.flask}pokemon/${pokemon.pokemon.id}`,
          {
            method: "DELETE",
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        const res = await response.json();
        alert(`Successfully Deleted ${res.name} From Your Favorites List`);
        window.location.reload(true);
      }}
    ></img>
  );
};

export default DeleteButton;
