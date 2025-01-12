/* TO DO:
Better responsive height*/

class heroCarousel {
    constructor() {
        this.cards = [...document.querySelector('#hero-content').children]; //javascript... we need .arrayfy()...
        this.pauseBtn = document.querySelector('#hero-pause');      
        this.nbCards = this.cards.length;

        this.cardClasses = ['hero-farleft', 'hero-left', 'hero-main', 'hero-right', 'hero-farright'];
        
        //&\\ For fewer than 5 cards
        if (this.nbCards < this.cardClasses.length) {
            let startCardClass = 2 - Math.floor((this.nbCards - 1) / 2);
            let endCardClass = this.nbCards + 2 - Math.floor((this.nbCards - 1) / 2);
            this.cardClasses = this.cardClasses.slice(startCardClass, endCardClass)
        }

        this.index = this.nbCards - 1 ;
        this.stopped = false;
        this.sliding = false;

        this.indicators = this.addIndicators()

        // TEMP FOR TESTS
        const style = window.getComputedStyle(document.body);
        this.slidingTime = style.getPropertyValue('--timeHeroAnimation').slice(0, -2);
        this.autoSlideTime = style.getPropertyValue('--timeAutoSlide').slice(0, -2);

        document.querySelector('#hero-arrow-left').addEventListener('click', () => { this.slide('l') });
        document.querySelector('#hero-arrow-right').addEventListener('click', () => { this.slide() });
        this.pauseBtn.addEventListener('click', () => { this.togglePause() });
        this.indicators.forEach((indicator, i) => {
            indicator.addEventListener('click', () => { this.goToSlide(i) });
        });

        this.slide();
        this.startAutoSlide();
    };

    addIndicators(){
        const indicatorsDiv = document.querySelector('#hero-indicators');
        for(let i = 0; i < this.nbCards; i++) {
            let heroIndicator = document.createElement('div');
            heroIndicator.classList.add('hero-indicator');
            let heroIndicatorTime = document.createElement('div');
            heroIndicatorTime.classList.add('hero-indicator-time');
            heroIndicator.appendChild(heroIndicatorTime);
            indicatorsDiv.appendChild(heroIndicator)
        }
        return [...document.querySelector('#hero-indicators').children];
    }

    slide(direction = 'r', newIndex = null) {
        if (this.sliding) { return };
        this.sliding = true;

        if (newIndex !== null) {
            this.index = newIndex;
        } else {
            this.index = direction === 'r' ? (this.index + 1) % this.nbCards : (this.index - 1 + this.nbCards) % this.nbCards;
        };

        this.cards.forEach((card, i) => {
            i = (i - 3 + this.nbCards) % this.nbCards;
            card.className = `hero-card ${this.cardClasses[(i - this.index + this.nbCards) % this.nbCards]}`;
        });

        this.manageIndicators();
        setTimeout(() => {
            this.sliding = false;
            if (!this.stopped) { this.startAutoSlide() };
        }, this.slidingTime);
    };

    goToSlide(index) {
        if (!this.stopped) { this.togglePause() };
        this.slide('', index);
    };

    manageIndicators() {
        this.indicators.forEach((indicator, i) => {
            const timeBar = indicator.firstElementChild;
            indicator.style.backgroundColor = 'var(--dark)';
            indicator.style.width = '1rem';
            timeBar.style.animation = 'none';
        });

        const indicator = this.indicators[this.index]
        const timeBar = indicator.firstElementChild;
        if (this.stopped) {
            indicator.style.backgroundColor = 'var(--gray)';
        } else {
            indicator.style.width = '3rem';
            timeBar.style.animation = `moveIndicator ${this.autoSlideTime}ms linear forwards`;
            timeBar.style.animationPlayState = this.stopped ? 'paused' : 'running';
        }
        
    };

    togglePause() {
        this.stopped = !this.stopped;
        this.pauseBtn.classList.toggle('i-play', this.stopped);
        this.pauseBtn.classList.toggle('i-pause', !this.stopped);

        this.indicators.forEach((indicator) => {
            const timeBar = indicator.firstElementChild;
            timeBar.style.animationPlayState = this.stopped ? 'paused' : 'running';
        });

        if (this.stopped) {
            this.manageIndicators();
        } else {
            this.slide()
            this.startAutoSlide();
        };
    };

    startAutoSlide() {
        if (this.stopped) { return };

        this.indicators[this.index].firstChild.onanimationend = () => {
            if (!this.stopped) {
                this.slide();
            }
        };
    };

    stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
    };
};

function main() {
    new heroCarousel();
}
window.onload = main;