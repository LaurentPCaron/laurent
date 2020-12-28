class pokedex {
  constructor() {
    this.pokemons = [];
  }

  fetchPokemonList = async () => {
    await pokemonAPI.fetchPokemonNames().then(({ results }) => {
      results.forEach((pokemon, index) => {
        this.pokemons.push({
          id: index + 1,
          name: pokemon.name,
          imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${
            index + 1
          }.png`,
        });
      });
    });
    return this.pokemons;
  };
}
