class cardCarousel {
    constructor(carouselName, cardName, gap, controlButtonName, vignetteName) {
      this.carouselFrame = document.querySelector(`#${carouselName}`);
      this.carouselWidth = this.carouselFrame.offsetWidth;
      this.cardWidth = this.carouselFrame.querySelector(`.${cardName}`).offsetWidth;
      this.maxWidth = -(this.carouselFrame.scrollWidth - this.carouselFrame.offsetWidth);

      this.gap = gap;
      this.position = 0;
      this.isHolding = false;
      this.posCursor = 0;

      const leftBtn = document.querySelector(`#${controlButtonName[0]}`);
      const rightBtn = document.querySelector(`#${controlButtonName[1]}`);
      leftBtn.addEventListener('click', () => { this.moveCarousel('l'); })
      rightBtn.addEventListener('click', () => { this.moveCarousel('r'); })
      document.querySelector(`#${vignetteName}`).addEventListener('mousedown', (event) => { this.holding(event); });

      window.addEventListener('resize', () => {
        const newWidth = this.carouselFrame.offsetWidth;
        this.position += newWidth - this.carouselWidth;
        this.carouselWidth = newWidth;

        this.setTransform(true)
      });
    }

    setTransform(noTransition=false) {
      if (this.position < this.maxWidth) { this.position = this.maxWidth; }
      if (this.position > 0) { this.position = 0; }

      if (noTransition) {
        this.carouselFrame.style.transition = 'none';
        this.carouselFrame.style.transform = `translateX(${this.position}px)`;
        setTimeout(() => { this.carouselFrame.style.transition = 'transform var(--objectTransition) ease-in-out'; }, 10);
      } else {
        this.carouselFrame.style.transform = `translateX(${this.position}px)`;
      }
    }

    holding(event) {
      this.isHolding = true;
      document.body.style.cursor = 'grabbing';
      this.posCursor = event.clientX;

      window.addEventListener('mouseup', this.stopHolding);
      window.addEventListener('mousemove', this.dragCarousel);
    }

    dragCarousel = (event) => {
      if (this.isHolding) {
        const newPos = event.clientX - this.posCursor;
        this.posCursor = event.clientX;
        this.position += newPos;
        this.setTransform(true);
      }
    };

    stopHolding = () => {
      this.isHolding = false;
      document.body.style.cursor = 'default';

      window.removeEventListener('mouseup', this.stopHolding);
      window.removeEventListener('mousemove', this.dragCarousel);
    };

    moveCarousel(direction) {
      const carouselWidth = this.carouselFrame.offsetWidth;
      const scrollAmount = (this.cardWidth + this.gap) * Math.floor(carouselWidth / (this.cardWidth + this.gap));
      this.maxWidth = -(this.carouselFrame.scrollWidth - this.carouselFrame.offsetWidth);

      if (direction === 'r') { this.position -= scrollAmount; }
      else { this.position += scrollAmount; }

      this.setTransform();
    }
}

