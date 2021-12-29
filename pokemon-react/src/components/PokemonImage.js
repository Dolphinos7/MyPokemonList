import FavoriteButton from "./FavoriteButton";
import DeleteButton from "./DeleteButton";
import { useLocation } from "react-router-dom";
const PokemonImage = ({ pokemon, remove }) => {
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const curRoute = useLocation();

  const typeColor = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85887",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dark: "#705848",
    dragon: "#7038F8",
    steel: "#B8B8D0",
    fairy: "#F0B6BC",
  };
  const styling = {
    backgroundColor: typeColor[pokemon.type],
    borderRadius: "20px",
    margin: "10px 10px 10px 10px",
  };
  return (
    <>
      <div style={styling}>
        <img
          className="list-image"
          width={200}
          height={200}
          alt="pokemon"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        />

        <p className="text-center">{capitalize(pokemon.name)}</p>
      </div>
      {localStorage.getItem("token") && curRoute.pathname === "/" ? (
        <FavoriteButton pokemon={pokemon} />
      ) : (
        <DeleteButton pokemon={pokemon} />
      )}
    </>
  );
};

export default PokemonImage;
