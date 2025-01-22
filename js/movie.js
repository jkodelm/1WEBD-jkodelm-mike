function showMovie(movie) {

    const userLogged = false

    let runTime = '';
    let lengthInt = parseInt(movie.Runtime.split(" ")[0], 10);
    if (lengthInt < 60) {
        runTime = `${lengthInt} min`
    } else {
        let lengthHour = 0;
        while (lengthInt > 59) {
            lengthInt -= 60;
            lengthHour++;
        }
    runTime = `${lengthHour}h${lengthInt < 10 ? '0' : ''}${lengthInt}`
    }

    let releaseDate = '';
    const gotDate = movie.Released.split(" ");
    gotDate[1] = ({ // Mapping, will you marry me?
        Jan: 'Janvier', Feb: 'Février', Mar: 'Mars', Apr: 'Avril', May: 'Mai', Jun: 'Juin',
        Jul: 'Juillet', Aug: 'Août', Sep: 'Septembre', Oct: 'Octobre', Nov: 'Novembre', Dec: 'Décembre'
    })[gotDate[1]]; 
    releaseDate = gotDate.join(" ");

    let ratings = []
    let ratingsCurrVal = ""
    data.Ratings.forEach((dic) => {
        ratingsCurrVal = dic["Value"]
        ratingsCurrVal = ratingsCurrVal.split("/")
        
        if (ratingsCurrVal[1] != "10") {
            let toDivide = parseInt(ratingsCurrVal[1], 10) % 10
            ratings.push(parseInt(ratingsCurrVal[0], 10) / toDivide)
        } else {
            ratings.push(ratingsCurrVal[0])
        }
    })
    

    return `<div class="relative">
        <section class="movie-main">
            <img src="${movie.Poster}" alt="${movie.Title}'s film poster">
            <div class="movie-info">
            <h1>${movie.Title}</h1>
            <div class="movie-details">
                <p>Durée : <b>${runTime}</b>・Sortie : <b>${releaseDate}</b>・<a href="https://www.filmratings.com/">${movie.Rated}</a></p>
            </div>
            <div class="gapHMS overflowhidden">
                ${stringToElements(movie.Genre, customTag, limit=3)}
            </div>
            
            <div class="movie-plot">
                ${movie.Plot}
            </div>
            <div class="gapHMS space-between">
                ${heartMovie(userLogged)}
                <button class='button-prim button-pad'>Réservation indisponible</button>
            </div>
            </div>
        </section>
        <div class="movie-poster-blur" style="url(${movie.Poster}) center / cover no-repeat"></div>
        </div>

        <section id="movie-second">
            <div class="movie-tabs">
            <div class="movie-tab"><div class="movie-tab-bot"></div>Cast</div> <!-- Director, actor, realisators -->
            <div class="movie-tab"><div class="movie-tab-bot"></div>Notes</div>
            <div class="movie-tab"><div class="movie-tab-bot"></div>Plus d'info</div> <!-- Languages, awards -->
            </div>
            <div class="movie-window" id="movie-casting">
            <h3>Directeur</h3>
            <div class="movie-profiles">
                ${stringToElements(movie.Director, fetchActor)}
            </div>
            <h3>Rédacteurs</h3>
            <div class="movie-profiles">
                ${stringToElements(movie.Writer, fetchActor)}
            </div>
            <h3>Acteurs</h3>
            <div class="movie-profiles">
                <${stringToElements(movie.Actors, fetchActor)}
            </div>
            </div>
            <div class="movie-window" id="movie-ratings">
            <div class="space-between">
                <div class="movie-rate-card">
                <div class="movie-rate-image">
                    <a target="_blank" href="${imdbID in movie ? `https://www.imdb.com/title/${imdbID}` : 'https://www.imdb.com'}"><img src="./data/imdb.png"></a>
                </div>
                <div class="movie-rate-score"><h2>${ratings[0]}</h2><h4 class="movie-rate-onscore">/10</h4>
                </div>
                </div>
                <div class="movie-rate-card">
                <div class="movie-rate-image">
                    <a target="_blank" href="https://www.rottentomatoes.com"><img src="./data/rotten_tomatoes.png"></a>
                </div>
                <div class="movie-rate-score"><h2>${ratings[1]}</h2><h4 class="movie-rate-onscore">/10</h4></div>
                </div>
                <div class="movie-rate-card">
                <div class="movie-rate-image">
                    <a target="_blank" href="http://metacritics.com/"><img src="./data/metacritic.png"></a>
                </div>
                <div class="movie-rate-score"><h2>${ratings[2]}</h2><h4 class="movie-rate-onscore">/10</h4></div>
                </div>
            </div>
            </div>
            <div class="movie-window" id="movie-more-info">
            <ul>
                <li><p>Langauges doublé${detectComma(movie.Language)} : ${movie.Language}</p>
                <li><p>Récompense${detectPlural(movie.Awards)} : ${movie.Awards ? movie.Awards : 'Aucune'}</p>
                <li><p>DVD : ${movie.DVD ? movie.Awards : 'Aucun'}</p>
                </li>
            </ul>
            </div>
        </section>`
}

function stringToElements(tagList, func, limit=Infinity) { /* Mettre dans autre fichier*/
    const valueArray = strArrayfy(tagList)
    res = '';
    valueArray.forEach((value, ind) => {
        res += customTag(value)
        if (ind === limit) { return res; }
    })
    return res;
}

function customTag(name) { return `<div class="tag">${tag}</div>` }

function heartMovie(userLogged) {
    if (userLogged) {
        return `<a onClick="addLike()"><button class='button-tran'><div class='icon i-heart'></div></button></a>`
    } else {
        return `<a href="./account/login.html"><button class='button-tran'><div class='icon i-heart'></div></button></a>`
    }
}

function strArrayfy(string) { return string.split(", ").map(value => value.trim()) }

function fetchActor(name) {
    const data = {image: "", link:""}
    // Fetch image of actor using API
    if (data.image) {
        `<a href="${data.link}" class="movie-profile"><img src="${data.image}"><p>${name}</p></a>`
    } else {
        `<a href="#" class="movie-profile"><img src="./data/personnotfound.png"><p>${name}</p></a>`
    }
}

function detectComma (string) { return ',' in string ? 's' : ''; }
function detectPlural (string) { return ('s,' in string || 's ' in string) ? 's' : ''; }

function switchTab(index) {
    index;
    for (let i = 0; i < 3; i++) {
      if (i === index) {
        movTabArray[i].classList.add('movie-tab-active')
        movSecondChild[i + 1].classList.add('movie-tab-shown')
      } else {
        movTabArray[i].classList.remove('movie-tab-active')
        movSecondChild[i + 1].classList.remove('movie-tab-shown')
      }
    }
}

const movSecondChild = [...document.querySelector('#movie-second').children];
const movTabArray = [...movSecondChild[0].children];

movTabArray.forEach((tab, ind) => {
    tab.addEventListener('click', () => { switchTab(ind) })
});
switchTab(0)





showMovie({"Title":"Batman",
    "Year":"1989",
    "Rated":"PG-13",
    "Released":"23 Jun 1989",
    "Runtime":"126 min",
    "Genre":"Action, Adventure",
    "Director":"Tim Burton",
    "Writer":"Bob Kane, Sam Hamm, Warren Skaaren",
    "Actors":"Michael Keaton, Jack Nicholson, Kim Basinger",
    "Plot":"The Dark Knight of Gotham City begins his war on crime with his first major enemy being Jack Napier, a criminal who becomes the clownishly homicidal Joker.",
    "Language":"English, French, Spanish",
    "Country":"United States, United Kingdom",
    "Awards":"Won 1 Oscar. 11 wins & 28 nominations total",
    "Poster":"https://m.media-amazon.com/images/M/MV5BYzZmZWViM2EtNzhlMi00NzBlLWE0MWEtZDFjMjk3YjIyNTBhXkEyXkFqcGc@._V1_SX300.jpg",
    "Ratings":[{"Source":"Internet Movie Database","Value":"7.5/10"},{"Source":"Rotten Tomatoes","Value":"77%"},{"Source":"Metacritic","Value":"69/100"}],
    "Metascore":"69",
    "imdbRating":"7.5",
    "imdbVotes":"414,807",
    "imdbID":"tt0096895",
    "Type":"movie",
    "DVD":"N/A",
    "BoxOffice":"$251,409,241",
    "Production":"N/A",
    "Website":"N/A",
    "Response":"True"})