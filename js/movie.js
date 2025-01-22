function showMovie(movie) {

    const userLogged = false
    const main = document.querySelector('main')

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
    movie.Ratings.forEach((dic) => {
        let grade = parseInt(dic["Value"].split("/")[0], 10)
        while (grade > 10) {
            grade = grade / 10
        }
        ratings.push(grade)
    })
    

    main.innerHTML = `<div class="relative">
        <section class="movie-main">
            <img src="${movie.Poster}" alt="${movie.Title}'s film poster">
            <div class="movie-info">
            <h1>${movie.Title}</h1>
            <div class="movie-details">
                <p>Durée : <b>${runTime}</b>・Sortie : <b>${releaseDate}</b>・Catégorie : <a target="_blank" href="https://www.filmratings.com/">${movie.Rated}</a></p>
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
        <div class="movie-poster-blur" style="background: url(${movie.Poster}) center / cover no-repeat"></div>
        </div>

        <section id="movie-second">
            <div class="movie-tabs">
            <div class="movie-tab"><div class="movie-tab-bot"></div>Cast</div>
            <div class="movie-tab"><div class="movie-tab-bot"></div>Notes</div>
            <div class="movie-tab"><div class="movie-tab-bot"></div>Plus d'info</div>
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
                ${stringToElements(movie.Actors, fetchActor)}
            </div>
            </div>
            <div class="movie-window" id="movie-ratings">
            <div class="space-between">
                <div class="movie-rate-card">
                <div class="movie-rate-image">
                    <a target="_blank" href="${'imdbID' in movie ? `https://www.imdb.com/title/${movie.imdbID}` : 'https://www.imdb.com'}"><img src="./data/imdb.png"></a>
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
                <li><p>Doublage${detectComma(movie.Language)} : ${movie.Language}</p>
                <li><p>Récompense${detectPlural(movie.Awards)} : ${movie.Awards ? movie.Awards : 'Aucune'}</p>
                <li><p>DVD : ${movie.DVD && movie.DVD !== 'N/A' ? movie.DVD : 'Aucun'}</p>
                </li>
            </ul>
            </div>
        </section>`
}

function stringToElements(tagList, func, limit=Infinity) { /* Mettre dans autre fichier*/
    const valueArray = strArrayfy(tagList)
    res = '';
    valueArray.forEach((value, ind) => {
        res += func(value)
        if (ind === limit) { return res; }
    })
    return res;
}

function customTag(name) { return `<div class="tag">${name}</div>` }

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
        return `<a href="${data.link}" class="movie-profile"><img src="${data.image}"><p>${name}</p></a>`
    } else {
        return `<a href="#" class="movie-profile"><img src="./data/personnotfound.png"><p>${name}</p></a>`
    }
}

function detectComma (string) { return string.includes(',') ? 's' : ''; }
function detectPlural (string) { return (string.includes('s,') || string.includes('s ')) ? 's' : ''; }

function switchTab(index, movTabArray, movSecondChild) {
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

function manageTabs() {
    const movSecondChild = [...document.querySelector('#movie-second').children];
    const movTabArray = [...movSecondChild[0].children];

    movTabArray.forEach((tab, ind) => {
        tab.addEventListener('click', () => { switchTab(ind, movTabArray, movSecondChild) })
    });
    switchTab(0, movTabArray, movSecondChild)
};

a = () => {
showMovie(
    {"Title":"Cars","Year":"2006","Rated":"G","Released":"09 Jun 2006","Runtime":"116 min","Genre":"Animation, Adventure, Comedy","Director":"John Lasseter, Joe Ranft","Writer":"John Lasseter, Joe Ranft, Jorgen Klubien","Actors":"Owen Wilson, Bonnie Hunt, Paul Newman","Plot":"On the way to the biggest race of his life, a hotshot rookie race car gets stranded in a rundown town and learns that winning isn't everything in life.","Language":"English, Italian, Japanese, Yiddish","Country":"United States","Awards":"Nominated for 2 Oscars. 28 wins & 34 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.3/10"},{"Source":"Rotten Tomatoes","Value":"74%"},{"Source":"Metacritic","Value":"73/100"}],"Metascore":"73","imdbRating":"7.3","imdbVotes":"490,857","imdbID":"tt0317219","Type":"movie","DVD":"N/A","BoxOffice":"$244,082,982","Production":"N/A","Website":"N/A","Response":"True"}
)
}

// {"Title":"Lightyear","Year":"2022","Rated":"PG","Released":"03 Aug 2022","Runtime":"105 min","Genre":"Animation, Action, Adventure","Director":"Angus MacLane","Writer":"Angus MacLane, Matthew Aldrich, Jason Headley","Actors":"Chris Evans, Keke Palmer, Peter Sohn","Plot":"While spending years attempting to return home, marooned Space Ranger Buzz Lightyear encounters an army of ruthless robots commanded by Zurg who are attempting to steal the fuel source of his ship.","Language":"English","Country":"United States, Canada","Awards":"2 wins & 23 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BZGI3ZjUyM2ItNmFjYy00NGE3LTg2OTYtMTI2MDk0MjIxNDA1XkEyXkFqcGc@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.1/10"},{"Source":"Rotten Tomatoes","Value":"74%"},{"Source":"Metacritic","Value":"60/100"}],"Metascore":"60","imdbRating":"6.1","imdbVotes":"128,632","imdbID":"tt10298810","Type":"movie","DVD":"N/A","BoxOffice":"$118,307,188","Production":"N/A","Website":"N/A","Response":"True"}
// {"Title":"Batman","Year":"1989","Rated":"PG-13","Released":"23 Jun 1989","Runtime":"126 min","Genre":"Action, Adventure","Director":"Tim Burton","Writer":"Bob Kane, Sam Hamm, Warren Skaaren","Actors":"Michael Keaton, Jack Nicholson, Kim Basinger","Plot":"The Dark Knight of Gotham City begins his war on crime with his first major enemy being Jack Napier, a criminal who becomes the clownishly homicidal Joker.","Language":"English, French, Spanish","Country":"United States, United Kingdom","Awards":"Won 1 Oscar. 11 wins & 28 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BYzZmZWViM2EtNzhlMi00NzBlLWE0MWEtZDFjMjk3YjIyNTBhXkEyXkFqcGc@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.5/10"},{"Source":"Rotten Tomatoes","Value":"77%"},{"Source":"Metacritic","Value":"69/100"}],"Metascore":"69","imdbRating":"7.5","imdbVotes":"414,807","imdbID":"tt0096895","Type":"movie","DVD":"N/A","BoxOffice":"$251,409,241","Production":"N/A","Website":"N/A","Response":"True"}
// {"Title":"Cars","Year":"2006","Rated":"G","Released":"09 Jun 2006","Runtime":"116 min","Genre":"Animation, Adventure, Comedy","Director":"John Lasseter, Joe Ranft","Writer":"John Lasseter, Joe Ranft, Jorgen Klubien","Actors":"Owen Wilson, Bonnie Hunt, Paul Newman","Plot":"On the way to the biggest race of his life, a hotshot rookie race car gets stranded in a rundown town and learns that winning isn't everything in life.","Language":"English, Italian, Japanese, Yiddish","Country":"United States","Awards":"Nominated for 2 Oscars. 28 wins & 34 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.3/10"},{"Source":"Rotten Tomatoes","Value":"74%"},{"Source":"Metacritic","Value":"73/100"}],"Metascore":"73","imdbRating":"7.3","imdbVotes":"490,857","imdbID":"tt0317219","Type":"movie","DVD":"N/A","BoxOffice":"$244,082,982","Production":"N/A","Website":"N/A","Response":"True"}