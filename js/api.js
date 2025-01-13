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
console.log(movieTitle);
const movieposter = movie.Poster;
console.log(movieposter);
const movieplot = movie.Plot;
console.log(movieplot);
const moviegenre = movie.Genre;
console.log(moviegenre);
const movieactors = movie.Actors;
console.log(movieactors);
const movieratings = movie.Ratings;
console.log(movieratings);

//poster, nom , lien en savoir plus, bonus : petit resume du film , 