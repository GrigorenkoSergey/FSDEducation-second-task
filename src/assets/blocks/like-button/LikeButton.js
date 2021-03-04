import './like-button.scss';

export default class LikeButton {
  constructor(item) {
    this.el = item;
    this._init();
  }

  _init() {
    this.counter = this.el.querySelector('.js-like-button__counter');
    this.el.addEventListener('click', this._handleLikeButtonClick.bind(this));
  }

  _handleLikeButtonClick() {
    const { el, counter } = this;

    el.classList.toggle('like-button_pushed');
    if (el.classList.contains('like-button_pushed')) {
      counter.textContent = Number(counter.textContent) + 1;
    } else {
      counter.textContent = Number(counter.textContent) - 1;
    }
  }
}
