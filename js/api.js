const apiKey = 'c6e5cf6d';


async function fetchMoviesFrom2024() {

  const moviesFrom2024 = [
    'Dune: Part Two',
    'The Batman',
    'Avatar: The Way of Water',
    'Spider-Man: Across the Spider-Verse',
    'Mission: Impossible 8'
  ];

  return moviesFrom2024;
}


function createCardWithLoading() {
  const card = document.createElement('div');
  card.classList.add('movie');
  card.innerHTML = `
    <h5 class="movie-title">Chargement en cours...</h5>
    <div style="display: flex; align-items: flex-start;">
      <div class="movie-img-left" style="background-color: #333; width: 200px; height: 300px;"></div>
      <div>
        <p class="movie-plot">Chargement du grand résumé...</p>
        <p class="movie-genre"><small class="text-muted">Chargement du genre...</small></p>
        <p class="movie-actors"><small class="text-muted">Chargement des acteurs...</small></p>
        <p class="movie-dvd"><small class="text-muted">Chargement de la date de sortie en DVD...</small></p>
        <div class="movie-ratings">
          <h6>Ratings:</h6>
          <p>Chargement des évaluations...</p>
        </div>
      </div>
    </div>
  `;
  return card;
}

function updateCardWithMovieData(card, movie) {
  const ratingsHTML = movie.Ratings.map(rating => `
    <p><strong>${rating.Source}:</strong> ${rating.Value}</p>
  `).join('');

  const plotText = movie.Plot || 'Aucun résumé disponible.';
  const dvdDate = movie.DVD || 'Date de sortie en DVD non disponible.';

  card.innerHTML = `
    <h5 class="movie-title">${movie.Title}</h5>
    <div style="display: flex; align-items: flex-start;">
      <img src="${movie.Poster}" class="movie-img-left" alt="${movie.Title}">
      <div>
        <p class="movie-plot">${plotText}</p>
        <p class="movie-genre"><small class="text-muted">${movie.Genre}</small></p>
        <p class="movie-actors"><small class="text-muted">${movie.Actors}</small></p>
        <p class="movie-dvd"><small class="text-muted">Date de sortie en DVD : ${dvdDate}</small></p>
        <div class="movie-ratings">
          <h6>Ratings:</h6>
          ${ratingsHTML}
        </div>
      </div>
    </div>
  `;
}

async function fetchMovieData(title) {
  const cachedMovie = sessionStorage.getItem(title);
  if (cachedMovie) {
    return JSON.parse(cachedMovie);
  }

  try {
    const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&plot=full&apikey=${apiKey}`);
    const data = await response.json();
    if (data.Response === 'True') {
      sessionStorage.setItem(title, JSON.stringify(data));
      return data;
    } else {
      console.error(`Film non trouvé : ${title}`);
      return null;
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération des données pour ${title}:`, error);
    return null;
  }
}

async function createMovieCard(title) {
  const card = document.createElement('div');
  card.classList.add('card');

  const movieData = await fetchMovieData(title);

  if (movieData) {
    card.innerHTML = `
      <img src="${movieData.Poster}" alt="${movieData.Title}" class="movie-poster">
      <div class="card-info">
        <h3>${movieData.Title}</h3>
        <p>${movieData.Plot || 'Aucun résumé disponible.'}</p>
      </div>
      <button class='button-prim'>Découvrir</button>
    `;

    const discoverButton = card.querySelector('.button-prim');
    discoverButton.addEventListener('click', () => {
      window.location.href = `movie.html?title=${encodeURIComponent(movieData.Title)}`;
    });
  } else {
    card.innerHTML = `<p>Film non trouvé : ${title}</p>`;
  }

  return card;
}


async function loadMoreMoviesFrom2024() {
  const container = document.getElementById('movie-card-container');
  const moviesFrom2024 = await fetchMoviesFrom2024();

  if (moviesFrom2024.length > 0) {
    for (const title of moviesFrom2024) {
      const card = await createMovieCard(title);
      container.appendChild(card);
    }
  } else {
    alert('Aucun film trouvé pour 2024.');
  }
}


class CardCarousel {
  constructor(carouselName, cardName, gap, controlButtonName) {
    this.carouselFrame = document.querySelector(`#${carouselName}`);
    this.carouselWidth = this.carouselFrame.offsetWidth;
    this.cardWidth = this.carouselFrame.querySelector(`.${cardName}`).offsetWidth;
    this.maxWidth = -(this.carouselFrame.scrollWidth - this.carouselFrame.offsetWidth);

    this.gap = gap;
    this.position = 0;
    this.isHolding = false;
    this.posCursor = 0;

    const leftBtn = document.querySelector(`#${controlButtonName[0]}`);
    const rightBtn = document.querySelector(`#${controlButtonName[1]}`);
    leftBtn.addEventListener('click', () => { this.moveCarousel('l'); });
    rightBtn.addEventListener('click', () => { this.moveCarousel('r'); });
    this.carouselFrame.addEventListener('mousedown', (event) => { this.holding(event); });

    window.addEventListener('resize', () => {
      const newWidth = this.carouselFrame.offsetWidth;
      this.position += newWidth - this.carouselWidth;
      this.carouselWidth = newWidth;
      this.setTransform(true);
    });
  }

  setTransform(noTransition = false) {
    if (this.position < this.maxWidth) this.position = this.maxWidth;
    if (this.position > 0) this.position = 0;

    if (noTransition) {
      this.carouselFrame.style.transition = 'none';
      this.carouselFrame.style.transform = `translateX(${this.position}px)`;
      setTimeout(() => { this.carouselFrame.style.transition = 'transform .2s ease-in-out'; }, 10);
    } else {
      this.carouselFrame.style.transform = `translateX(${this.position}px)`;
    }
  }

  holding(event) {
    this.isHolding = true;
    document.body.style.cursor = 'grabbing';
    this.posCursor = event.clientX;

    window.addEventListener('mouseup', this.stopHolding);
    window.addEventListener('mousemove', this.dragCarousel);
  }

  dragCarousel = (event) => {
    if (this.isHolding) {
      const newPos = event.clientX - this.posCursor;
      this.posCursor = event.clientX;
      this.position += newPos;
      this.setTransform(true);
    }
  };

  stopHolding = () => {
    this.isHolding = false;
    document.body.style.cursor = 'default';
    window.removeEventListener('mouseup', this.stopHolding);
    window.removeEventListener('mousemove', this.dragCarousel);
  };

  moveCarousel(direction) {
    const carouselWidth = this.carouselFrame.offsetWidth;
    const scrollAmount = (this.cardWidth + this.gap) * Math.floor(carouselWidth / (this.cardWidth + this.gap));
    this.maxWidth = -(this.carouselFrame.scrollWidth - this.carouselFrame.offsetWidth);

    if (direction === 'r') this.position -= scrollAmount;
    else this.position += scrollAmount;

    this.setTransform();
  }
}

async function setupCardCarousel(carouselName, cardName, movies, gap, controlButtonName) {
  const parent = document.getElementById(carouselName);
  parent.innerHTML = '';

  for (const title of movies) {
    const card = await createMovieCard(title);
    parent.appendChild(card);
  }

  new CardCarousel(carouselName, cardName, gap, controlButtonName);
}


document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('movie.html')) {
    displayMovie();
  } else {
    loadInitialMovies();
  }
});


document.getElementById('load-more-2024').addEventListener('click', loadMoreMoviesFrom2024);