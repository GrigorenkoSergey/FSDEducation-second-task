export default class LikeButton {
  constructor(item) {
    this.el = item;
    this.init();
  }

  init() {
    this.counter = this.el.querySelector('.like-button__counter');
    this.el.addEventListener('click', this.handleLikeButtonClick.bind(this));
  }

  handleLikeButtonClick(e) {
    const { el, counter } = this;

    el.classList.toggle('like-button_pushed');
    if (el.classList.contains('like-button_pushed')) {
      counter.textContent = Number(counter.textContent) + 1;
    } else {
      counter.textContent = Number(counter.textContent) - 1;
    }
  }
}

[...document.getElementsByClassName('like-button')]
  .forEach((item) => new LikeButton(item));
