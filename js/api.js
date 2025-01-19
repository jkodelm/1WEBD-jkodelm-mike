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

//ca c est la  fonction pour afficher les cartes dans un parent 
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

async function loadInitialMovies() {
  const container = document.getElementById('movie-card-container');
  const movieTitles = ['Batman', 'The Dark Knight', 'Inception', 'Interstellar']; 

  for (const title of movieTitles) {
    await displayMovieCard(container, title); 
  }
}

// ca c est la fonction pour chercher les flims(pour etre utliser dans search.html)
async function searchMovie() {
  const searchInput = document.getElementById('search-input').value;
  if (searchInput) {
    const container = document.getElementById('movie-card-container');
    container.innerHTML = ''; 

    await displayMovieCard(container, searchInput); 
  }
}

document.addEventListener('DOMContentLoaded', loadInitialMovies);

document.getElementById('search-button').addEventListener('click', searchMovie);