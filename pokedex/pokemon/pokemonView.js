const SFXSelect = new Audio('../sound/sfx/SFX_PRESS_AB.wav');
const SFXBack = new Audio('../sound/sfx/SFX_BACK.wav');
const SFXPrint = new Audio('../sound/sfx/SFX_Printer.mp3');

let cursorPostion = 0;
let page = 'P.1';
let _pokemon;

const getPkmnId = () => {
  let pkmnIdParam = parseInt(
    new URLSearchParams(window.location.search).get('id')
  );

  if (!pkmnIdParam || pkmnIdParam < 1 || pkmnIdParam > 251) {
    return 0;
  }

  return pkmnIdParam;
};

onRenderPokemon = pokemon => {
  pokemon.getPokemonInfo().then(res => {
    document.querySelector('#pokedex').innerHTML = pokemonTemplate(res);
    onPlayCry(res.cryURL);
    _pokemon = res;
  });
};

onCursorMove = value => {
  document.querySelectorAll('.control i')[cursorPostion].style.visibility =
    'hidden';
  cursorPostion += value;
  if (cursorPostion < 0) cursorPostion = 3;
  if (cursorPostion > 3) cursorPostion = 0;
  document.querySelectorAll('.control i')[cursorPostion].style.visibility =
    'visible';
};

onSelect = ({ description, cryURL }) => {
  switch (cursorPostion) {
    case 0:
      onChangePage(description);
      break;
    case 1:
      onPlayCry(cryURL);
      break;
    case 2:
      onPrint();
      break;
    case 3:
      onBack();
      break;
    default:
      break;
  }
};

onChangePage = description => {
  SFXSelect.play();
  let descriptionHTML;
  if (page === 'P.1') {
    page = 'P.2';
    descriptionHTML = description[2];
  } else {
    page = 'P.1';
    descriptionHTML = description[1];
  }
  document.querySelector('.top_left__page p').innerText = page;
  document.querySelector('.description').innerHTML = descriptionHTML;
};

onPlayCry = cryURL => {
  new Audio(cryURL).play();
};

onPrint = () => {
  SFXPrint.play();
  window.print();
};

onBack = () => {
  SFXBack.play();
};

onChangePokemon = value => {
  let pkmnId = getPkmnId() + value;

  if (pkmnId < 1) {
    pkmnId = 251;
  } else if (pkmnId > 251) {
    pkmnId = 1;
  }
  window.location.search = `id=${pkmnId}`;
  onRenderPokemon(new Pokemon(pkmnId));
};

const pokemonTemplate = ({
  number,
  name,
  category,
  type,
  height,
  weight,
  description,
  imageURL,
}) => {
  let stringNumber = `${number}`;
  while (stringNumber.length < 3) {
    stringNumber = `0${stringNumber}`;
  }
  return `
  <div class="pokedex__container">
    <div class="title">Pokedex Pokémon Crytal</div>
    <div id="pokemon">
      <div id="main">
        <div class="top">
          <div class="top_left">
            <div
              class="top_left__image"
              data-cy="img_pokemon"
              style="background-image: url(${imageURL})"
            ></div>
            <div class="top_left__number" data-cy="number">
              No.${stringNumber}
            </div>
            <div class="top_left__page" data-cy="page_number"><p>P.1</p></div>
          </div>
          <div class="top_right" id="info">
            <div class="column" data-cy="name">${name}</div>
            <div class="column" data-cy="category">${category}</div>
            <div class="column" data-cy="type">${type}</div>
            <div class="column" data-cy="height">HT <b>${height}</b></div>
            <div class="column" data-cy="weight">WT <b>${weight}</b>lb</div>
          </div>
        </div>
        <div class="description" data-cy="description">${description[1]}</div>
      </div>
      <div class="bottom">
        <div class="control" data-cy="btn_page">
          <i class="cursor">></i>Page
        </div>
        <div class="control" data-cy="btn_cry">
          <i class="cursor">></i>Cry
        </div>
        <div class="control" data-cy="btn_print">
          <i class="cursor">></i>Print
        </div>
        <div class="control" data-cy="btn_back">
          <i class="cursor">></i>Back
        </div>
      </div>
    </div>
    <div class="tutorial">
      <div>◄ ►</div><div>Move cursor</div>
      <div>▲ ▼</div><div>Change Pokémon</div>
      <div>A/ENTER</div><div>Select</div>
    </div>
  </div>
    `;
};
if (!window.location.search) {
  window.location.search = `id=1`;
}
onRenderPokemon(new Pokemon(getPkmnId()));

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'Enter':
    case 'a':
      onSelect(_pokemon);
      break;
    case 'ArrowLeft':
      onCursorMove(-1);
      break;
    case 'ArrowRight':
      onCursorMove(1);
      break;
    case 'ArrowUp':
      onChangePokemon(-1);
      break;
    case 'ArrowDown':
      onChangePokemon(1);
      break;
    case 'Escape':
    case 'b':
      onBack();
      break;
    default:
      break;
  }
});

window.addEventListener('afterprint', () => {
  SFXPrint.pause();
  SFXPrint.currentTime = 0;
});
