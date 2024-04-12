import {isEscapeKey} from '../util.js';
import {renderComments, closeComments} from '../comments.js';

const body = document.querySelector('body');

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureClose();
  }
};

const bigPictureOpen = (evt, photo) => {
  evt.preventDefault();

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = photo.url;
  bigPictureLikes.textContent = photo.likes;
  bigPictureSocialCaption.textContent = photo.description;

  renderComments(photo.comments);

  document.addEventListener('keydown', onDocumentKeydown);
};

function bigPictureClose () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  closeComments();
  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureCancel.addEventListener('click', () => {
  bigPictureClose();
  document.removeEventListener('keydown', onDocumentKeydown);
});

export {bigPictureOpen};
