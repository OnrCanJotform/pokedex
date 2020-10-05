// Renders the sidebar with the list of pokemons in the pokedex
import React from "react";
import { Link } from "@primer/components";
import { Spinner } from "@nice-boys/components";
import Sidebar from "../../components/Sidebar";
import SidebarItem from "../../components/SidebarItem";
import SidebarTitle from "../../components/SidebarTitle";
import { fetchPokemons } from "../../api/pokeapi";
import useAsync from "../../use-async";

function PokemonList(props) {
  const { status, error, data } = useAsync(fetchPokemons);

  return (
    <Sidebar>
      <Link onClick={() => props.setSelectedPokemon(null)}>
        <SidebarTitle>Pokedex</SidebarTitle>
      </Link>
      {status === "loading" && <Spinner />}
      {status === "error" && <div>{error.message}</div>}
      {status === "idle" &&
        (data ? (
          data.map(pokemon => (
            <Link
              key={pokemon.name}
              onClick={() => props.setSelectedPokemon(pokemon.name)}
            >
              <SidebarItem>{pokemon.name}</SidebarItem>
            </Link>
          ))
        ) : (
          <div>No pokemons</div>
        ))}
    </Sidebar>
  );
}

export default PokemonList;
