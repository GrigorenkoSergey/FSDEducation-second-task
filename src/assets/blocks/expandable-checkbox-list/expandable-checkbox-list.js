import './expandable-checkbox-list.scss';

import '../checkbox-list/checkbox-list.js';

class ExpandableCheckbox {
  constructor(item) {
    this.el = item;
    this.blockName = 'expandable-checkbox-list';
    this.tokens = ['expand_more', 'expand_less'];
    this.expanded = false;
    this._init();
  }

  _init() {
    this.ul = this.el.querySelector('.checkbox-list');
    this.title = this.el.querySelector(`.${this.blockName}__title`);
    this.toggler = this.el.querySelector('.material-icons');

    this.title.addEventListener('click', this._handleTitleClick.bind(this));
  }

  _handleTitleClick() {
    this.expanded = !this.expanded;
    this.toggler.textContent = this.tokens[Number(this.expanded)];
    this.ul.hidden = !this.ul.hidden;
  }
}

[...document.querySelectorAll('.expandable-checkbox-list')]
  .forEach((item) => new ExpandableCheckbox(item));
