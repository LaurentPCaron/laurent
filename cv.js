const Y_POSITION_HOME = 0;
const Y_POSITION_PROJECT =
  document.querySelector('.section__projects').offsetTop - 100;
const Y_POSITION_EXP = document.querySelector('.exps').offsetTop - 100;
const Y_POSITION_SKILLS =
  document.querySelector('.section__skills').offsetTop - 70;
const Y_POSITION_EDUC = document.querySelector('.formations').offsetTop - 100;

//MENU ITEMS
const menuOptions = document.querySelector('.top_menu_options');
const burgerBtn = document.querySelector('.burger');
const menuHomeBtn = document.querySelector('#menu__home');
const menuProjectsBtn = document.querySelector('#menu__projects');
const menuExpBtn = document.querySelector('#menu__exp');
const menuSkillsBtn = document.querySelector('#menu__skills');
const menuEducBtn = document.querySelector('#menu__educ');

//Toggle buger menu
burgerBtn.addEventListener('click', () => {
  if (menuOptions.className.includes('hidden')) {
    menuOptions.classList.remove('hidden');
  } else {
    menuOptions.classList.add('hidden');
  }
});

document.addEventListener('click', e => {
  if (
    !e.target.className.includes('burger') &&
    !menuOptions.className.includes('hidden')
  ) {
    menuOptions.classList.add('hidden');
  }
});

//Menu Items Event
menuHomeBtn.addEventListener('click', e => {
  window.scroll({ top: Y_POSITION_HOME, behavior: 'smooth' });
});
menuProjectsBtn.addEventListener('click', e => {
  window.scroll({ top: Y_POSITION_PROJECT, behavior: 'smooth' });
});
menuExpBtn.addEventListener('click', e => {
  window.scroll({ top: Y_POSITION_EXP, behavior: 'smooth' });
});
menuSkillsBtn.addEventListener('click', e => {
  window.scroll({ top: Y_POSITION_SKILLS, behavior: 'smooth' });
});
menuEducBtn.addEventListener('click', e => {
  window.scroll({ top: Y_POSITION_EDUC, behavior: 'smooth' });
});

//Scrolling event for the menu
window.addEventListener('scroll', () => {
  if (!menuOptions.className.includes('hidden')) {
    menuOptions.classList.add('hidden');
  }
  const y = window.scrollY;

  if (y >= Y_POSITION_HOME && y < Y_POSITION_PROJECT) {
    menuHomeBtn.classList.add('active');
    menuProjectsBtn.classList.remove('active');
  } else if (y >= Y_POSITION_PROJECT && y < Y_POSITION_EXP) {
    menuHomeBtn.classList.remove('active');
    menuProjectsBtn.classList.add('active');
    menuExpBtn.classList.remove('active');
  } else if (y >= Y_POSITION_EXP && y < Y_POSITION_SKILLS) {
    menuProjectsBtn.classList.remove('active');
    menuExpBtn.classList.add('active');
    menuSkillsBtn.classList.remove('active');
  } else if (y >= Y_POSITION_SKILLS && y < Y_POSITION_EDUC) {
    menuExpBtn.classList.remove('active');
    menuSkillsBtn.classList.add('active');
    menuEducBtn.classList.remove('active');
  } else {
    menuSkillsBtn.classList.remove('active');
    menuEducBtn.classList.add('active');
  }
});

//To the top button
document.querySelector('.footer__up').addEventListener('click', e => {
  window.scroll({ top: Y_POSITION_HOME, behavior: 'smooth' });
});
