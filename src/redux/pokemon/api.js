const pokemonsEndpoint = 'https://pokeapi.co/api/v2/pokemon/';

export const fetchPokemons = async () => {
  const response = await fetch(`${pokemonsEndpoint}`);
  const data = await response.json();
  return data.results;
};