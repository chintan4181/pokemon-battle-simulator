import { Pokemon } from "../interfaces/pokemon.interface";  
import * as fs from "fs";
import * as path from "path";

let pokemonData: Pokemon[] = [];

export const loadPokemonData = () => {
  const filePath = path.join(__dirname, "../data/pokemon.json");
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf-8");
    pokemonData = JSON.parse(data);
    console.log(`Loaded ${pokemonData?.length} Pokemon.`);
  } else {
    console.error("Pokemon data file not found.");
  }
};

export const getPokemonByName = (name: string): Pokemon | undefined => {
    const data = loadPokemonData();
    return pokemonData.find(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
};

export const getAllPokemon = (): string[] => {
    const data = loadPokemonData();
    return pokemonData.map(pokemon => pokemon.name);
};