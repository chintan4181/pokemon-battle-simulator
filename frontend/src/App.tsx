import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonSelector from './component/PokemonSelector';           
import BattleResult from './component/BattleResult';
import './App.css'; 


interface BattleResponse {
  winner: string;
    summary: string;
  pokemon1: { name: string; stats: any; types: string[] };
  pokemon2: { name: string; stats: any; types: string[] };
}

function App(){
    const [pokemonNames, setPokemonNames] = useState<string[]>([]);
  const [selectedPokemon1, setSelectedPokemon1] = useState<string | null>(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState<string | null>(null);
  const [battleResult, setBattleResult] = useState<BattleResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
    
    const API_BASE_URL = 'http://localhost:3001'
    // Fetch all Pokemon names when the component mounts
  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await axios.get<string[]>(`${API_BASE_URL}/api/pokemon`);
        setPokemonNames(response.data);
      } catch (err) {
        console.error('Error fetching Pokemon names:', err);
        setError('Failed to load Pokemon list. Is the backend running?');
      } finally {
      }
    };

    fetchPokemonNames();
  }, []);

const handleBattle = async() => {
        if (!selectedPokemon1 || !selectedPokemon2) {
            setError('Please select both Pokémon for the battle.');
            return;
        }

        axios.post(`${API_BASE_URL}/api/battle`, {
            pokemon1Name: selectedPokemon1,
            pokemon2Name: selectedPokemon2
        })
        .then(response => {
            setBattleResult(response.data);
            setError(null);
        })
        .catch(err => {
            console.error('Error during battle:', err);
            setError('Failed to conduct the battle.');
            setBattleResult(null);
        });
    };  
    
    return (
        <div className="App">
        <h1>Pokemon Battle Simulator</h1>
        <PokemonSelector 
            pokemonNames={pokemonNames}
            selectedPokemon1={selectedPokemon1}
            selectedPokemon2={selectedPokemon2}
            onSelectPokemon1={setSelectedPokemon1}
            onSelectPokemon2={setSelectedPokemon2}
        />  
        <p></p>
        <button
            onClick={handleBattle}
            disabled={!selectedPokemon1 || !selectedPokemon2 || loading}
            style={{
              padding: '12px 25px',
              fontSize: '1.1em',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            {loading ? 'Battling...' : 'Start Battle!'}
          </button>
        <BattleResult result={battleResult} error={error} />
        </div>
    );

   
}
export default App;
