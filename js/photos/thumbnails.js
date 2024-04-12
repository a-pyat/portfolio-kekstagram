import {bigPictureOpen} from './big-photo';

const pictures = document.querySelector('.pictures');

const template = document.querySelector('#picture').content.querySelector('.picture');

const renderPublicationPhotos = (photos) => {
  const photosFragment = document.createDocumentFragment();

  photos.forEach((miniature) => {
    const photo = template.cloneNode(true);

    photo.querySelector('.picture__img').src = miniature.url;
    photo.querySelector('.picture__img').alt = miniature.description;
    photo.querySelector('.picture__likes').textContent = miniature.likes;
    photo.querySelector('.picture__comments').textContent = miniature.comments.length;

    photosFragment.appendChild(photo);

    photo.addEventListener('click', (evt) => bigPictureOpen(evt, miniature));
  });

  pictures.appendChild(photosFragment);
};

export { renderPublicationPhotos };
