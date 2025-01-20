/* TO DO:
Better responsive height*/

class heroCarousel {
    constructor(parentName, cardClasses, slidingTime, controlButtonName, indicArray = false, autoSlideTime= 0, pauseName = false) {
        this.cards = [...document.querySelector(`#${parentName}`).children]; //javascript... we need .arrayfy()...
        this.nbCards = this.cards.length;    
        
        this.cardClasses = cardClasses
        this.slidingTime = 400;
        
        //&\\ For fewer than 5 cards
        if (this.nbCards < this.cardClasses.length) {
            let startCardClass = 2 - Math.floor((this.nbCards - 1) / 2);
            let endCardClass = this.nbCards + 2 - Math.floor((this.nbCards - 1) / 2);
            this.cardClasses = this.cardClasses.slice(startCardClass, endCardClass)
        }

        this.index = this.nbCards - 1 ;
        this.isStopped = false;
        this.isSliding = false;

        console.log(indicArray)
        if (indicArray) {
            this.createIndicators(indicArray)
        } else { this.indicators = false }

        if (pauseName) {
            this.pauseBtn = document.querySelector(`#${pauseName}`);
            this.pauseBtn.addEventListener('click', () => { this.togglePause() });
        } else { this.pauseBtn = false }
        
        this.slidingTime = slidingTime || 0
        this.autoSlideTime = autoSlideTime

        if (controlButtonName.length == 2) {
            document.querySelector(`#${controlButtonName[0]}`).addEventListener('click', () => { this.slide('l') });
            document.querySelector(`#${controlButtonName[1]}`).addEventListener('click', () => { this.slide() });
        }

        this.slide();
        this.startAutoSlide();
    };

    createIndicators(indicArray){

        console.log('exec sgtygihg')
        
        if (indicArray.length !== 3) { return; }
        const indicatorsDiv = document.querySelector(`#${indicArray[0]}`);
        for(let i = 0; i < this.nbCards; i++) {
            let heroIndicator = document.createElement('div');
            heroIndicator.classList.add(indicArray[1]);
            let heroIndicatorTime = document.createElement('div');
            heroIndicatorTime.classList.add(indicArray[2]);
            heroIndicator.appendChild(heroIndicatorTime);
            indicatorsDiv.appendChild(heroIndicator)
        }

        this.indicators = [...document.querySelector('#hero-indicators').children];
        
        this.indicators.forEach((indicator, i) => {
            indicator.addEventListener('click', () => { this.goToSlide(i) });
        });
    }

    slide(direction = 'r', newIndex = null) {
        if (this.isSliding) { return };
        this.isSliding = true;

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
            this.isSliding = false;
            if (!this.isStopped) { this.startAutoSlide() };
        }, this.slidingTime);
    };

    goToSlide(index) {
        if (!this.isStopped) { this.togglePause() };
        this.slide('', index);
    };

    manageIndicators() {
        console.log('inside',this.indicators)
        if ( !this.indicators ) { return };
        console.log('still inside')
        this.indicators.forEach((indicator, i) => {
            const timeBar = indicator.firstElementChild;
            indicator.style.backgroundColor = 'var(--dark)';
            indicator.style.width = '1rem';
            timeBar.style.animation = 'none';
        });

        const indicator = this.indicators[this.index]
        const timeBar = indicator.firstElementChild;

        if (this.isStopped) {
            indicator.style.backgroundColor = 'var(--gray)';
        } else {
            indicator.style.width = '3rem';
            timeBar.style.animation = `moveIndicator ${this.autoSlideTime}ms linear forwards`;
            timeBar.style.animationPlayState = this.isStopped ? 'paused' : 'running';
        }
        
    };

    togglePause() {
        this.isStopped = !this.isStopped;
        this.pauseBtn.classList.toggle('i-play', this.isStopped);
        this.pauseBtn.classList.toggle('i-pause', !this.isStopped);
        this.pauseBtn.parentNode.classList.toggle('active');

        this.indicators.forEach((indicator) => {
            const timeBar = indicator.firstElementChild;
            timeBar.style.animationPlayState = this.isStopped ? 'paused' : 'running';
        });

        if (this.isStopped) {
            this.manageIndicators();
        } else {
            this.slide()
            this.startAutoSlide();
        };
    };

    startAutoSlide() {
        if (this.isStopped) { return };

        this.indicators[this.index].firstChild.onanimationend = () => {
            if (!this.isStopped) {
                this.slide();
            }
        };
    };

    stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
    };
};

/* function mainHC() {
    /*new heroCarousel('hero-content', ['hero-farleft', 'hero-left', 'hero-main', 'hero-right', 'hero-farright'], 400, ['hero-arrow-left', 'hero-arrow-right'],  ['hero-indicators', 'hero-indicator', 'hero-indicator-time'], 5000, 'hero-pause')
}
window.onload = mainHC; */