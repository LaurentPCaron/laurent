const ENGLISH = 'en';
const CRYSTAL = 'crystal';
const DM_BY_FOOT = 3.048;
const INCHES_BY_FOOT = 12;
const HG_BY_POUND = 4.536;

class Pokemon {
  constructor(pokemonNumber) {
    this.pokemon = {
      number: 0,
      name: 'MISSINGNO',
      category: '???',
      type: 'BIRD/NORM',
      height: "10'0''",
      weight: '3507.2',
      description: {
        1: "This POKéMON doesn't existe, something wrong happened.",
        2: "Go find some help before it's to late. HELP",
      },
      imageURL:
        'https://tcrf.net/images/archive/1/18/20160605004755%21Pokemon_RGB-MissingNo.png',
      cryURL:
        'http://soundbible.com/mp3/CD%20Skipping-SoundBible.com-816257683.mp3',
    };

    if (
      typeof pokemonNumber === 'number' &&
      pokemonNumber > 0 &&
      pokemonNumber <= 251
    ) {
      this.pokemon.number = pokemonNumber;
    }
  }

  getPokemonInfo = async () => {
    if (this.pokemon.number !== 0) {
      this.pokemon.imageURL = this.fetchImageURL();
      await pokemonAPI.fetchPokemon(this.pokemon.number).then(response => {
        this.pokemon.name = this.fetchName(response);
        this.pokemon.type = this.fetchType(response);
        this.pokemon.height = this.fetchHeight(response);
        this.pokemon.weight = this.fetchWeight(response);
      });
      await pokemonAPI.fetchSpecies(this.pokemon.number).then(response => {
        this.pokemon.category = this.fetchCategory(response);
        this.pokemon.description = this.fetchDescription(response);
      });

      this.pokemon.cryURL = this.fetchCry();
    }

    return this.pokemon;
  };

  fetchImageURL = () => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${this.pokemon.number}.png`;
  };

  fetchName = response => {
    return response.name.toUpperCase();
  };

  fetchCategory = response => {
    const generas = response.genera;
    let category;

    generas.some(genera => {
      if (genera.language.name === ENGLISH) {
        category = genera.genus;
        return true;
      }
    });

    category = category.toUpperCase().replace(' POKÉMON', '');
    return category;
  };

  fetchType = response => {
    let typeName = '';

    response.types.forEach((type, index) => {
      if (index === 1) {
        typeName += '/';
      }
      typeName += type.type.name.substring(0, 4);
    });
    return typeName.toUpperCase();
  };

  fetchHeight = response => {
    const heightDM = parseInt(response.height);

    let foot = (heightDM / DM_BY_FOOT).toFixed(5);
    let inch = foot.split('.')[1];
    inch = (parseFloat(`0.${inch}`) * 12).toFixed();
    if (inch.length < 2) {
      inch = `0${inch}`;
    }
    foot = foot.split('.')[0];

    return `${foot}'${inch}''`;
  };

  fetchWeight = response => {
    const weight = parseFloat(response.weight);

    return (weight / HG_BY_POUND).toFixed(1);
  };

  fetchDescription = response => {
    let description = { 1: '', 2: '' };
    const flavors = response.flavor_text_entries;

    flavors.some(flavor => {
      if (flavor.language.name === ENGLISH && flavor.version.name === CRYSTAL) {
        flavor.flavor_text.split('\f').forEach((part, index) => {
          description[index + 1] = part.replaceAll('\n', ' </br>').trim();
        });
        return true;
      }
    });
    return description;
  };

  fetchCry = () => {
    return `./sound/cries/${this.pokemon.number}.ogg`;
  };
}
