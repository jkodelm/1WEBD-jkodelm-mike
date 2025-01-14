/* const apiKey = 'c6e5cf6d';
const movieTitle = 'batman'
const apiUrl = `https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`;
const movie = fetch(apiUrl);


fetch(apiUrl)
.then(response => console.log(response.status) || response) // output the status and return response
  .then(response => response.text()) // send response body to next then chain
  .then(body => console.log(body)) // you can use response body here*/

const movie = {"Title":"Batman","Year":"1989","Rated":"PG-13","Released":"23 Jun 1989","Runtime":"126 min","Genre":"Action, Adventure","Director":"Tim Burton","Writer":"Bob Kane, Sam Hamm, Warren Skaaren","Actors":"Michael Keaton, Jack Nicholson, Kim Basinger","Plot":"The Dark Knight of Gotham City begins his war on crime with his first major enemy being Jack Napier, a criminal who becomes the clownishly homicidal Joker.","Language":"English, French, Spanish","Country":"United States, United Kingdom","Awards":"Won 1 Oscar. 11 wins & 28 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BYzZmZWViM2EtNzhlMi00NzBlLWE0MWEtZDFjMjk3YjIyNTBhXkEyXkFqcGc@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.5/10"},{"Source":"Rotten Tomatoes","Value":"77%"},{"Source":"Metacritic","Value":"69/100"}],"Metascore":"69","imdbRating":"7.5","imdbVotes":"414,807","imdbID":"tt0096895","Type":"movie","DVD":"N/A","BoxOffice":"$251,409,241","Production":"N/A","Website":"N/A","Response":"True"}
const movieTitle = movie.Title;
const movieposter = movie.Poster;
const movieplot = movie.Plot;
const moviegenre = movie.Genre;
const movieactors = movie.Actors;
const movieratings = movie.Ratings;

function createcard(){
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
  <div class="card-body">
    <h5 class="card-title">${movieTitle}</h5>
    <img src="${movieposter}" class="card-img-top" alt="...">
    <p class="card-text">${movieplot}</p>
    <p class="card-text"><small class="text-muted">${moviegenre}</small></p>
    <p class="card-text"><small class="text-muted">${movieactors}</small></p>
  </div>
  `
  return card;    
}

