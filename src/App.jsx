import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  // On crée notre constante qui contient l'adresse de notre API
  const API = "https://api-pokemon-fr.vercel.app/api/v1/gen/";

  // On crée un premier state pour stocker notre tableau de pokémons
  const [pokemons, setPokemons] = useState([]);

  // On crée un second state pour indiquer quelle génération de pokémon on veut
  const [generation, setGeneration] = useState(1);

  // Ici on utilise useEffect pour éviter de rerender à l'infini notre composant
  useEffect(() => {
    // Ici on fait notre call API avec Axios
    axios
      // D'abord on interroge l'API (API+numéro de la generation) via la méthode "get"
      .get(`${API}${generation}`)
      // Ensuite on traite l'information reçu, ici on la stocke dans un state "pokemons"
      .then((res) => setPokemons(res.data))
      // Là on surveille que tout se passe bien, si il y a un problème lors de l'utilisation d'Axios on le signale dans la console
      .catch((error) => console.error(error));
  }, [generation]);
  // Via le tableau de dépendance ci-dessus qui contient ici notre state generation, on rééxécute notre useEffect QUE SI le numéro de génération change

  // On vérifie que notre tableau de pokemons est bien "peuplé" avec des données, en attendant on affiche un petit message de chargement
  if (pokemons.length === 0) {
    return <p>En cours de chargement...</p>;
  }

  // Un petit log de notre tableau de pokemons pour bien voir la structure de celui-ci et des datas
  console.log(pokemons);

  // Ici le rendu de notre composant tel que souhaité
  return (
    <main>
      {/* Ce bouton permet de changer la valeur de notre state "generation" et donc de changer la génération de pokémons affichée */}
      <button onClick={() => setGeneration(generation + 1)}>
        Generation suivante
      </button>
      {/* Ici on "map" notre tableau de pokemons récupéré via le call API afin d'afficher chaque pokemon avec son image et son nom */}
      {pokemons.map((pokemon) => (
        // On n'oublie pas de mettre une "key" qui sera unique pour chaque pokemon
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
