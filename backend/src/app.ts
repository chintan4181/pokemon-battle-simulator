import express from 'express';
import { getPokemonByName, getAllPokemon } from './utils/dataloader';
import { simulateBattle } from './utils/battlelogic';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//Endpoint to get a list of all Pokemon names (useful for the frontend)
app.get('/api/pokemon', (req, res) => {
  try {
    const pokemonNames = getAllPokemon();
    res.json(pokemonNames);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Pokemon names.' });
  }
});

//POST /api/battle endpoint
app.post('/api/battle', (req, res) => {
  const { pokemon1Name, pokemon2Name } = req.body;

  if (!pokemon1Name || !pokemon2Name) {
    return res.status(400).json({ error: 'Both Pokémon names are required.' });
  }

  const pokemon1 = getPokemonByName(pokemon1Name);
  const pokemon2 = getPokemonByName(pokemon2Name);

  if (!pokemon1 || !pokemon2) {
    return res.status(404).json({ error: 'One or both Pokémon not found.' });
  }

  const result = simulateBattle(pokemon1, pokemon2);
  res.json({ result });
});
export default app;
