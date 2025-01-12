class heroCarousel {
    constructor() {
        this.cards = [...document.querySelector("#hero-content").children];
        this.pauseBtn = document.querySelector("#hero-pause")
        this.indicators = [...document.querySelector("#hero-indicators").children];

        this.cardClasses = ["hero-farleft", "hero-left", "hero-main", "hero-right", "hero-farright"];
        this.nbCards = this.cards.length;
        this.index = this.cards.length - 1;
        this.stopped = false;
        this.sliding = false;

        this.slide('r');

        const style = window.getComputedStyle(document.body)
        this.slidingTime = style.getPropertyValue('--timeHeroAnimation').slice(0, -2);
        this.autoSlideTime = style.getPropertyValue('--timeAutoSlide').slice(0, -2);
        this.startAutoSlide()

        document.querySelector("#hero-arrow-left").addEventListener("click", () => { this.slide('l') });
        document.querySelector("#hero-arrow-right").addEventListener("click", () => { this.slide('r') });
        this.pauseBtn.addEventListener("click", () => { this.togglePause() });
        this.indicators.forEach((indicator, i) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(i);
            });
        });
        this.currentIndicator = this.indicators[this.index];
    }

    slide(direction='r', newIndex = null) {
        this.sliding = true;
        this.manageIndicator('stop');
        
        if (newIndex !== null) {
            this.index = newIndex;
            this.manageIndicator('change');
        } else if (direction === 'r') {
            this.index = (this.index + 1) % this.nbCards;
        } else if (direction === 'l') {
            this.index = this.correctIndex(this.index - 1);
        };

        this.cards.forEach((card, ind) => {
            card.zIndex = this.indexValue(ind);
            card.classList = 'hero-card ' + this.cardClasses[(this.correctIndex(ind - this.index) + 2) % this.nbCards];
        });

        if (newIndex === null) {
            setTimeout(() => {
                this.sliding = false;
                this.startAutoSlide();
            }, this.slidingTime);
        };

        if (this.stopped) {
            this.manageIndicator('change');
        } else {
            this.manageIndicator('span');
        }
    };

    correctIndex(index) {
        return (index + this.nbCards) % this.nbCards;
    };

    indexValue(i) {
        let val = i - this.index;
        let maxi = this.nbCards;
        if (val < 0) { return maxi - (maxi + val); }
        return maxi - val;
    };

    togglePause() {
        this.stopped = !this.stopped;
        this.pauseBtn.classList.toggle('i-play', this.stopped);
        this.pauseBtn.classList.toggle('i-pause', !this.stopped);

        if (this.stopped) {
            this.stopAutoSlide();
            this.manageIndicator('pause');
        } else {
            this.manageIndicator('resume');
            this.startAutoSlide();
        }
    }

    startAutoSlide() {
        if (this.stopped) return;
        this.stopAutoSlide();

        this.autoSlideInterval = setInterval(() => {
            if (!this.sliding) {
                this.manageIndicator('stop', this.correctIndex(this.index - 1));
                this.slide('r');
                this.manageIndicator('span');
            }
        }, this.autoSlideTime);
    }

    stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.manageIndicator('pause');
    }

    manageIndicator(action, index = this.index) {
        const indic = this.indicators[index];
        const timeIndic = indic.firstChild;

        if (action === 'span') {
            indic.classList.add('hero-indicator-moving');
            indic.style.width = '3rem';
            timeIndic.style.animation = 'moveIndicator var(--timeAutoSlide) linear forwards';
            timeIndic.style.animationPlayState = 'running';
            timeIndic.onanimationend = () => {
                if (!this.stopped) {
                    indic.style.width = '1rem';
                    this.slide('r');
                }
            };
        } else if (action === 'pause') {
            if (timeIndic.style.animation) {
                timeIndic.style.animationPlayState = 'paused';
            }
        } else if (action === 'resume') {
            if (timeIndic.style.animation) {
                timeIndic.style.animationPlayState = 'running';
            }
            indic.style.width = '3rem';
            indic.style.backgroundColor = "var(--dark)";
        } else if (action === 'stop') {
            indic.style.backgroundColor = "var(--dark)";
            indic.style.width = '1rem'
            timeIndic.style.animation = 'none';
        } else if (action === 'change') {
            indic.style.backgroundColor = "var(--gray)";
        }
    }

    goToSlide(index) {
        if (!this.stopped) { this.togglePause() }
        this.manageIndicator('change', index);
        this.slide('', index);
        this.stopAutoSlide();
    }
}

function main() {
    const heroCarousel1 = new heroCarousel();
}

window.onload = main;
