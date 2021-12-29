import React from "react";
import PokemonPage from "../components/PokemonPage";
import LinkButton from "../components/LinkButton";

const home = () => {
  return (
    <div className="d-flex flex-column align-items-center mb-5">
      <h1>Big List-o-Mons</h1>
      {localStorage.getItem("token") ? (
        <p>Click the star on any pokemon to add it to your list!</p>
      ) : (
        <p>Sign in to build your own list and more!</p>
      )}
      <div className="d-flex flex-row">
        {localStorage.getItem("token") ? (
          <LinkButton text="View My List" link="/list" />
        ) : (
          <LinkButton text="Sign In" link="signin" />
        )}
        {localStorage.getItem("token") ? (
          <div />
        ) : (
          <LinkButton text="Sign Up" link="/signup" />
        )}
      </div>
      <PokemonPage />
    </div>
  );
};

export default home;
