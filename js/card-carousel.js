class cardCarousel {
  constructor(carouselName, cardName, gap, controlButtonName) {
    this.carouselFrame = document.querySelector(`#${carouselName}`);
    this.carouselWidth = this.carouselFrame.offsetWidth;
    this.cardWidth = this.carouselFrame.querySelector(`.${cardName}`).offsetWidth;
    this.maxWidth = -(this.carouselFrame.scrollWidth - this.carouselFrame.offsetWidth);

    this.gap = gap;
    this.position = 0;
    this.isHolding = false;
    this.posCursor = 0;

    const leftBtn = document.querySelector(`#${controlButtonName[0]}`);
    const rightBtn = document.querySelector(`#${controlButtonName[1]}`);
    leftBtn.addEventListener('click', () => { this.moveCarousel('l'); })
    rightBtn.addEventListener('click', () => { this.moveCarousel('r'); })
    this.carouselFrame.addEventListener('mousedown', (event) => { this.holding(event); });

    window.addEventListener('resize', () => {
      const newWidth = this.carouselFrame.offsetWidth;
      this.position += newWidth - this.carouselWidth;
      this.carouselWidth = newWidth;

      this.setTransform(true)
    });
  }

  setTransform(noTransition=false) {
    if (this.position < this.maxWidth) { this.position = this.maxWidth; }
    if (this.position > 0) { this.position = 0; }

    if (noTransition) {
      this.carouselFrame.style.transition = 'none';
      this.carouselFrame.style.transform = `translateX(${this.position}px)`;
      setTimeout(() => { this.carouselFrame.style.transition = 'transform .2s ease-in-out'; }, 10);
    } else {
      this.carouselFrame.style.transform = `translateX(${this.position}px)`;
    }
  }

  holding(event) {
    this.isHolding = true;
    document.body.style.cursor = 'grabbing';
    this.posCursor = event.clientX;

    window.addEventListener('mouseup', this.stopHolding);
    window.addEventListener('mousemove', this.dragCarousel);
  }

  dragCarousel = (event) => {
    if (this.isHolding) {
      const newPos = event.clientX - this.posCursor;
      this.posCursor = event.clientX;
      this.position += newPos;
      this.setTransform(true);
    }
  };

  stopHolding = () => {
    this.isHolding = false;
    document.body.style.cursor = 'default';

    window.removeEventListener('mouseup', this.stopHolding);
    window.removeEventListener('mousemove', this.dragCarousel);
  };

  moveCarousel(direction) {
    const carouselWidth = this.carouselFrame.offsetWidth;
    const scrollAmount = (this.cardWidth + this.gap) * Math.floor(carouselWidth / (this.cardWidth + this.gap));
    this.maxWidth = -(this.carouselFrame.scrollWidth - this.carouselFrame.offsetWidth);

    if (direction === 'r') { this.position -= scrollAmount; }
    else { this.position += scrollAmount; }

    this.setTransform();
  }
}

// Fonction pour créer une carte de film avec poster, titre et résumé
async function createMovieCard(title) {
  console.log(title)
  const card = document.createElement('div');
  card.classList.add('temp-card');

  // Ajouter un état de chargement
  card.innerHTML = `
      <div class="loading">Chargement...</div>
  `;

  // Récupérer les données du film depuis l'API
  const movieData = {"Title":"Cars","Year":"2006","Rated":"G","Released":"09 Jun 2006","Runtime":"116 min","Genre":"Animation, Adventure, Comedy","Director":"John Lasseter, Joe Ranft","Writer":"John Lasseter, Joe Ranft, Jorgen Klubien","Actors":"Owen Wilson, Bonnie Hunt, Paul Newman","Plot":"On the way to the biggest race of his life, a hotshot rookie race car gets stranded in a rundown town and learns that winning isn't everything in life.","Language":"English, Italian, Japanese, Yiddish","Country":"United States","Awards":"Nominated for 2 Oscars. 28 wins & 34 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.3/10"},{"Source":"Rotten Tomatoes","Value":"74%"},{"Source":"Metacritic","Value":"73/100"}],"Metascore":"73","imdbRating":"7.3","imdbVotes":"490,857","imdbID":"tt0317219","Type":"movie","DVD":"N/A","BoxOffice":"$244,082,982","Production":"N/A","Website":"N/A","Response":"True"}
  // await fetchMovieData(title);

  if (movieData) {
      card.innerHTML = `
            <div class="card">
              <img src="${movieData.Poster}" alt="${movieData.Title}" class="movie-poster">
              <div class="card-info">
                  <h3>${movieData.Title}</h3>
                  <p>${movieData.Plot || 'Aucun résumé disponible.'}</p>
              </div>
              <button class='button-prim'>Découvrir</button>
          </div>
      `;
  } else {
      return null;
  }

  return card;
}

// Fonction pour initialiser le carrousel avec les cartes de film
async function setupCardCarousel(carouselName, cardName, movies, gap, controlButtonName, vignette) {
  const parent = document.getElementById(carouselName);
  parent.innerHTML = '';

  for (const title of movies) {
    const card = await createMovieCard(title);
    parent.appendChild(card);
  }

  new cardCarousel(carouselName, cardName, gap, controlButtonName, vignette)
}