import DropdownItem from './dropdown-item.js';

export default class DropdownOrigin {
  constructor(item) {
    this.el = item;
    this.items = [];
    this.init();
  }

  init() {
    this.input = this.el.querySelector('.dropdown__input');

    this.input.addEventListener('click', this.onInputClick.bind(this));

    this.itemsContainer = this.el.querySelector('.dropdown__items-container');
    const itemsDom = this.el.getElementsByClassName('dropdown__item');

    [...itemsDom].forEach(((itemDom) => {
      const value = +itemDom.querySelector('.dropdown__counter').textContent;
      const item = new DropdownItem(itemDom, value, this.inputHandler);
      this.items.push(item);
      item.addSubscriber('changeItemValue', this);
    }));
  }

  onInputClick(e) {
    this.itemsContainer.classList.toggle('dropdown__items-container_expanded');
    this.input.classList.toggle('dropdown__input_expanded');

    const { el, itemsContainer, input } = this;

    function handleClickOutsideBlock(event) {
      if (el.contains(event.target)) return;

      document.removeEventListener('click', handleClickOutsideBlock);
      input.classList.remove('dropdown__input_expanded');
      itemsContainer.classList.remove('dropdown__items-container_expanded');
    }

    document.addEventListener('click', handleClickOutsideBlock);
  }

  update() {
    const inputContent = this.items.map((item) => item.value);
    this.input.textContent = inputContent;
  }
}
