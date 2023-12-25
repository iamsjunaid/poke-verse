const pokemonsEndpoint = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';

export const fetchPokemons = async () => {
  const response = await fetch(`${pokemonsEndpoint}`);
  const data = await response.json();
  return data.results;
};