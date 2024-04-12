import {isEscapeKey} from './util.js';
import {addScaleListeners, removeScaleListeners} from './image-scale-editor.js';
import {addEffectsListeners, removeEffectsListeners} from './effect-slider.js';
import { pristine } from './form-validation.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const imagePreview = form.querySelector('.img-upload__preview > img');
const imagePreviewEffects = document.querySelectorAll('.effects__preview');
const imageInput = form.querySelector('.img-upload__input');
const imageOverlay = form.querySelector('.img-upload__overlay');
const imageHashtags = form.querySelector('.text__hashtags');
const imageDescription = form.querySelector('.text__description');
const uploadCloseButton = imageOverlay.querySelector('.img-upload__cancel');

const onDocumentKeydown = function (keydownEvt) {
  const errorMessage = body.querySelector('.error');
  if (isEscapeKey(keydownEvt) && document.activeElement !== imageDescription &&
      document.activeElement !== imageHashtags && !errorMessage) {
    keydownEvt.preventDefault();
    closeUploadImgModal();
  }
};

imageInput.addEventListener('change', () => {
  imageOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  const file = imageInput.files[0];
  const fileName = file.name.toLowerCase();
  const fileExt = fileName.split('.').pop();
  const matches = FILE_TYPES.includes(fileExt);

  if (matches) {
    const url = URL.createObjectURL(file);
    imagePreview.src = url;
    imagePreviewEffects.forEach((item) => {
      item.style.backgroundImage = `url(${url})`;
    });
  } else {
    return;
  }

  addScaleListeners();
  addEffectsListeners();

  document.addEventListener('keydown', onDocumentKeydown);

});

function closeUploadImgModal () {
  document.removeEventListener('keydown', onDocumentKeydown);

  removeScaleListeners();
  removeEffectsListeners();

  imageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  form.reset();
  pristine.reset();
}

uploadCloseButton.addEventListener('click', closeUploadImgModal);

export {closeUploadImgModal};

