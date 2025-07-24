import { Pokemon } from "../interfaces/pokemon.interface";  
import * as fs from "fs";
import * as path from "path";

let pokemonData: Pokemon[] | null = null;

export const loadPokemonData = (): Pokemon[] => {
  if (pokemonData) {
    return pokemonData;
  }

  try {
    const dataPath = path.join(__dirname, '..', 'data', 'pokedex.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const parsedData = JSON.parse(rawData);

    // Important: Extract the actual array from the parsed object
    pokemonData = parsedData.pokemon as Pokemon[];

    console.log("Type of pokemonData:", Array.isArray(pokemonData));
    console.log(`Loaded ${pokemonData?.length} Pokémon.`);
    return pokemonData || [];
  } catch (error) {
    console.error('Error loading Pokemon data:', error);
    return [];
  }
};

export const getPokemonByName = (name: string): Pokemon | undefined => {
  const data = loadPokemonData();
  return data.find(p => p.name.toLowerCase() === name.toLowerCase());
};

export const getAllPokemon = (): string[] => {
  const data = loadPokemonData();
  const names = data.map(p => p.name);
  console.log("Pokémon names:", names);
  return names;
};