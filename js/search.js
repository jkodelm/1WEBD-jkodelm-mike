let currentPage = 1;
let currentSearchTerm = '';

async function displaySearchResults(searchTerm, page = 1) {
  const resultsContainer = document.getElementById('search-results');
  const loadMoreButton = document.getElementById('load-more');

  if (page === 1) {
    resultsContainer.innerHTML = '';
  }

  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&page=${page}&apikey=${apiKey}`);
    const data = await response.json();

    if (data.Response === 'True') {
      data.Search.forEach(async (movie) => {
        const movieData = await fetchMovieData(movie.Title);
        if (movieData) {
          const movieCard = document.createElement('div');
          movieCard.classList.add('movie-card');
          movieCard.innerHTML = `
            <img src="${movieData.Poster}" alt="${movieData.Title}" class="movie-poster">
            <h3 class="movie-title">${movieData.Title}</h3>
            <a href="./movie.html?title=${encodeURIComponent(movieData.Title)}" class="more-info-link">En savoir plus</a>
          `;
          resultsContainer.appendChild(movieCard);
        }
      });

      if (data.totalResults > 10 * page) {
        loadMoreButton.classList.remove('hidden');
      } else {
        loadMoreButton.classList.add('hidden');
      }
    } else {
      resultsContainer.innerHTML = `<p>Aucun résultat trouvé pour "${searchTerm}".</p>`;
      loadMoreButton.classList.add('hidden');
    }
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    resultsContainer.innerHTML = `<p>Une erreur s'est produite lors de la recherche.</p>`;
    loadMoreButton.classList.add('hidden');
  }
}

function handleSearch() {
  const searchTerm = document.getElementById('search-input').value.trim();
  if (searchTerm) {
    currentSearchTerm = searchTerm;
    currentPage = 1;
    displaySearchResults(searchTerm);
  }
}

function handleLoadMore() {
  currentPage += 1;
  displaySearchResults(currentSearchTerm, currentPage);
}

document.getElementById('search-button').addEventListener('click', handleSearch);
document.getElementById('search-input').addEventListener('input', handleSearch);
document.getElementById('load-more').addEventListener('click', handleLoadMore);