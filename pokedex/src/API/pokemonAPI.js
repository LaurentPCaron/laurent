const basicPath = 'https://pokeapi.co/api/v2/';

//Name, element, height, weight
const pokemonAPI = {
  fetchPokemon: async pkmnNumber => {
    const response = await axios.get(`${basicPath}pokemon/${pkmnNumber}`);
    if (response.data.Error) {
      console.log(response);
      return [];
    }
    return response.data;
  },
  fetchSpecies: async pkmnNumber => {
    const response = await axios.get(
      `${basicPath}pokemon-species/${pkmnNumber}`
    );
    if (response.data.Error) {
      console.log(response);
      return [];
    }
    return response.data;
  },
  fetchPokemonNames: async () => {
    const response = await axios.get(`${basicPath}pokemon?limit=251&offset=0`);
    if (response.data.Error) {
      console.log(response);
      return [];
    }
    return response.data;
  },
};
