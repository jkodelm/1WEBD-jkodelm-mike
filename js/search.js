window.onload = function() {
    const searchInput = document.getElementById('nav-search-input');
    const searchResults = document.getElementById('nav-search-results');
    const loadMoreButton = document.getElementById('load-more-results');
    const navLowerFrame = document.getElementById('nav-lower-frame');
    let currentResults = [];
    let displayedResults = 5;
  
    // Exemple de données de films
    const films = [
      { title: "Cars", poster: "./films/cars.jpg", link: "./movie.html?id=1" },
      { title: "Transformers", poster: "./films/trans.jpg", link: "./movie.html?id=2" },
      { title: "Inception", poster: "./films/inception.jpg", link: "./movie.html?id=3" },
      { title: "Interstellar", poster: "./films/interstellar.jpg", link: "./movie.html?id=4" },
      { title: "The Dark Knight", poster: "./films/darkknight.jpg", link: "./movie.html?id=5" },
      { title: "Avatar", poster: "./films/avatar.jpg", link: "./movie.html?id=6" },
      { title: "Titanic", poster: "./films/titanic.jpg", link: "./movie.html?id=7" },
      { title: "Jurassic Park", poster: "./films/jurassicpark.jpg", link: "./movie.html?id=8" },
    ];
  
    // Fonction pour afficher les résultats de recherche
    function displayResults(results) {
      searchResults.innerHTML = '';
      results.slice(0, displayedResults).forEach(film => {
        const resultItem = document.createElement('a');
        resultItem.href = film.link;
        resultItem.className = 'nav-search-result side-padding';
        resultItem.innerHTML = `
          <img src="${film.poster}" alt="${film.title}">
          <h3 class="clamp-2">${film.title}</h3>
        `;
        searchResults.appendChild(resultItem);
      });
  
      if (results.length > displayedResults) {
        loadMoreButton.classList.remove('hidden');
      } else {
        loadMoreButton.classList.add('hidden');
      }
    }
  
    // Fonction pour filtrer les films en fonction de la recherche
    function filterFilms(query) {
      return films.filter(film => film.title.toLowerCase().includes(query.toLowerCase()));
    }
  
    // Événement de saisie dans la barre de recherche
    searchInput.addEventListener('input', (event) => {
      const query = event.target.value;
      if (query.length > 0) {
        currentResults = filterFilms(query);
        displayResults(currentResults);
        navLowerFrame.classList.remove('hidden');
      } else {
        navLowerFrame.classList.add('hidden');
      }
    });
  
    // Événement pour charger plus de résultats
    loadMoreButton.addEventListener('click', () => {
      displayedResults += 5;
      displayResults(currentResults);
    });
  };







/* LORSQU'ON SEARCH, BOLD CORRESPONDANCES
Si 5 premiers sont égaux même avec nv lettre, ne pas faire de request*/



window.onload = mainSearch;
