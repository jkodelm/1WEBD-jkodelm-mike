/* TODO :
- Setup carousel elements from class
- More repsonsive
- Tags top: Dernièrement sorti, Votre cinéma, News
- Rename
*/

/* PREVIOUS

class Carousel {
    constructor(masterName, cardName, visibleSlides, attributes, leftBtn, rightBtn, pauseBtnName = null, masterIndicatorsName = null) {
        this.parent = document.querySelector(`#${masterName}`);

        this.slides = Array.from(this.parent.querySelectorAll(`.${cardName}`));

        this.nbSlides = this.slides.length;
        this.middleNbSlides = Math.floor(this.nbSlides / 2);
        this.onScreenSlides = visibleSlides;
        this.arrayAttributes = attributes;
        this.index = 0;
        this.stopped = false;

        var style = window.getComputedStyle(document.body)
        this.slidingTime = style.getPropertyValue('--timeHeroAnimation').slice(0, -2);
        this.autoSlideTime = style.getPropertyValue('--timeAutoSlide').slice(0, -2);
        console.log(this.slidingTime, this.autoSlideTime)

        this.leftBtn = document.querySelector(`#${leftBtn}`)
        this.leftBtn.addEventListener('click', () => { this.slide('left') })
        this.rightBtn = document.querySelector(`#${rightBtn}`)
        this.rightBtn.addEventListener('click', () => { this.slide('right') })

        if (pauseBtnName) {
            this.pauseBtn = document.querySelector(`#${pauseBtnName}`);
            this.pauseBtn.addEventListener('click', () => { this.togglePause(); });
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

        this.switchIndicator()
        this.startAutoSlide();
    }

    startAutoSlide() {
        if (this.stopped) { return }
        this.stopAutoSlide();

        this.autoSlideInterval = setInterval(() => {
            if (!this.sliding) {
                this.manageIndicator(this.indicators[this.index], 'stop')
                this.slide('right');
                this.manageIndicator(this.indicators[this.index], 'span')
            }
        }, this.autoSlideTime);
    }

    stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.manageIndicator(this.indicators[this.index], 'pause')
    }

    manageIndicator(indic, action) {
        if (action === 'instant') {
            indic.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        } else if (action === 'span') {
            indic.firstChild.style.width = '100%';
        } else if (action === 'stop') {
            indic.firstChild.style.transition = 'none';
            indic.firstChild.style.width = '0';
            setTimeout(() => {
                indic.firstChild.style.transition = `width ${this.autoSlideTime}ms`;
            }, 0);
        } else if (action === 'pause') {
            indic.firstChild.style.transition = 'none';
        }
    }
    

    slide(direction) {
        if (this.sliding) { return; }
    
        this.sliding = true;
        this.index = this.correctIndex(this.index + (direction === 'left' ? -1 : 1));
        console.log('ccur ind', this.index)

        for(let i=this.index; i < this.correctIndex(this.index + 4); this.correctIndex(i++)) {
            console.log('tyèft',i)
            let slide = this.slides[i]
            slide.className = `hero-card ${this.arrayAttributes[i]}`;
            slide.style.zIndex = this.nbSlides - this.correctIndex(i - this.middleNbSlides);
        }
        
        /* this.slides.forEach((slide, i) => {
            const attributeIndex = this.correctIndex(i - this.index);
            slide.className = `hero-card ${this.arrayAttributes[attributeIndex]}`;
            slide.style.zIndex = this.nbSlides - this.correctIndex(attributeIndex - this.middleNbSlides);
        }); 

        setTimeout(() => {
            this.sliding = false;
            this.startAutoSlide();
        }, this.slidingTime);

        this.switchIndicator();
    }

    correctIndex(index) {
        return (index + this.nbSlides) % this.nbSlides;
    }

    togglePause() {
        this.stopped = !this.stopped;
        this.pauseBtn.classList.toggle('i-play', this.stopped)
        this.pauseBtn.classList.toggle('i-pause', !this.stopped);

        if (this.stopped) {
            console.log('curr pause')
            this.stopAutoSlide()
        } else {
            this.startAutoSlide()
        }
    }

    switchIndicator() {
        if (!this.indicators) { return };

        this.indicators.forEach((indic) => {
            indic.classList = 'indicator'
        });
        let currIndic = this.indicators[this.index]
        currIndic.classList = 'indicator indicator-active'
    }

    goToSlide(targetIndex) {
        if (targetIndex === this.index) { return; }
        const direction = targetIndex > this.index ? 'right' : 'left';
        while (this.index !== targetIndex) {
            this.slide(direction);
        }
    }
}*/

class heroCarousel {
    constructor() {
        this.cards = document.querySelectorAll(".hero-card");
        this.pauseBtn = document.querySelector("#hero-pause")
        this.indicators = document.querySelectorAll(".hero-indicators")

        this.cardClasses = ["hero-farleft", "hero-left", "hero-main", "hero-right", "hero-farright"];
        this.nbCards = this.cards.length
        this.index = this.cards.length - 1;
        this.stopped = false
        this.slide()

        var style = window.getComputedStyle(document.body)
        this.slidingTime = style.getPropertyValue('--timeHeroAnimation').slice(0, -2);
        this.autoSlideTime = style.getPropertyValue('--timeAutoSlide').slice(0, -2);

        document.querySelector("#hero-arrow-left").addEventListener("click", () => { this.slide('l') });
        document.querySelector("#hero-arrow-right").addEventListener("click", () => { this.slide('r') });
        this.pauseBtn.addEventListener("click", () => { this.togglePause() });
        this.indicators.forEach((indicator, i) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(i);
            });
        });
        this.currentIndicator = this.indicators[this.index]
    }
  
    slide(direction, newIndex=null) {
        if (direction === 'r') {
            this.index = (this.index + 1) % this.nbCards
        } else if (direction === 'l') {
            this.index = (this.index - 1 + this.nbCards) % this.nbCards
        } else {
            this.index = newIndex
        }

        this.cards.forEach((card, ind) => {
            card.zIndex = this.indexValue(ind, this.index, this.nbCards)
            card.classList = 'hero-card ' + this.cardClasses[((ind - this.index + this.nbCards) % this.nbCards + 2) % this.nbCards] //i love math
        });
    }
  
    indexValue(i, ind, maxi) {
        let val = i - ind
        if (val < 0) { return maxi - (maxi + val) }
        return maxi - val
    }

    togglePause() {
        this.stopped = !this.stopped;
        this.pauseBtn.classList.toggle('i-play', this.stopped)
        this.pauseBtn.classList.toggle('i-pause', !this.stopped);

        if (this.stopped) {
            console.log('curr pause')
            this.stopAutoSlide()
        } else {
            this.startAutoSlide()
        }
    }

    startAutoSlide() {
        if (this.stopped) { return }
        this.stopAutoSlide();

        this.autoSlideInterval = setInterval(() => {
            if (!this.sliding) {
                this.manageIndicator(this.indicators[this.index], 'stop')
                this.slide('r');
                this.manageIndicator(this.indicators[this.index], 'span')
            }
        }, this.autoSlideTime);
    }

    stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.manageIndicator(this.indicators[this.index], 'pause')
    }

    manageIndicator() {}

    goToSlide(index) {
        this.slide(newIndex=index)
    }
}

function main() {
    const heroCarousel1 = new heroCarousel();
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