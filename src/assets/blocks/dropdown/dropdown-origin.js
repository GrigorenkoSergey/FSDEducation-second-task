import {EventObserver} from "../event-observer/event-observer.js";
const MAX_ITEMS_VALUE = 10;
const MIN_ITEMS_VALUE = 0;

export class DropdownOrigin {
  constructor(item) {
    this.el = item;
    this.items = [];

    this.input = item.getElementsByClassName("dropdown__input")[0];

    this.el.addEventListener("mousedown", (e) => e.preventDefault());
    this.input.addEventListener("click", (e) => this.onInputClick(e));

    this.itemsContainer = item.getElementsByClassName("dropdown__items-container")[0];
    const itemsDom = item.getElementsByClassName("dropdown__item");

    for (let itemDom of itemsDom) {
      const value = +itemDom.querySelector(".dropdown__counter").textContent;
      let item = new DropdownItem(itemDom, value, this.inputHandler);
      this.items.push(item);
      item.addSubscriber("changeItemValue", this);
    }
  }

  onInputClick(e) {
    this.itemsContainer.classList.toggle("dropdown__items-container_expanded");
    this.input.classList.toggle("dropdown__input_expanded");

    const {el, itemsContainer, input} = this;
    document.addEventListener("click", handleClickOutsideBlock);

    function handleClickOutsideBlock(e) {
      if (el.contains(e.target)) return;

      document.removeEventListener("click", handleClickOutsideBlock);
      input.classList.remove("dropdown__input_expanded");
      itemsContainer.classList.remove("dropdown__items-container_expanded");
    }
  }

  update() {
    console.log(this.items);
    let inputContent = this.items.map(item => item.value);
    this.input.textContent = inputContent;
  }
}

class DropdownItem extends EventObserver {
  constructor(item, value, input) {
    super();
    this.el = item;
    this.value = value;
    this.counter = this.el.querySelector(".dropdown__counter");
    this.minus = this.el.querySelector(".dropdown__circle[data-direction='-']");
    this.plus = this.el.querySelector(".dropdown__circle[data-direction='+']");

    this.minus.addEventListener("click", (e) => this.onMinusClick(e))
    this.plus.addEventListener("click", (e) => this.onPlusClick(e))
  }

  onMinusClick(e) {
    if (this.minus.classList.contains("dropdown__circle_disabled")) return;

    if (this.value === MAX_ITEMS_VALUE) {
      this.plus.classList.remove("dropdown__circle_disabled");
    }

    this.counter.textContent = --this.value;
    this.broadcast("changeItemValue", this);

    if (this.value === MIN_ITEMS_VALUE) {
      this.minus.classList.add("dropdown__circle_disabled");
    }
  }

  onPlusClick(e) {
    if (this.plus.classList.contains("dropdown__circle_disabled")) return;

    if (this.value === MIN_ITEMS_VALUE) {
      this.minus.classList.remove("dropdown__circle_disabled");
    }

    this.counter.textContent = ++this.value;
    this.broadcast("changeItemValue", this);

    if (this.value === MAX_ITEMS_VALUE) {
      this.plus.classList.add("dropdown__circle_disabled");
    }
  }
}