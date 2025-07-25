import React from 'react';

interface PokemonSelectionProps {
    pokemonNames: string[];
  selectedPokemon1: string | null;
  selectedPokemon2: string | null;
  onSelectPokemon1: (name: string) => void;
  onSelectPokemon2: (name: string) => void;
}

const PokemonSelection: React.FC<PokemonSelectionProps> = ({
  pokemonNames,
  selectedPokemon1,
  selectedPokemon2,
  onSelectPokemon1,
  onSelectPokemon2
}) => {
  return (
    <div>
      <h2>Select Pokemon for Battle</h2>
      <div>
        <label htmlFor="pokemon1">Pokemon 1:</label>
        <select
          id="pokemon1"
          value={selectedPokemon1 || ''}
          onChange={(e) => onSelectPokemon1(e.target.value)}
        >
          <option value="">Select Pokemon</option>
          {pokemonNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      
      <p></p>
      <div>
        <label htmlFor="pokemon2">Pokemon 2:</label>
        <select
          id="pokemon2"
          value={selectedPokemon2 || ''}
          onChange={(e) => onSelectPokemon2(e.target.value)}
        >
          <option value="">Select Pokemon</option>
          {pokemonNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PokemonSelection;