import DropdownItem from './DropdownItem.js';

export default class DropdownOrigin {
  constructor(item) {
    this.el = item;
    this.items = [];
    this.handlers = {};
    this._init();
  }

  _bindHandlers() {
    this.handlers.handleInputClick = this._handleInputClick.bind(this);
    this.handlers.handleDocumentClick = this._handleDocumentClick.bind(this);
  }

  _init() {
    this._bindHandlers();

    this.input = this.el.querySelector('.dropdown__input');
    this.inputText = this.el.querySelector('.dropdown__input-text');
    this.input.addEventListener('click', this.handlers.handleInputClick);

    this.itemsContainer = this.el.querySelector('.dropdown__items-container');
    const itemsDom = this.el.getElementsByClassName('dropdown__item');

    [...itemsDom].forEach(((itemDom) => {
      const value = Number(itemDom.querySelector('.dropdown__counter').textContent);
      const item = new DropdownItem(itemDom, value, this.inputHandler);
      this.items.push(item);
      item.addSubscriber('changeItemValue', this);
    }));
  }

  _handleInputClick() {
    this.itemsContainer.classList.toggle('dropdown__items-container_expanded');
    this.input.classList.toggle('dropdown__input_expanded');

    document.addEventListener('click', this.handlers.handleDocumentClick);
  }

  _handleDocumentClick(e) {
    if (this.el.contains(e.target)) return;

    document.removeEventListener('click', this.handlers.handleDocumentClick);
    this.input.classList.remove('dropdown__input_expanded');
    this.itemsContainer.classList.remove('dropdown__items-container_expanded');
  }

  update() {
    const inputContent = this.items.map((item) => item.value);
    this.inputText.textContent = inputContent;
  }
}
