function showMovie(movie) {

    const userLogged = false
    const main = document.querySelector('main')
    document.title = `${movie.Title} ~ Orléans Ciné`

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
            <div class="movie-tab"><div class="movie-tab-bot col200"><div class="movie-tab-bot-left col300"></div><div class="movie-tab-bot-right col300"></div></div>Cast</div>
            <div class="movie-tab"><div class="movie-tab-bot col200"><div class="movie-tab-bot-left col300"></div><div class="movie-tab-bot-right col300"></div></div></div>Notes</div>
            <div class="movie-tab"><div class="movie-tab-bot col200"><div class="movie-tab-bot-left col300"></div><div class="movie-tab-bot-right col300"></div></div></div>Plus d'info</div>
            </div>
            <div class="movie-window col200" id="movie-casting">
            <h3>Directeur${detectComma(movie.Language)}</h3>
            <div class="movie-profiles">
                ${stringToElements(movie.Director, fetchActor)}
            </div>
            <h3>Rédacteur${detectComma(movie.Language)}</h3>
            <div class="movie-profiles">
                ${stringToElements(movie.Writer, fetchActor)}
            </div>
            <h3>Acteur${detectComma(movie.Language)}</h3>
            <div class="movie-profiles">
                ${stringToElements(movie.Actors, fetchActor)}
            </div>
            </div>
            <div class="movie-window col200" id="movie-ratings">
            <div class="space-between flex-wrap">
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
            <div class="movie-window col200" id="movie-more-info">
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
        return `<a onClick="addLike()"><button class='button-tran coll100hov'><div class='icon i-heart'></div></button></a>`
    } else {
        return `<a href="./account/login.html"><button class='button-tran coll100hov'><div class='icon i-heart'></div></button></a>`
    }
}

function strArrayfy(string) { return string.split(", ").map(value => value.trim()) }

function fetchActor(name) {
    // Fetch image of actor using API
    const data = {image: "", link:""}
    if (data.image) {
        return `<a href="${data.link}" class="movie-profile col200 col100hov"><img src="${data.image}"><p>${name}</p></a>`
    } else {
        return `<a href="#" class="movie-profile col200 col100hov"><img src="./data/personnotfound.png"><p>${name}</p></a>`
    }
}

function detectComma (string) { return string.includes(',') ? 's' : ''; }
function detectPlural (string) { return (string.includes('s,') || string.includes('s ')) ? 's' : ''; }

function switchTab(index, movTabArray, movSecondChild) {
    for (let i = 0; i < 3; i++) {
      if (i === index) {
        movTabArray[i].classList.add('movie-tab-active')
        movTabArray[i].classList.add('col200')
        movSecondChild[i + 1].classList.add('movie-tab-shown')
      } else {
        movTabArray[i].classList.remove('movie-tab-active')
        movTabArray[i].classList.remove('col200')
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