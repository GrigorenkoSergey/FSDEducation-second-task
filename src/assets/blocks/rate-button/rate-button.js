class RateButton {
  constructor(item) {
    this.el = item;
    this.init();
  }

  init() {
    this.el.addEventListener('click', this.onClick.bind(this));
  }

  onClick(e) {
    const stars = +e.target.dataset.star;

    for (let i = 0; i < 5; i += 1) {
      if (i < stars) {
        this.el.children[i].className = 'rate-button__star_checked';
      } else {
        this.el.children[i].className = 'rate-button__star';
      }
    }
  }
}

[...document.getElementsByClassName('rate-button')]
  .forEach((item) => new RateButton(item));
