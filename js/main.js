/* Later :
- Setup carousel from class*/

class Carousel {
    constructor(masterName, cardName, visibleSlides, attributes, leftBtn, rightBtn, pauseBtnName=null, masterIndicatorsName=null) {
        this.parent = document.querySelector(`#${masterName}`)
        this.onScreenSlides = visibleSlides
        this.arrayAttributes = attributes
        this.index = 0
        
        this.slides = this.parent.children
        console.log(this.slides)
        this.nbSlides = this.slides.length

        this.stopped = false
        this.autoSlideInterval = null
        this.sliding = false
        this.slidingTime = 400

        document.querySelector(`#${leftBtn}`).addEventListener('click', () => this.slideLeft())
        document.querySelector(`#${rightBtn}`).addEventListener('click', () => this.slideRight())
        if (pauseBtnName) { this.pauseButton = document.querySelector(`#${pauseBtnName}`); this.pauseButton.addEventListener('click', () => { this.togglePause() } )};
        if (masterIndicatorsName) { this.allIndicators = new Array(document.querySelector(`#${masterIndicatorsName}`).children) }
    
        this.startAutoSlide();
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            if (!this.sliding && !this.stopped) {
                this.slideRight()
                setTimeout(() => { this.sliding = false; }, this.slidingTime)
            }
        }, 2000)
    }

    stopAutoSlide() { clearInterval(this.autoSlideInterval); }
    
    slideLeft() {
        if (this.sliding) return;
        this.sliding = true;
        this.stopAutoSlide();

        let currentSlide;
        for(let i = -2; i < this.nbSlides + 1; i++) {
            currentSlide = this.slides[this.correctIndex(this.index + i)];
            currentSlide.classList.add(this.arrayAttributes[i + 3]);
            currentSlide.classList.remove(this.arrayAttributes[i + 2]);
            currentSlide.style.zIndex = '5';
            this.slides[this.correctIndex(this.index + i + 1)].style.zIndex = '1';
        }
        this.index = this.correctIndex(this.index - 1);

        setTimeout(() => {
            this.sliding = false;
            this.startAutoSlide();
        }, this.slidingTime);

        this.updateIndicator()
    }

    slideRight() {
        if (this.sliding) { return; }
        this.sliding = true;
        this.stopAutoSlide();

        let currentSlide;
        for(let i = 2; i > -1; i--) {
            currentSlide = this.slides[this.correctIndex(this.index + i)];
            currentSlide.classList.add(this.arrayAttributes[i + 1]);
            currentSlide.classList.remove(this.arrayAttributes[i + 2]);
        }
        this.index = this.correctIndex(this.index + 1);

        setTimeout(() => {
            this.sliding = false;
            this.startAutoSlide();
        }, this.slidingTime);

        this.updateIndicator()
    }

    correctIndex(index) {
        return (index + this.nbSlides) % this.nbSlides;
    }

    togglePause() {
        console.log('hiuui', this.stopped)
        if (this.stopped) {
            this.pauseButton.classList.remove('i-play')
            this.pauseButton.classList.add('i-pause')
        } else {
            this.pauseButton.classList.remove('i-pause')
            this.pauseButton.classList.add('i-play')
        }
        this.stopped = !this.stopped

    }

    updateIndicator() {
        console.log('dze')
        if (!this.allIndicators) { return }

        this.allIndicators.forEach((indic) => indic.classList.remove('indicator-active'))
        this.allIndicators[self.index].classList.add('indicator-active')
    }

    /** 
        let a = this.correctIndex(this.index - 2)
        this.slides[a].classList.add(this.arrayAttributes[1])
        this.slides[a].classList.remove('hidden')

        a = this.correctIndex(this.index - 1)
        this.slides[a].classList.add(this.arrayAttributes[2])
        this.slides[a].classList.remove(this.arrayAttributes[1])

        this.slides[this.index].classList.add(this.arrayAttributes[3])
        this.slides[this.index].classList.remove(this.arrayAttributes[2])
        
        a = this.correctIndex(this.index + 1);
        this.slides[a].classList.add(this.arrayAttributes[4]);
        this.slides[a].classList.remove(this.arrayAttributes[3]);

        window.setTimeout((ind = a) => {
            this.slides[ind].classList.remove(this.arrayAttributes[4]);
            this.slides[ind].classList.add('hidden');
        }, 1000);*/
}

function main() {
    const body = document.querySelector('body');
    const btnTheme = document.querySelector('#theme');
    const notesButton = document.querySelector("#submitnote");
    
    let heroCarouselInstance = new Carousel(
        'hero-content',
        'hero-card',
        3,        
        ['hero-card-farleft', 'hero-card-left', 'hero-card-main', 'hero-card-right', 'hero-card-farright'],
        'arrow-left',
        'arrow-right',
        'hero-pause',
        'hero-indicators'
    );
}
window.onload = main;