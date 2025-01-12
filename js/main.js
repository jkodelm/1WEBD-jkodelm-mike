/* TO DO:
? When click on indicator, doesn't widen + becomes gray
- Clearer func names?
- Fix zIndexs
- I can spam now?
- Keep anim values FROM CSS or enter directly in JS?
- Apply JS styling guide

Better responsive height*/

class heroCarousel {
    constructor() {
        this.cards = [...document.querySelector("#hero-content").children]; //javascript... we need .arrayfy()...
        this.pauseBtn = document.querySelector("#hero-pause");
        this.indicators = [...document.querySelector("#hero-indicators").children];

        this.cardClasses = ["hero-farleft", "hero-left", "hero-main", "hero-right", "hero-farright"];
        this.nbCards = this.cards.length;
        this.index = this.cards.length - 1;
        this.stopped = false;
        this.sliding = false;

        // TEMP FOR TESTS
        const style = window.getComputedStyle(document.body);
        this.slidingTime = style.getPropertyValue('--timeHeroAnimation').slice(0, -2);
        this.autoSlideTime = style.getPropertyValue('--timeAutoSlide').slice(0, -2);

        document.querySelector("#hero-arrow-left").addEventListener("click", () => { this.slide('l') });
        document.querySelector("#hero-arrow-right").addEventListener("click", () => { this.slide('r') });
        this.pauseBtn.addEventListener("click", () => { this.togglePause() });
        this.indicators.forEach((indicator, i) => {
            indicator.addEventListener('click', () => { this.goToSlide(i) });
        });

        this.slide('r');
        this.startAutoSlide();
    };

    slide(direction='r', newIndex=null) {
        if (this.sliding) { return };
        //this.sliding = true;

        if (newIndex !== null) {
            this.index = newIndex;
        } else {
            this.index = this.indexValue(direction);
        };

        this.cards.forEach((card, i) => {
            i = (i - 3 + this.nbCards) % this.nbCards
            //card.innerHTML = this.getZIndex(i);
            card.className = `hero-card ${this.cardClasses[(i - this.index + this.nbCards) % this.nbCards]}`;
        });

        this.manageIndicators();

        setTimeout(() => {
            this.sliding = false;
            if (!this.stopped) { this.startAutoSlide() };
        }, this.slidingTime);
    };

    indexValue(direction) {
        return direction === 'r' ? (this.index + 1) % this.nbCards : (this.index - 1 + this.nbCards) % this.nbCards;
    };

    goToSlide(index) {
        if (!this.stopped) { this.togglePause() };
        this.slide('', index);
    };

    /* getZIndex(i) {
        return (this.nbCards - Math.abs((i - this.index + this.nbCards) % this.nbCards) + 1) % this.nbCards;
    } */

    togglePause() {
        this.stopped = !this.stopped;
        this.pauseBtn.classList.toggle('i-play', this.stopped);
        this.pauseBtn.classList.toggle('i-pause', !this.stopped);

        this.indicators.forEach((indicator) => {
            const timeBar = indicator.firstElementChild;
            timeBar.style.animationPlayState = this.stopped ? 'paused' : 'running';
        });

        if (this.stopped) {
            this.stopAutoSlide();
        } else {
            this.startAutoSlide();
        };
    };

    startAutoSlide() {
        if (this.stopped) { return };
        this.stopAutoSlide();

        this.indicators[this.index].firstChild.onanimationend = () => {
            if (!this.stopped) {
                this.slide('r');
            }
        };
    };

    stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
    };

    manageIndicators() { /*origin*/
        this.indicators.forEach((indicator, i) => {
            const timeBar = indicator.firstElementChild;

            if (i === this.index) {
                //indicator.style.backgroundColor = 'var(--gray)';
                indicator.style.width = '3rem';
                timeBar.style.animation = `moveIndicator ${this.autoSlideTime}ms linear forwards`;
                timeBar.style.animationPlayState = this.stopped ? 'paused' : 'running';
            } else {
                //indicator.style.backgroundColor = 'var(--dark)';
                indicator.style.width = '1rem';
                timeBar.style.animation = 'none';
            };
        });
    };
};

function main() {
    new heroCarousel();
}
window.onload = main;