/* TODO :
- Setup carousel elements from class
- More repsonsive
- Tags top: Dernièrement sorti, Votre cinéma, News
- Rename
*/

class heroCarousel {
    constructor() {
        this.cards = [...document.querySelector("#hero-content").children]; //javascript... we need .arrayfy()...
        this.pauseBtn = document.querySelector("#hero-pause")
        this.indicators = [...document.querySelector("#hero-indicators").children]

        this.cardClasses = ["hero-farleft", "hero-left", "hero-main", "hero-right", "hero-farright"];
        this.nbCards = this.cards.length
        this.index = this.cards.length - 1;
        this.stopped = false
        this.indicatorAnimation = null
        this.slide('r')

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
        this.currentIndicator = this.indicators[this.index]
    }
  
    slide(direction, newIndex=null) {

        this.sliding = true;
        this.manageIndicator('stop')

        if (direction === 'r') {
            this.index = (this.index + 1) % this.nbCards
        } else if (direction === 'l') {
            this.index = this.correctIndex(this.index - 1)
        } else {
            this.index = newIndex
        }

        this.cards.forEach((card, ind) => {
            card.zIndex = this.indexValue(ind, this.index, this.nbCards) // fix
            card.classList = 'hero-card ' + this.cardClasses[(this.correctIndex(ind - this.index) + 2) % this.nbCards] //i love math
        });

        setTimeout(() => {
            this.sliding = false;
            this.startAutoSlide();
        }, this.slidingTime);

        if (direction !== '') {
            this.manageIndicator('span')
        } else {
            this.manageIndicator('change')
        }
    }

    correctIndex(index) {
        return (index + this.nbCards) % this.nbCards
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
                this.manageIndicator('stop', this.correctIndex(this.index - 1))
                this.slide('r');
                this.manageIndicator('span')
            }
        }, this.autoSlideTime);
    }

    stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.manageIndicator('pause')
    }

    manageIndicator(action, index=this.index) {
        const indic = this.indicators[index];
        if (action === 'span') { 
            indic.style.width = '3rem';
            indic.firstChild.style.width = '100%';
        } else if (action === 'change') { 
            indic.style.backgroundColor = '#6A6A6A';
        } else if (action === 'stop') {
            indic.style.width = '1rem';
            indic.style.backgroundColor = '#242424';
            indic.firstChild.classList.add('notransition')
            indic.firstChild.style.width = '0';
            window.setTimeout(() => { indic.firstChild.classList.remove('notransition') }, 50, indic)
        } else if (action === 'pause') { 
            
        }
    }

    goToSlide(index) {
        this.manageIndicator('change', index)
        this.slide('', index)
        this.stopAutoSlide()
    }
}

function main() {
    const heroCarousel1 = new heroCarousel();
}
window.onload = main;
