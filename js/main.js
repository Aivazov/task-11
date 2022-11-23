const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31522217-1daa00f4dac69c1e930d1cd07';
let PAGE = 1;
let inputValue = '';

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchInpt: document.querySelector('#search-form > input'),
  searchBtn: document.querySelector('#search-btn'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

console.log(refs);

refs.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  PAGE = 1;

  refs.loadMoreBtn.classList.remove('hidden');

  inputValue = refs.searchInpt.value;

  console.log('inputValue', inputValue);
  fetchPictures(refs.searchInpt.value);
  refs.searchInpt.value = '';
  refs.gallery.innerHTML = '';
});

refs.loadMoreBtn.addEventListener('click', (e) => {
  PAGE += 1;
  fetchPictures(inputValue);
});

function fetchPictures(data) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${data}&image_type=photo&orientation=horizontal&safesearch=true&per_page=8&page=${PAGE}`
  )
    .then((data) => data.json())
    .then((data) => {
      renderImages(data);
      Notiflix.Notify.success('Hooray! We found totalHits images.');
    })
    .catch((e) =>
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      )
    );
}

function renderImages(data) {
  data.hits.map((response) => {
    console.log(response);

    const markup = `
      <div class="photo-card">
      <img src="${response.webformatURL}" alt="" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <b>${response.likes}</b>
        </p>
        <p class="info-item">
          <b>Views</b>
          <b>${response.views}</b>
        </p>
        <p class="info-item">
          <b>Comments </b>
          <b>${response.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads</b>
          <b>${response.downloads}</b>
        </p>
        </div>
      </div>
      `;

    refs.gallery.insertAdjacentHTML('beforeend', markup);
  });
  // console.log(data)
}
