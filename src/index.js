import './sass/main.scss';
import { fetchImages } from './js/fetchImages';
import { refs } from './js/refs';
import { renderGalleryList } from './js/render-gallery';
import Notiflix from 'notiflix';

/**для кнопки */
// refs.loadMoreBtn.disabled = true;

let name = ``;
let page = 1;

refs.form.addEventListener(`submit`, onFormSearch);

/**для кнопки */
// refs.loadMoreBtn.addEventListener(`click`, onLoadMoreBtn);

function onFormSearch(evt) {
  evt.preventDefault();
  page = 1;
  name = evt.currentTarget.searchQuery.value.trim();
  refs.gallery.innerHTML = ``;

  /**для кнопки */
  // refs.loadMoreBtn.disabled = true;

  if (name === ``) {
    Notiflix.Notify.failure('Search field cannot be empty');
    return;
  }

  fetchImages(name, page)
    .then(images => {
      if (images.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
        return;
      }

      /**для кнопки */
      // if (images.hits.length < 40) {
      //   refs.loadMoreBtn.disabled = true;
      // } else {
      //   refs.loadMoreBtn.disabled = false;
      // }

      renderGalleryList(images);
      Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
    })
    .catch(error => console.log());
}

function onLoadMoreBtn() {
  page += 1;
  fetchImages(name, page)
    .then(images => {
      const totalPages = images.totalHits / (page * images.hits.length);
      if (totalPages < 1) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        observer.disconnect(refs.search)
        /**для кнопки */
        // refs.loadMoreBtn.disabled = true;
      }
      renderGalleryList(images);
      Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
    })
    .catch(error => console.log(error));
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && name !== ``) {
      onLoadMoreBtn();
    }
  });
};
const options = {
  rootMargin: '200px',
};

const observer = new IntersectionObserver(onEntry, options);

observer.observe(refs.search);
