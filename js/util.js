const ERROR_TIME = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const errorTemplate = document.querySelector('#data-error').content.querySelector('section');
function showAlert(message) {
  const errorElement = errorTemplate.cloneNode(true);
  const errorTitle = errorElement.querySelector('h2');
  errorTitle.textContent = message;
  document.body.insertAdjacentElement('beforeend',errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, ERROR_TIME);
}

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  isEscapeKey,
  showAlert,
  debounce,
};
