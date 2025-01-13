const apiKey = 'c6e5cf6d';
const movieTitle = 'batman';
const apiUrl = `https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.Response === 'True') {
            const movieName = data.Title;
            const posterUrl = data.Poster;
            const moviePlot = data.Plot;
            const movieGenre = data.Genre;
            const movieActor = data.Actors;
            const movieRatings = data.Ratings; 
            const moviedvd = data.DVD;

            let ratingsHTML = '';
            movieRatings.forEach(rating => {
                ratingsHTML += `<p><strong>${rating.Source}</strong>: ${rating.Value}</p>`;
            });

            const movieInfoDiv = document.getElementById('movie-info');
            movieInfoDiv.innerHTML = `
                <h2>${movieName}</h2>
                <img src="${posterUrl}" alt="${movieName} Poster">
                <p><strong>Plot:</strong> ${moviePlot}</p>
                <p><strong>Genre:</strong> ${movieGenre}</p>
                <p><strong>Actors:</strong> ${movieActor}</p>
                <div><strong>Ratings:</strong> ${ratingsHTML}</div>
                <p><strong>DVD:</strong> ${moviedvd}</p> 
            `;
        } else {
            document.getElementById('movie-info').innerHTML = `<p>Movie not found!</p>`;
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });