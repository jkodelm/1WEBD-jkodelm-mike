/* Later :
- Setup carousel elements from class
*/

class Carousel {
    constructor(masterName, cardName, visibleSlides, attributes, leftBtn, rightBtn, pauseBtnName = null, masterIndicatorsName = null) {
        this.parent = document.querySelector(`#${masterName}`);

        this.slides = Array.from(this.parent.querySelectorAll(`.${cardName}`));

        this.nbSlides = this.slides.length;
        this.middleNSlides = Math.floor(this.nbSlides / 2);
        this.onScreenSlides = visibleSlides;
        this.arrayAttributes = attributes;
        this.index = 0;
        this.stopped = false;

        var style = window.getComputedStyle(document.body)
        this.slidingTime = style.getPropertyValue('--timeHeroAnimation').slice(0, -2);
        this.autoSlideTime = style.getPropertyValue('--timeAutoSlide').slice(0, -2);

        this.leftBtn = document.querySelector(`#${leftBtn}`)
        this.leftBtn.addEventListener('click', () => { this.slide('left') })
        this.rightBtn = document.querySelector(`#${rightBtn}`)
        this.rightBtn.addEventListener('click', () => { this.slide('right') })

        if (pauseBtnName) {
            this.pauseButton = document.querySelector(`#${pauseBtnName}`);
            this.pauseButton.addEventListener('click', () => { this.togglePause(); });
        }

        if (masterIndicatorsName) {
            this.indicators = Array.from(document.querySelector(`#${masterIndicatorsName}`).children);
            this.indicators.forEach((indicator, i) => {
                indicator.addEventListener('click', () => {
                    this.goToSlide(i);
                });
            });
            this.currentIndicator = this.indicators[this.index]
        }

        this.updateIndicator()
        this.startAutoSlide();
    }

    startAutoSlide() {
        if (this.stopped) { return }
        this.stopAutoSlide();

        this.autoSlideInterval = setInterval(() => {
            if (!this.sliding) {
                this.slide('right');
            }
        }, this.autoSlideTime);
    }

    stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
        const currentIndicatorMoving = this.indicators[this.index].firstChild
        const leftCurrIndic = window.getComputedStyle(currentIndicatorMoving)
        currentIndicatorMoving.style.marginLeft = leftCurrIndic.getPropertyValue('left');
    }

    slide(direction) {
        if (this.sliding) { return; }
    
        this.sliding = true;
        this.index = this.correctIndex(this.index + (direction === 'left' ? -1 : 1));
        console.log('ccur ind', this.index)
        
        this.slides.forEach((slide, i) => {
            const attributeIndex = this.correctIndex(i - this.index);
            slide.className = `hero-card ${this.arrayAttributes[attributeIndex]}`;
            slide.style.zIndex = this.nbSlides - this.correctIndex(attributeIndex - this.middleNSlides);
        });

        setTimeout(() => {
            this.sliding = false;
            this.startAutoSlide();
        }, this.slidingTime);

        this.updateIndicator();
    }

    correctIndex(index) {
        return (index + this.nbSlides) % this.nbSlides;
    }

    togglePause() {
        this.stopped = !this.stopped;
        this.pauseButton.classList.toggle('i-play', this.stopped)
        this.pauseButton.classList.toggle('i-pause', !this.stopped);

        if (this.stopped) {
            console.log('curr pause')
            this.stopAutoSlide()
        } else {
            this.startAutoSlide()
        }
    }

    updateIndicator() {
        if (!this.indicators) { return };

        this.indicators.forEach((indic) => {
            indic.classList = 'indicator'
        });
        this.indicators[this.index].classList = 'indicator indicator-active'
    }

    goToSlide(targetIndex) {
        if (targetIndex === this.index) { return; }
        const direction = targetIndex > this.index ? 'right' : 'left';
        while (this.index !== targetIndex) {
            this.slide(direction);
        }
    }
}

function main() {
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

/* 
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