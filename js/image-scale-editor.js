const SCALE_STEP = 0.25;

const form = document.querySelector('.img-upload__form');
const imagePreview = form.querySelector('.img-upload__preview img');

const imageScale = form.querySelector('.img-upload__scale');
const scaleValue = imageScale.querySelector('.scale__control--value');
const smallerScale = imageScale.querySelector('.scale__control--smaller');
const biggerScale = imageScale.querySelector('.scale__control--bigger');

let scale = 1;

function onSmallerClick () {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    imagePreview.style.transform = `scale(${scale})`;
    scaleValue.value = `${scale * 100}%`;
  }
}

function onBiggerClick () {
  if (scale < 1) {
    scale += SCALE_STEP;
    imagePreview.style.transform = `scale(${scale})`;
    scaleValue.value = `${scale * 100}%`;
  }
}

function addScaleListeners () {
  scaleValue.value = '100%';
  biggerScale.addEventListener('click', onBiggerClick);
  smallerScale.addEventListener('click', onSmallerClick);
}

function removeScaleListeners () {
  biggerScale.removeEventListener('click', onBiggerClick);
  smallerScale.removeEventListener('click', onSmallerClick);
}

export {addScaleListeners, removeScaleListeners};
