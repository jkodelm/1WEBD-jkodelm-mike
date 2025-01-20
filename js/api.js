const apiKey = 'c6e5cf6d'; 

function createCardWithLoading() {
  const card = document.createElement('div');
  card.classList.add('movie');
  card.innerHTML = `
    <h5 class="movie-title">Chargement en cours...</h5>
    <div style="display: flex; align-items: flex-start;">
      <div class="movie-img-left" style="background-color: #333; width: 200px; height: 300px;"></div>
      <div>
        <p class="movie-plot">Chargement du synopsis...</p>
        <p class="movie-genre"><small class="text-muted">Chargement du genre...</small></p>
        <p class="movie-actors"><small class="text-muted">Chargement des acteurs...</small></p>
        <div class="movie-ratings">
          <h6>Ratings:</h6>
          <p>Chargement des évaluations...</p>
        </div>
      </div>
    </div>
  `;
  return card;
}

// Fonction pour mettre a jour une card avec les film
function updateCardWithMovieData(card, movie) {
  const ratingsHTML = movie.Ratings.map(rating => `
    <p><strong>${rating.Source}:</strong> ${rating.Value}</p>
  `).join('');

  card.innerHTML = `
    <h5 class="movie-title">${movie.Title}</h5>
    <div style="display: flex; align-items: flex-start;">
      <img src="${movie.Poster}" class="movie-img-left" alt="${movie.Title}">
      <div>
        <p class="movie-plot">${movie.Plot}</p>
        <p class="movie-genre"><small class="text-muted">${movie.Genre}</small></p>
        <p class="movie-actors"><small class="text-muted">${movie.Actors}</small></p>
        <div class="movie-ratings">
          <h6>Ratings:</h6>
          ${ratingsHTML}
        </div>
      </div>
    </div>
  `;
}

// Fonction pour recupererer les donnees d'un film depuis l'API
async function fetchMovieData(title) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`);
    const data = await response.json();
    if (data.Response === 'True') {
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

// Fonction pour afficher une card film dans un parent
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

// Fonction pour créer une carte de poster
function createPosterCard(movie) {
  const card = document.createElement('div');
  card.classList.add('movie-poster');
  card.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster-img">
  `;
  return card;
}

// Fonction pour afficher les cartes de posters
async function displayPosterCards(parent, titles) {
  for (const title of titles) {
    const movieData = await fetchMovieData(title);
    if (movieData && movieData.Poster) { 
      const card = createPosterCard(movieData);
      parent.appendChild(card);
    }
  }
}

// Fonction pour charger les films et les posters
async function loadInitialMovies() {
  const container = document.getElementById('movie-card-container');
  const posterContainer = document.getElementById('poster-container');
  posterContainer.style.display = 'grid';
  posterContainer.style.gridTemplateColumns = 'repeat(6, 1fr)'; // 6 colonnes
  posterContainer.style.gap = '1rem'; 
  posterContainer.style.marginTop = '2rem';

  const movieTitles = ['Batman', 'The Dark Knight', 'Inception', 'Interstellar']; 
  const posterTitles = ['Dunkirk', 'Tenet', 'Memento', 'The Prestige', 'Insomnia', 'Following'];

  for (const title of movieTitles) {
    await displayMovieCard(container, title); 
  }

  await displayPosterCards(posterContainer, posterTitles);
}

// Fonction pour rechercher un film
async function searchMovie() {
  const searchInput = document.getElementById('search-input').value;
  if (searchInput) {
    const container = document.getElementById('movie-card-container');
    container.innerHTML = ''; 

    await displayMovieCard(container, searchInput); 
  }
}

// Écouteurs d'événements
document.addEventListener('DOMContentLoaded', loadInitialMovies);
document.getElementById('search-button').addEventListener('click', searchMovie);