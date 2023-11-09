import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const API = "https://api-pokemon-fr.vercel.app/api/v1/gen/";

  const [pokemons, setPokemons] = useState([]);

  const [generation, setGeneration] = useState(1);

  useEffect(() => {
    axios
      .get(`${API}${generation}`)
      .then((res) => setPokemons(res.data))
      .catch((error) => console.error(error));
  }, [generation]);

  if (pokemons.length === 0) {
    return <p>En cours de chargement...</p>;
  }

  console.log(pokemons);

  return (
    <main>
      <button onClick={() => setGeneration(generation + 1)}>
        Generation suivante
      </button>
      {pokemons.map((pokemon) => (
        <div key={pokemon.pokedexId}>
          <img
            src={pokemon.sprites.regular}
            alt={pokemon.name.fr}
            width={256}
          />
          <p>{pokemon.name.fr}</p>
        </div>
      ))}
    </main>
  );
}

export default App;
