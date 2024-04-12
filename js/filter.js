import { debounce } from './util';
import { renderPublication } from './render-filter-publication';

const MAX_PICTURE_COUNT = 10;

const FILTERS = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const SORTFUNC = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length,
};

let currentFilter = 'filter-default';
let photos = [];

const filterElement = document.querySelector('.img-filters');
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const debounceRender = debounce(renderPublication);

function onFilterChange(evt) {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);

  if (!targetButton.matches('button')) {
    return;
  }

  if (activeButton === targetButton) {
    return;
  }

  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.getAttribute('id');

  applyFilter();
}

function applyFilter() {

  let filteredPictures = [];

  switch(currentFilter) {
    case FILTERS.default:
      filteredPictures = photos;
      break;

    case FILTERS.random:
      filteredPictures = photos.toSorted(SORTFUNC.random).slice(0, MAX_PICTURE_COUNT);
      break;

    case FILTERS.discussed:
      filteredPictures = photos.toSorted(SORTFUNC.discussed);
      break;
  }

  debounceRender(filteredPictures);
}

function configFilter(picturesData) {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', onFilterChange);
  photos = picturesData;
}

export {configFilter};
