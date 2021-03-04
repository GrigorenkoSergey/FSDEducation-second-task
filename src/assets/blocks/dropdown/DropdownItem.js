import EventObserver from '../event-observer/EventObserver';

const MAX_ITEMS_VALUE = 10;
const MIN_ITEMS_VALUE = 0;

export default class DropdownItem extends EventObserver {
  constructor(item, value) {
    super();
    this.el = item;
    this.value = value;
    this._init();
  }

  update() {
    if (this.value <= MIN_ITEMS_VALUE) {
      this.minus.classList.add('dropdown__minus_disabled');
    }

    if (this.value >= MAX_ITEMS_VALUE) {
      this.plus.classList.add('dropdown__plus_disabled');
    }
  }

  _init() {
    this.counter = this.el.querySelector('.js-dropdown__counter');
    this.minus = this.el.querySelector('.js-dropdown__minus');
    this.plus = this.el.querySelector('.js-dropdown__plus');

    this.minus.addEventListener('click', this._handleMinusClick.bind(this));
    this.plus.addEventListener('click', this._handlePlusClick.bind(this));
    this.update();
  }

  _handleMinusClick() {
    if (this.minus.classList.contains('dropdown__minus_disabled')) return;

    if (this.value === MAX_ITEMS_VALUE) {
      this.plus.classList.remove('dropdown__plus_disabled');
    }

    this.value -= 1;
    this.counter.textContent = this.value;
    this.broadcast('changeItemValue', this);
    this.update();
  }

  _handlePlusClick() {
    if (this.plus.classList.contains('dropdown__plus_disabled')) return;

    if (this.value === MIN_ITEMS_VALUE) {
      this.minus.classList.remove('dropdown__minus_disabled');
    }

    this.value += 1;
    this.counter.textContent = this.value;
    this.broadcast('changeItemValue', this);
    this.update();
  }
}
