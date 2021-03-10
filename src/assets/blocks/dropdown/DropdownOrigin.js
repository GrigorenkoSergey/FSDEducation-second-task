import { boundMethod } from 'autobind-decorator';

import DropdownItem from './DropdownItem';

export default class DropdownOrigin {
  constructor(item) {
    this.el = item;
    this.items = [];
    this._init();
  }

  update() {
    const inputContent = this.items.map((item) => item.value);
    this.inputText.textContent = inputContent;
  }

  _init() {
    this.input = this.el.querySelector('.js-dropdown__input');
    this.inputText = this.el.querySelector('.js-dropdown__input-text');
    this.input.addEventListener('click', this._handleInputClick);

    this.itemsContainer = this.el.querySelector('.js-dropdown__items-container');
    const itemsDom = this.el.getElementsByClassName('js-dropdown__item');

    [...itemsDom].forEach(((itemDom) => {
      const value = Number(itemDom.querySelector('.js-dropdown__counter').textContent);
      const item = new DropdownItem(itemDom, value, this.inputHandler);
      this.items.push(item);
      item.addSubscriber('changeItemValue', this);
    }));
  }

  @boundMethod
  _handleInputClick() {
    this.itemsContainer.classList.toggle('dropdown__items-container_expanded');
    this.input.classList.toggle('dropdown__input_expanded');

    document.addEventListener('click', this._handleDocumentClick);
  }

  @boundMethod
  _handleDocumentClick(e) {
    if (this.el.contains(e.target)) return;

    document.removeEventListener('click', this._handleDocumentClick);
    this.input.classList.remove('dropdown__input_expanded');
    this.itemsContainer.classList.remove('dropdown__items-container_expanded');
  }
}
