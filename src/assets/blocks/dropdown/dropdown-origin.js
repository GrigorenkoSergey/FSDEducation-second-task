import DropdownItem from './dropdown-item.js';

export default class DropdownOrigin {
  constructor(item) {
    this.el = item;
    this.items = [];
    this.init();
  }

  init() {
    this.bindMethods();

    this.input = this.el.querySelector('.dropdown__input');
    this.input.addEventListener('click', this.handleInputClick);

    this.itemsContainer = this.el.querySelector('.dropdown__items-container');
    const itemsDom = this.el.getElementsByClassName('dropdown__item');

    [...itemsDom].forEach(((itemDom) => {
      const value = +itemDom.querySelector('.dropdown__counter').textContent;
      const item = new DropdownItem(itemDom, value, this.inputHandler);
      this.items.push(item);
      item.addSubscriber('changeItemValue', this);
    }));
  }

  bindMethods() {
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  handleInputClick(e) {
    this.itemsContainer.classList.toggle('dropdown__items-container_expanded');
    this.input.classList.toggle('dropdown__input_expanded');

    document.addEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick(e) {
    if (this.el.contains(e.target)) return;

    document.removeEventListener('click', this.handleDocumentClick);
    this.input.classList.remove('dropdown__input_expanded');
    this.itemsContainer.classList.remove('dropdown__items-container_expanded');
  }

  update() {
    const inputContent = this.items.map((item) => item.value);
    this.input.textContent = inputContent;
  }
}
