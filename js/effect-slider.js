const form = document.querySelector('.img-upload__form');
const imagePreview = form.querySelector('.img-upload__preview img');
const effectContainer = form.querySelector('.img-upload__effect-level');
const effectValue = effectContainer.querySelector('.effect-level__value');
const effectSlider = effectContainer.querySelector('.effect-level__slider');
const effectsList = form.querySelector('.effects__list');

const effectsOptions = {
  'chrome': [0, 1, 0.1, ''],
  'sepia': [0, 1, 0.1, ''],
  'marvin': [0, 100, 1, '%'],
  'phobos': [0, 3, 0.1, 'px'],
  'heat': [0, 3, 0.1, ''],
};

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  format: {
    to:function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

function updateEffectOptions (effect) {
  const options = effectsOptions[effect];
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: options[0],
      max: options[1]
    },
    start: options[1],
    step: options[2]
  });
  effectValue.value = options[1];
  changeEffect(effect, options[1]);
}

function changeEffect (effect, value) {
  const options = effectsOptions[effect];
  switch(effect) {
    case 'none':
      imagePreview.style.filter = 'none';
      break;
    case 'chrome':
      imagePreview.style.filter = `grayscale(${value}${options[3]})`;
      break;
    case 'sepia':
      imagePreview.style.filter = `sepia(${value}${options[3]})`;
      break;
    case 'marvin':
      imagePreview.style.filter = `invert(${value}${options[3]})`;
      break;
    case 'phobos':
      imagePreview.style.filter = `blur(${value}${options[3]})`;
      break;
    case 'heat':
      imagePreview.style.filter = `brightness(${value}${options[3]})`;
      break;
  }
}

let effectName;

function isOriginalEffect () {
  effectContainer.classList.add('visually-hidden');
  effectValue.value = '';
  changeEffect('none', 0);
}

function handleSliderChange () {
  effectValue.value = effectSlider.noUiSlider.get();
  changeEffect(effectName, effectValue.value);
}

function handleRadioChange (evt) {
  if(evt.target.value){
    effectName = evt.target.value;
    if (effectName !== 'none') {
      effectContainer.classList.remove('visually-hidden');
      updateEffectOptions(effectName);
    } else {
      isOriginalEffect();
    }
  }
}

function addEffectsListeners () {
  isOriginalEffect();
  effectsList.addEventListener('click', handleRadioChange);
  effectSlider.noUiSlider.on('slide', handleSliderChange);
}

function removeEffectsListeners () {
  effectsList.removeEventListener('click', handleRadioChange);
  effectSlider.noUiSlider.off();
}

export {addEffectsListeners, removeEffectsListeners};
