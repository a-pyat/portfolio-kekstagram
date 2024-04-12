import {showAlert} from './util.js';
import { setUserFormSubmit } from './form-validation.js';
import { configFilter } from './filter.js';
import { renderPublicationPhotos } from './photos/thumbnails.js';
import { getData } from './api.js';

getData().then((photos) => {
  renderPublicationPhotos(photos);
  configFilter(photos);
})
  .catch((err)=>{
    showAlert(err.message);
  });

setUserFormSubmit();
