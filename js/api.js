const apiKey = 'c6e5cf6d'; 

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

  const cachedData = sessionStorage.getItem(`movie_${title}`);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
// a rajouter plus tard await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&plot=full&apikey=${apiKey}`);
  try {
    const response = {"Title":"Cars","Year":"2006","Rated":"G","Released":"09 Jun 2006","Runtime":"116 min","Genre":"Animation, Adventure, Comedy","Director":"John Lasseter, Joe Ranft","Writer":"John Lasseter, Joe Ranft, Jorgen Klubien","Actors":"Owen Wilson, Bonnie Hunt, Paul Newman","Plot":"On the way to the biggest race of his life, a hotshot rookie race car gets stranded in a rundown town and learns that winning isn't everything in life.","Language":"English, Italian, Japanese, Yiddish","Country":"United States","Awards":"Nominated for 2 Oscars. 28 wins & 34 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.3/10"},{"Source":"Rotten Tomatoes","Value":"74%"},{"Source":"Metacritic","Value":"73/100"}],"Metascore":"73","imdbRating":"7.3","imdbVotes":"490,857","imdbID":"tt0317219","Type":"movie","DVD":"N/A","BoxOffice":"$244,082,982","Production":"N/A","Website":"N/A","Response":"True"}
    const data = await response.json();
    if (data.Response === 'True') {
      sessionStorage.setItem(`movie_${title}`, JSON.stringify(data));
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
async function displayMovieCard(parent, title) {
  const card = createCardWithLoading();
  parent.appendChild(card);

  const movieData = await fetchMovieData(title);

  if (movieData) {
    updateCardWithMovieData(card, movieData);
  } else {
    card.innerHTML = `<h5 class="movie-title">Film non trouvé : ${title}</h5>`;
  }
}
function createPosterCard(movie) {
  const card = document.createElement('div');
  card.classList.add('movie-poster');
  card.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster-img">
  `;
  return card;
}
async function displayPosterCards(parent, titles) {
  for (const title of titles) {
    const movieData = await fetchMovieData(title);
    if (movieData && movieData.Poster) {
      const card = createPosterCard(movieData);
      parent.appendChild(card);
    }
  }
}
async function loadInitialMovies() {
  const container = document.getElementById('movie-card-container');
  const posterContainer = document.getElementById('poster-container');
  posterContainer.style.display = 'grid';
  posterContainer.style.gridTemplateColumns = 'repeat(6, 1fr)'; 
  posterContainer.style.gap = '1rem';
  posterContainer.style.marginTop = '2rem';

  const movieTitles = ['Batman', 'The Dark Knight', 'Inception', 'Interstellar'];
  const posterTitles = ['Dunkirk', 'Tenet', 'Memento', 'The Prestige', 'Insomnia', 'Following'];

  for (const title of movieTitles) {
    await displayMovieCard(container, title);
  }

  await displayPosterCards(posterContainer, posterTitles);
}

async function searchMovie() {
  const searchInput = document.getElementById('search-input').value;
  if (searchInput) {
    const container = document.getElementById('movie-card-container');
    container.innerHTML = '';

    await displayMovieCard(container, searchInput);
  }
}

function getTitleFromURL() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('title');
}

async function displayMovie() {
  const title = getTitleFromURL();
  if (title) {
    const container = document.getElementById('movie-card-container');
    container.innerHTML = ''; 

    const movieData = await fetchMovieData(title);
    if (movieData) {
      const card = document.createElement('div');
      card.classList.add('movie'); 
      card.innerHTML = `
        <h5 class="movie-title">${movieData.Title}</h5>
        <div style="display: flex; align-items: flex-start;">
          <img src="${movieData.Poster}" class="movie-img-left" alt="${movieData.Title}">
          <div>
            <p class="movie-plot">${movieData.Plot || 'Aucun résumé disponible.'}</p>
            <p class="movie-genre"><small class="text-muted">${movieData.Genre}</small></p>
            <p class="movie-actors"><small class="text-muted">${movieData.Actors}</small></p>
            <p class="movie-dvd"><small class="text-muted">Date de sortie en DVD : ${movieData.DVD || 'Non disponible'}</small></p>
            <div class="movie-ratings">
              <h6>Ratings:</h6>
              ${movieData.Ratings.map(rating => `
                <p><strong>${rating.Source}:</strong> ${rating.Value}</p>
              `).join('')}
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    } else {
      container.innerHTML = `<p>Film non trouvé : ${title}</p>`;
    }
  } else {
    container.innerHTML = `<p>Aucun titre de film spécifié.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('movie.html')) {
    displayMovie(); 
  } else {
    loadInitialMovies(); 
  }
});

document.getElementById('search-button').addEventListener('click', searchMovie);