const movie = {
  "Title": "Batman",
  "Year": "1989",
  "Rated": "PG-13",
  "Released": "23 Jun 1989",
  "Runtime": "126 min",
  "Genre": "Action, Adventure",
  "Director": "Tim Burton",
  "Writer": "Bob Kane, Sam Hamm, Warren Skaaren",
  "Actors": "Michael Keaton, Jack Nicholson, Kim Basinger",
  "Plot": "The Dark Knight of Gotham City begins his war on crime with his first major enemy being Jack Napier, a criminal who becomes the clownishly homicidal Joker.",
  "Language": "English, French, Spanish",
  "Country": "United States, United Kingdom",
  "Awards": "Won 1 Oscar. 11 wins & 28 nominations total",
  "Poster": "https://m.media-amazon.com/images/M/MV5BYzZmZWViM2EtNzhlMi00NzBlLWE0MWEtZDFjMjk3YjIyNTBhXkEyXkFqcGc@._V1_SX300.jpg",
  "Ratings": [
    { "Source": "Internet Movie Database", "Value": "7.5/10" },
    { "Source": "Rotten Tomatoes", "Value": "77%" },
    { "Source": "Metacritic", "Value": "69/100" }
  ],
  "Metascore": "69",
  "imdbRating": "7.5",
  "imdbVotes": "414,807",
  "imdbID": "tt0096895",
  "Type": "movie",
  "DVD": "N/A",
  "BoxOffice": "$251,409,241",
  "Production": "N/A",
  "Website": "N/A",
  "Response": "True"
};

const movieTitle = movie.Title;
const moviePoster = movie.Poster;
const moviePlot = movie.Plot;
const movieGenre = movie.Genre;
const movieActors = movie.Actors;
const movieRatings = movie.Ratings;

function createCard() {
  const card = document.createElement('div');
  card.classList.add('card');
  const ratingsHTML = movieRatings.map(rating => `
    <p><strong>${rating.Source}:</strong> ${rating.Value}</p>
  `).join('');

  card.innerHTML = `
    <h5 class="card-title">${movieTitle}</h5>
    <div style="display: flex; align-items: flex-start;">
      <img src="${moviePoster}" class="card-img-left" alt="${movieTitle}">
      <div>
        <p class="card-plot">${moviePlot}</p>
        <p class="card-genre"><small class="text-muted">${movieGenre}</small></p>
        <p class="card-actors"><small class="text-muted">${movieActors}</small></p>
        <div class="card-ratings">
          <h6>Ratings:</h6>
          ${ratingsHTML}
        </div>
      </div>
    </div>
  `;

  return card;
}