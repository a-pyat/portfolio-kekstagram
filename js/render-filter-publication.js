import { renderPublicationPhotos } from './photos/thumbnails';

const pictureContainer = document.querySelector('.pictures');
let photos = [];

const clearPublications = () => {
  pictureContainer.querySelectorAll('.picture').forEach((item) => item.remove());
};

const renderPublication = (picturesData) => {
  clearPublications();
  photos = picturesData;
  renderPublicationPhotos(photos);
};

export { renderPublication };
