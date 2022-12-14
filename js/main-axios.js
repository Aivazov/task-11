// const instance = axios.create({
//   baseURL: 'https://pixabay.com/api/',
//   timeout: 1000,
//   headers: { 'X-Custom-Header': 'foobar' },
// });

// axios({
//   method: 'get',
//   url: 'https://pixabay.com/api/',
//   responseType: 'stream',
// });

const AUTH_TOKEN = '31522217-1daa00f4dac69c1e930d1cd07';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] =
  'application/json; charset=utf-8';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31522217-1daa00f4dac69c1e930d1cd07';
let PAGE = 1;
let inputValue = '';
let galleryLightBox = new SimpleLightbox('.photo-card a');

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

  refs.loadMoreBtn.classList.remove('hidden');

  inputValue = refs.searchInpt.value;

  // console.log('inputValue', inputValue);
  //
  fetchPictures(refs.searchInpt.value);
  galleryLightBox.open();

  refs.searchInpt.value = '';
  refs.gallery.innerHTML = '';
});

refs.loadMoreBtn.addEventListener('click', (e) => {
  PAGE += 1;
  fetchPictures(inputValue);
});

function fetchPictures(data) {
  // return fetch(
  //   `${BASE_URL}?key=${API_KEY}&q=${data}&image_type=photo&orientation=horizontal&safesearch=true&per_page=8&page=${PAGE}`
  // )
  //   .then((data) => data.json())
  axios
    .get(
      `${axios.defaults.baseURL}?key=${axios.defaults.headers.common}&q=${data}&image_type=photo&orientation=horizontal&safesearch=true&per_page=8&page=${PAGE}`
    )
    .then(function (response) {
      // renderImages(data);
      console.log(data);
      Notiflix.Notify.success('Hooray! We found totalHits images.');
    })
    .catch(function (error) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    })
    .then(function () {});
}

function renderImages(data) {
  data.hits
    .map((response) => {
      // console.log(response);

      const markup = `
      <div class="photo-card">
      <a href="${response.largeImageURL}">
        <img src="${response.webformatURL}" alt="" loading="lazy" />
      </a>
      <div class="info">
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
      `;

      refs.gallery.insertAdjacentHTML('beforeend', markup);
    })
    .join('');
  // console.log(data)
}
