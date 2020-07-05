import EventObserver from '../event-observer/event-observer';

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
    this.minus = this.el.querySelector(".dropdown__circle[data-direction='-']");
    this.plus = this.el.querySelector(".dropdown__circle[data-direction='+']");

    this.minus.addEventListener('click', this.onMinusClick.bind(this));
    this.plus.addEventListener('click', this.onPlusClick.bind(this));
  }

  onMinusClick(e) {
    if (this.minus.classList.contains('dropdown__circle_disabled')) return;

    if (this.value === MAX_ITEMS_VALUE) {
      this.plus.classList.remove('dropdown__circle_disabled');
    }

    this.value -= 1;
    this.counter.textContent = this.value;
    this.broadcast('changeItemValue', this);

    if (this.value === MIN_ITEMS_VALUE) {
      this.minus.classList.add('dropdown__circle_disabled');
    }
  }

  onPlusClick(e) {
    if (this.plus.classList.contains('dropdown__circle_disabled')) return;

    if (this.value === MIN_ITEMS_VALUE) {
      this.minus.classList.remove('dropdown__circle_disabled');
    }

    this.value += 1;
    this.counter.textContent = this.value;
    this.broadcast('changeItemValue', this);

    if (this.value === MAX_ITEMS_VALUE) {
      this.plus.classList.add('dropdown__circle_disabled');
    }
  }
}
