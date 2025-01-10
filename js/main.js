class Carousel {
    constructor(master, visibleSlides, attributes, leftBtn, rightBtn) {
        this.parent = document.querySelector(`#${master}`)
        this.onScreenSlides = visibleSlides
        this.arrayAttributes = attributes
        this.index = 0

        this.slides = this.parent.children
        this.nbSlides = this.slides.length

        this.leftButton = document.querySelector(`#${leftBtn}`)
        this.rightButton = document.querySelector(`#${rightBtn}`)
        this.leftButton.addEventListener('click', () => {this.slideLeft()})
        this.rightButton.addEventListener('click', () => {this.slideRight()})
    }
    
    slideLeft() {
        let a = this.correctIndex(this.index - 2);
        console.log('1',a)
        this.slides[a].style.backgroundColor = 'red'
        this.slides[a].classList.add(this.arrayAttributes[1])
        this.slides[a].classList.remove('hidden')

        a = this.correctIndex(this.index - 1);
        console.log('2',a)
        this.slides[a].style.backgroundColor = 'green'
        this.slides[a].classList.add(this.arrayAttributes[2])
        this.slides[a].classList.remove(this.arrayAttributes[1])

        console.log('3',this.index)
        this.slides[this.index].style.backgroundColor = 'blue'
        this.slides[this.index].classList.add(this.arrayAttributes[3])
        this.slides[this.index].classList.remove(this.arrayAttributes[2])
        
        a = this.correctIndex(this.index + 1);
        console.log('4',a)
        this.slides[a].style.backgroundColor = 'yellow'
        this.slides[a].classList.add(this.arrayAttributes[4])
        this.slides[a].classList.remove(this.arrayAttributes[3])

        
        this.index = this.correctIndex(this.index - 1)

    }

    slideRight() {

    }
    
    correctIndex(index) {
        return (index + this.nbSlides) % this.nbSlides;
    }


}
// Set timeout, si pas fini, set transition 0 et remet à 2
function main() {
    const body = document.querySelector('body');
    const btnTheme = document.querySelector('#theme');
    const notesButton = document.querySelector("#submitnote");
    
    let heroCarouselInstance = new Carousel(
        'hero-content',
        3,        
        ['hero-card-farleft', 'hero-card-left', 'hero-card-main', 'hero-card-right', 'hero-card-farright'],
        'arrow-left',
        'arrow-right',
    );
}
window.onload = main;