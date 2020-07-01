import {DropdownOrigin} from "./dropdown-origin.js"

const MAX_ITEMS_VALUE = 10;
const MAX_GUESTS_VALUE = 10;
const MIN_ITEMS_VALUE = 0;

export class DropdownGuests extends DropdownOrigin {
  constructor(item) {
    super(item);
    this.applyButton = item.querySelector(".dropdown__button-apply");
    this.resetButton = item.querySelector(".dropdown__button-reset");

    this.applyButton.addEventListener("click", this.sendDataToServer);
    this.resetButton.addEventListener("click", this.cleanInput.bind(this))
  }

  update(eventType, item) {
    this.resetButton.hidden = false;
    let guestsSuffix = ["ей", "ь", "я", "я", "я", "ей",
      "ей", "ей", "ей", "ей", "ей", "ей"];
    let babiesSuffix = ["", "ец", "ца", "ца", "ца", "цев",
      "цев", "цев", "цев", "цев", "цев"];

    let itemsNums = this.items.map(item => item.value);

    let adultsNum = itemsNums[0];
    let kidsNum = itemsNums[1];
    let babiesNum = itemsNums[2];

    let sum = itemsNums.reduce((sum, num) => sum += num, 0);

    if (sum >= MAX_GUESTS_VALUE) {
      this._disableAddition();
    } else {
      this._enableAddition();
    }

    let inputTextContent =
      `${adultsNum + kidsNum} гост${guestsSuffix[adultsNum + kidsNum]}`;

    if (babiesNum > 0) {
      inputTextContent += `, ${babiesNum} младен${babiesSuffix[babiesNum]}`;
    }
    this.input.textContent = inputTextContent;
  }

  _disableAddition() {
    let pluses = this.items.map(item => item.plus);
    pluses.forEach(plus => plus.classList.add("dropdown__circle_disabled"));
  }

  _enableAddition() {
    this.items.filter(item => item.value < MAX_ITEMS_VALUE).
      forEach(item => item.plus.classList.remove("dropdown__circle_disabled"))
  }

  _disableDistraction() {
    this.items.filter(item => item.value == MIN_ITEMS_VALUE).
      forEach(item => item.minus.classList.add("dropdown__circle_disabled"))
  }

  sendDataToServer() {
    console.log("sending data to server");
  }

  cleanInput(e) {
    this.resetButton.hidden = true;
    this.input.textContent = "Сколько гостей";

    this.items.forEach(item => {
      item.value = 0;
      item.counter.textContent = 0;
    });

    this._disableDistraction();
    this._enableAddition();
  }
}