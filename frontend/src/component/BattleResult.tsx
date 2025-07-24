import React from 'react';

interface BattleResultProps {
  result: {
    winner: string;
    summary: string;
    pokemon1: { name: string; stats: any; types: string[] };
    pokemon2: { name: string; stats: any; types: string[] };
  } | null;
  error: string | null;
}

const BattleResult: React.FC<BattleResultProps> = ({ result, error }) => {
    if (error) {
        return <div className="error">Error: {error}</div>;
    }
    
    if (!result) {
        return <div className="info">Select Pokmon to start the battle.</div>;
    }
    
    return (
        <div className="battle-result">
        <h2>Battle Result</h2>
        
        {result.winner !== 'Draw' ? (
          <p>{result.winner} wins!</p>
        ) : 'Draw'}
        <div>
            <h3>{result.pokemon1.name}</h3>
            <p>Explanation: {result.summary}</p>
            <p>Stats: {JSON.stringify(result.pokemon1.stats)}</p>
            <p>Types: {result.pokemon1.types.join(', ')}</p>
        </div>
        <div>
            <h3>{result.pokemon2.name}</h3>
            <p>Explanation: {result.summary}</p>
            <p>Stats: {JSON.stringify(result.pokemon2.stats)}</p>
            <p>Types: {result.pokemon2.types.join(', ')}</p>
        </div>
        </div>
    );
}
export default BattleResult;