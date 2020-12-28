const pokemonView = () => {
  const SFXSelect = new Audio('./sound/sfx/SFX_PRESS_AB.wav');
  SFXSelect.volume = 0.1;
  const SFXBack = new Audio('./sound/sfx/SFX_BACK.wav');
  SFXBack.volume = 0.1;
  const SFXPrint = new Audio('./sound/sfx/SFX_Printer.mp3');
  SFXPrint.volume = 0.3;

  let cursorPostion = 0;
  let page = 'P.1';
  let _pokemon;

  const getPkmnId = () => {
    const pkmnIdParam = parseInt(window.location.hash.replace('#p', ''));

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
      addBtnListeners();
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
    const cry = new Audio(cryURL);
    cry.volume = 0.1;
    cry.play();
  };

  onPrint = () => {
    SFXPrint.play();
    window.print();
  };

  onBack = () => {
    SFXBack.play();
    setTimeout(() => {
      pokedexView();
      document.location.href = `${document.location.pathname}#l${getPkmnId()}`;
      location.reload();
    }, 300);
  };

  onChangePokemon = value => {
    let pkmnId = getPkmnId() + value;

    if (pkmnId < 1) {
      pkmnId = 251;
    } else if (pkmnId > 251) {
      pkmnId = 1;
    }
    window.location.hash = `p${pkmnId}`;
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
    <div class="title">Pokedex Pokémon Crystal</div>
    <div class="pokedex__frame">
      <div class="pokemon__main section">
        <div class="top">
          <div class="top_left">
            <div
              class="image"
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
        <div class="control btn_page"  data-cy="btn_page">
          <i class="cursor">></i>Page
        </div>
        <div class="control btn_cry" data-cy="btn_cry">
          <i class="cursor">></i>Cry
        </div>
        <div class="control btn_print" data-cy="btn_print">
          <i class="cursor">></i>Print
        </div>
        <div class="control btn_back" data-cy="btn_back">
          <i class="cursor">></i>Back
        </div>
      </div>
    </div>
    <div class="tutorial" data-cy="tutorial">
      <div>◄ ►</div><div>Move cursor</div>
      <div>▲ ▼</div><div>Change Pokémon</div>
      <div>A/ENTER</div><div>Select</div>
    </div>
    <div class="mobile_control" data-cy="mobile_control"> 
      <h2 id="mobile_control__title">Change Pokémon</h2>
      <img id="button_left" data-cy="btn_left" src="./img/arrow.png" alt="left arrow button">
      <img id="button_right" data-cy="btn_right" src="./img/arrow.png" alt="left arrow button">
    </div>
  </div>
    `;
  };
  if (!window.location.hash) {
    window.location.hash = `p1`;
  }
  onRenderPokemon(new Pokemon(getPkmnId()));
  //CONTROLS

  //KEYBOARD
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

  //MOBILE
  addBtnListeners = () => {
    document
      .querySelector('#button_left')
      .addEventListener('touchstart', () => onChangePokemon(-1));
    document
      .querySelector('#button_right')
      .addEventListener('touchstart', () => onChangePokemon(1));
    document
      .querySelector('.btn_page')
      .addEventListener('touchstart', () => onChangePage(_pokemon.description));
    document
      .querySelector('.btn_cry')
      .addEventListener('touchstart', () => onPlayCry(_pokemon.cryURL));
    document
      .querySelector('.btn_print')
      .addEventListener('touchstart', () => onPrint());
    document
      .querySelector('.btn_back')
      .addEventListener('touchstart', () => onBack());
  };
  window.addEventListener('afterprint', () => {
    SFXPrint.pause();
    SFXPrint.currentTime = 0;
  });
};
