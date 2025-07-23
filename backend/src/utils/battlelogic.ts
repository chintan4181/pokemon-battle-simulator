import { Pokemon } from "../interfaces/pokemon.interface";  

//Define a simplified type effectiveness chart
// This is a minimal example. You can expand it
const typeEffectiveness: { [key: string]: { superEffective: string[], notEffective: string[] } } = {
  Fire: { superEffective: ['Grass'], notEffective: ['Water'] },
  Water: { superEffective: ['Fire'], notEffective: ['Grass'] },
  Grass: { superEffective: ['Water'], notEffective: ['Fire'] }};

  // Function to calculate total base stats (HP + Attack + Defense)
const calculateTotalStats = (pokemon: Pokemon): number => { 
    return pokemon.base.HP + pokemon.base.Attack + pokemon.base.Defense;
};

const getTypeMultiplier = (attackerTypes: string[], defenderTypes: string[]): number => {
    let multiplier = 1;

    for (const attackerType of attackerTypes) {
    const effectiveness = typeEffectiveness[attackerType];
    if (effectiveness) {
      for (const defenderType of defenderTypes) {
        if (effectiveness.superEffective.includes(defenderType)) {
          multiplier *= 1.5; // Super effective 
        } else if (effectiveness.notEffective.includes(defenderType)) {
          multiplier *= 0.5; // Not very effective 
        }
      }
    }
  }
  return multiplier;  
};

//main battle logic function
export const simulateBattle = (pokemon1: Pokemon, pokemon2: Pokemon) => {
//calculate base stats
    const totalStats1 = calculateTotalStats(pokemon1);
    const totalStats2 = calculateTotalStats(pokemon2);
    
    
    const typeMultiplier1 = getTypeMultiplier(pokemon1.type, pokemon2.type);
    const typeMultiplier2 = getTypeMultiplier(pokemon2.type, pokemon1.type);
    
    
    const effectiveStats1 = totalStats1 * typeMultiplier1;
    const effectiveStats2 = totalStats2 * typeMultiplier2;
    
    // Determine winner
    if (effectiveStats1 > effectiveStats2) {
        return `${pokemon1.name} wins because their total effective stats (${effectiveStats1}) are greater than ${pokemon2.name}'s effective stats (${effectiveStats2}).`;
    } else if (effectiveStats2 > effectiveStats1) {
        return `${pokemon2.name} wins because their total effective stats (${effectiveStats2}) are greater than ${pokemon1.name}'s effective stats (${effectiveStats1}).`;
    } else {
        return "It's a tie!";
    }
};