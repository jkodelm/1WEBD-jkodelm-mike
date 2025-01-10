class Carousel {
    constructor(masterName, cardClass, data, slidesPerPage, leftButtonName, rightButtonName, arraySlideClasses) {
        // Define necessary properties
        this.parent = document.querySelector(`#${masterName}`);
        this.slides = data; // Assuming data is an array of slides
        this.slidesPerPage = slidesPerPage;
        this.leftBtn = document.querySelector(`#${leftButtonName}`);
        this.rightBtn = document.querySelector(`#${rightButtonName}`);
        this.slideClasses = arraySlideClasses;

        // Initialize other properties
        this.width = this.slides.length; // Assuming slides is an array
        this.paused = false;
        this.index = 0; // Shown left
        this.slideStates = this.slideClasses.length;

        // Bind event listeners
        this.leftBtn.addEventListener('click', (e) => { this.slideLeft(); });
        this.rightBtn.addEventListener('click', (e) => { this.slideRight(); });
    }

    slideRight() {
        console.log('going right');
        const allSlides = this.parent.children; // Use 'this.parent'
        
        // Assuming you want to insert a new slide element
        const newSlide = document.createElement('div');
        newSlide.className = "hero-card hero-card-farright";
        this.parent.appendChild(newSlide); // Append new slide

        for (let i = 0; i < allSlides.length; i++) {
            allSlides[i].classList.add(this.slideClasses[(i + 1) % 4]);
            allSlides[i].classList.add(this.slideClasses[i]);
        }
    }

    slideLeft() {
        console.log('going left');
    }
}

// On load, initialize carousel
function main() {
    const body = document.querySelector('body');
    const btnTheme = document.querySelector('#theme');
    const notesButton = document.querySelector("#submitnote");
    
    let heroCarouselInstance = new Carousel(
        'hero-content',
        'hero-card',
        JSON.parse('{}'), // Replace with actual data
        3,
        'arrow-left',
        'arrow-right',
        ['hero-card-farleft', 'hero-card-left', 'hero-card-main', 'hero-card-right', 'hero-card-farright']
    );
}

// Correctly assign the onload function
window.onload = main;
