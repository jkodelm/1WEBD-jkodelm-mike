const apiKey = 'c6e5cf6d';

// Fonction pour créer une carte de chargement
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

// Fonction pour mettre à jour une carte avec les données du film
function updateCardWithMovieData(card, movie) {
  const ratingsHTML = movie.Ratings.map(rating => `
    <p><strong>${rating.Source}:</strong> ${rating.Value}</p>
  `).join('');

  // Utiliser le grand résumé (Fullplot) si disponible, sinon utiliser le synopsis (Plot)
  const plotText = movie.Plot || 'Aucun résumé disponible.';

  // Ajouter la date de sortie en DVD si disponible
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

// Fonction pour récupérer les données d'un film depuis l'API avec le grand résumé
async function fetchMovieData(title) {
  // Vérifier si les données sont déjà dans sessionStorage
  const cachedMovie = sessionStorage.getItem(title);
  if (cachedMovie) {
    return JSON.parse(cachedMovie); // Renvoyer les données stockées
  }

  try {
    const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&plot=full&apikey=${apiKey}`);
    const data = await response.json();
    if (data.Response === 'True') {
      // Stocker les données dans sessionStorage pour une utilisation future
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

// Fonction pour afficher une carte de film dans un conteneur parent
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

  const movieTitles = ['Batman', 'The Dark Knight', 'Inception', 'Interstellar', 'Dunkirk', 'Tenet', 'Memento', 'The Prestige', 'Insomnia', 'Following'];

  for (const title of movieTitles) {
    await displayMovieCard(container, title);
  }

  await displayPosterCards(posterContainer, movieTitles);
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

// Fonction pour récupérer le paramètre "title" de l'URL
function getTitleFromURL() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('title');
}

// Fonction pour afficher la grande carte du film sur movie.html
async function displayMovie() {
  const title = getTitleFromURL();
  if (title) {
    const container = document.getElementById('movie-card-container');
    container.innerHTML = ''; // Clear previous content

    const movieData = await fetchMovieData(title);
    if (movieData) {
      const card = document.createElement('div');
      card.classList.add('movie'); // Utiliser la classe de la grande carte
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

// Fonction pour récupérer les films de 2024
async function fetchMoviesFrom2024() {
  try {
    const response = await fetch(`https://www.omdbapi.com/?y=2024&apikey=${apiKey}`);
    const data = await response.json();
    if (data.Response === 'True') {
      // Retourner uniquement les titres des films
      return data.Search.map(movie => movie.Title);
    } else {
      console.error('Aucun film trouvé pour 2024');
      return [];
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des films de 2024 :', error);
    return [];
  }
}

// Fonction pour charger plus de films de 2024
async function loadMoreMoviesFrom2024() {
  const container = document.getElementById('movie-card-container');
  const moviesFrom2024 = await fetchMoviesFrom2024();

  if (moviesFrom2024.length > 0) {
    for (const title of moviesFrom2024) {
      await displayMovieCard(container, title);
    }
  } else {
    alert('Aucun film trouvé pour 2024.');
  }
}

// Écouteurs d'événements
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('movie.html')) {
    displayMovie(); // Afficher la grande carte sur movie.html
  } else {
    loadInitialMovies(); // Charger les films initiaux sur la page d'accueil
  }
});

document.getElementById('search-button').addEventListener('click', searchMovie);