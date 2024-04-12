
import { sendData } from './api.js';
import { closeUploadImgModal } from './form.js';
import { handleSuccessMessage, handleErrorMessage } from './response-message.js';

const form = document.querySelector('.img-upload__form');
const imageHashtags = form.querySelector('.text__hashtags');
const imageDescription = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');


const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});


function validateDescription (value) {
  return value.length <= 140;
}

pristine.addValidator(imageDescription, validateDescription, 'Длина комментария не может превышать 140 символов.');

let errorMessageHashtags = '';

const error = () => errorMessageHashtags;

const isValidHashtags = (value) => {
  errorMessageHashtags = '';

  const inputText = value.toLowerCase().trim();

  if (inputText.length === 0) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хештег не может состоять из одной решетки',
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с символа \'#\'',
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хештега ${MAX_SYMBOLS} символов, включая решетку`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хештегов`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хештег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if(isInvalid) {
      errorMessageHashtags = rule.error;
    }
    return !isInvalid;
  });
};

pristine.addValidator(imageHashtags, isValidHashtags, error);

const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const validation = pristine.validate();
    if (validation) {
      submitButton.disabled = true;
      sendData(new FormData(evt.target))
        .then(() => {
          closeUploadImgModal();
          handleSuccessMessage();
        })
        .catch(() => {
          handleErrorMessage();
        })
        .finally(() => {
          submitButton.disabled = false;
        });
    }
  });

};

export {setUserFormSubmit, pristine};
