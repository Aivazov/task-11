// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31522217-1daa00f4dac69c1e930d1cd07';
let PAGE = 1;
let inputValue = '';
let arr;
let galleryLightBox = new SimpleLightbox('.gallery a');

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchInpt: document.querySelector('#search-form > input'),
  searchBtn: document.querySelector('#search-btn'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

// console.log(refs);

refs.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  PAGE = 1;

  inputValue = refs.searchInpt.value.trim();
  if (!inputValue) {
    return Notiflix.Notify.info('Please enter a search request');
  }

  fetchPictures(inputValue)
    .then((data) => {
      renderImages(data);
      // if (data.hits.length > 0) {
      // Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      refs.loadMoreBtn.classList.remove('hidden');
      galleryLightBox.options.captionsData = 'alt';
      galleryLightBox.options.captionDelay = 250;
      galleryLightBox.refresh('show.simplelightbox');
      // }
    })
    .catch((e) =>
      Notiflix.Notify.failure('Something went wrong. Please try again')
    );
  // galleryLightBox.refresh();

  refs.searchInpt.value = '';
  refs.gallery.innerHTML = '';
});

refs.loadMoreBtn.addEventListener('click', (e) => {
  PAGE += 1;
  fetchPictures(inputValue)
    .then((res) => {
      renderImages(res);
      let galleryLightBox = new SimpleLightbox('.gallery a');
      galleryLightBox.on('show.simplelightbox');
    })
    .catch((e) =>
      Notiflix.Notify.failure('Something went wrong. Please try again')
    );
  // let galleryLightBox = new SimpleLightbox('.gallery a');
  // galleryLightBox.refresh('show.simplelightbox');
});

// refs.gallery.addEventListener('click', onImageClick);

function fetchPictures(data) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${data}&image_type=photo&orientation=horizontal&safesearch=true&per_page=8&page=${PAGE}`
  ).then((data) => data.json());
  // .then((data) => {
  //   renderImages(data);
  //   if (data.hits.length > 0) {
  //     // Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  //     refs.loadMoreBtn.classList.remove('hidden');
  //     if (!galleryLightBox) {
  //       let galleryLightBox = new SimpleLightbox('.gallery a');
  //       galleryLightBox.options.captionsData = 'alt';
  //       galleryLightBox.options.captionDelay = 250;
  //       galleryLightBox.on('show.simplelightbox');
  //     }
  //   }
  // })
  // .catch((e) =>
  //   Notiflix.Notify.failure('Something went wrong. Please try again')
  // );
}

function renderImages(data) {
  if (!data.hits.length || data.hits.length === 0) {
    refs.loadMoreBtn.classList.add('hidden');

    return Notiflix.Notify.failure(
      'Sorry, the search request was unsuccessful. Please try again'
    );
  }

  data.hits
    .map((response) => {
      const markup = `
        <a href="${response.largeImageURL}" class="photo-card">
          <img src="${response.webformatURL}" alt="${response.tags}" loading="lazy" />
          <div class="">
            <div class="info mt-2">
              <p class="info-item">
                <b>Likes</b>
                <span>${response.likes}</span>
              </p>
              <p class="info-item">
                <b>Views</b>
                <span>${response.views}</span>
              </p>
              <p class="info-item">
                <b>Comments </b>
                <span>${response.comments}</span>
              </p>
              <p class="info-item">
                <b>Downloads</b>
                <span>${response.downloads}</span>
              </p>
            </div>
          </div>
        </a>
      `;

      refs.gallery.insertAdjacentHTML('beforeend', markup);
    })
    .join('');
}

function onImageClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  refs.gallery.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') instance.close();
  });
}
