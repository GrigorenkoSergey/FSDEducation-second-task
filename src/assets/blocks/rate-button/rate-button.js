class RateButton {
  constructor(item) {
    this.el = item;
    this.init();
  }

  init() {
    this.el.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(e) {
    const stars = Number(e.target.dataset.star);

    [...this.el.children].forEach((item, index) => {
      if (index < stars) {
        item.classList.add('rate-button__star_checked');
      } else {
        item.classList.remove('rate-button__star_checked');
      }
    });
  }
}

[...document.getElementsByClassName('rate-button')]
  .forEach((item) => new RateButton(item));
