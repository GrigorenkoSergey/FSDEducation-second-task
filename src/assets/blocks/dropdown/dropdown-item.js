import EventObserver from '../event-observer/event-observer.js';

const MAX_ITEMS_VALUE = 10;
const MIN_ITEMS_VALUE = 0;

export default class DropdownItem extends EventObserver {
  constructor(item, value, input) {
    super();
    this.el = item;
    this.value = value;
    this.init();
  }

  init() {
    this.counter = this.el.querySelector('.dropdown__counter');
    this.minus = this.el.querySelector('.dropdown__minus');
    this.plus = this.el.querySelector('.dropdown__plus');

    this.minus.addEventListener('click', this.handleMinusClick.bind(this));
    this.plus.addEventListener('click', this.handlePlusClick.bind(this));
    this.update();
  }

  update() {
    if (this.value <= MIN_ITEMS_VALUE) {
      this.minus.classList.add('dropdown__minus_disabled');
    }

    if (this.value >= MAX_ITEMS_VALUE) {
      this.plus.classList.add('dropdown__plus_disabled');
    }
  }

  handleMinusClick(e) {
    if (this.minus.classList.contains('dropdown__minus_disabled')) return;

    if (this.value === MAX_ITEMS_VALUE) {
      this.plus.classList.remove('dropdown__plus_disabled');
    }

    this.value -= 1;
    this.counter.textContent = this.value;
    this.broadcast('changeItemValue', this);
    this.update();
  }

  handlePlusClick(e) {
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
