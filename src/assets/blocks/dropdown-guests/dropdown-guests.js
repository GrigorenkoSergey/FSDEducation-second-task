/* eslint-disable no-param-reassign */
import DropdownOrigin from '../dropdown/dropdown-origin.js';

const MAX_ITEMS_VALUE = 10;
const MAX_GUESTS_VALUE = 10;
const MIN_ITEMS_VALUE = 0;

export default class DropdownGuests extends DropdownOrigin {
  bindHandlers() {
    super.bindHandlers();
    this.handlers.handleApplyButtonClick = this.handleApplyButtonClick.bind(this);
    this.handlers.handleResetButtonClick = this.handleResetButtonClick.bind(this);
  }

  init() {
    super.init();
    this.applyButton = this.el.querySelector('.dropdown__button-apply');
    this.resetButton = this.el.querySelector('.dropdown__button-reset');

    this.applyButton.addEventListener('click', this.handlers.handleApplyButtonClick);
    this.resetButton.addEventListener('click', this.handlers.handleResetButtonClick);
    this.update();
  }

  update(eventType, item) {
    this.resetButton.hidden = false;
    const guestsSuffix = ['ей', 'ь', 'я', 'я', 'я', 'ей',
      'ей', 'ей', 'ей', 'ей', 'ей', 'ей'];
    const babiesSuffix = ['', 'ец', 'ца', 'ца', 'ца', 'цев',
      'цев', 'цев', 'цев', 'цев', 'цев'];

    const itemsNums = this.items.map((arg) => arg.value);

    const adultsNum = itemsNums[0];
    const kidsNum = itemsNums[1];
    const babiesNum = itemsNums[2];

    // eslint-disable-next-line no-return-assign
    const sum = itemsNums.reduce((acc, num) => acc += num, 0);

    if (sum >= MAX_GUESTS_VALUE) {
      this.disableAddition();
    } else {
      this.enableAddition();
    }

    const guestsNum = adultsNum + kidsNum;
    let inputTextContent = '';

    inputTextContent = `${guestsNum === 0 ? 'Нет' : guestsNum} гост${guestsSuffix[adultsNum + kidsNum]}`;

    if (babiesNum > 0) {
      inputTextContent += `, ${babiesNum} младен${babiesSuffix[babiesNum]}`;
    }

    if (guestsNum + babiesNum === 0) {
      inputTextContent = 'Сколько гостей';
      this.resetButton.hidden = true;
    }

    this.input.textContent = inputTextContent;
  }

  disableAddition() {
    const pluses = this.items.map((item) => item.plus);
    pluses.forEach((plus) => plus.classList.add('dropdown__plus_disabled'));
  }

  enableAddition() {
    this.items.filter((item) => item.value < MAX_ITEMS_VALUE)
      .forEach((item) => item.plus.classList.remove('dropdown__plus_disabled'));
  }

  disableDistraction() {
    this.items.filter((item) => item.value === MIN_ITEMS_VALUE)
      .forEach((item) => item.minus.classList.add('dropdown__minus_disabled'));
  }

  handleApplyButtonClick() {
    this.input.classList.remove('dropdown__input_expanded');
    this.itemsContainer.classList.remove('dropdown__items-container_expanded');
  }

  handleResetButtonClick(e) {
    this.items.forEach((item) => {
      item.value = 0;
      item.counter.textContent = 0;
    });

    this.update();
    this.disableDistraction();
    this.enableAddition();
  }
}
