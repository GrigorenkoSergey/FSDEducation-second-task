import '../checkbox-list/checkbox-list';
import './expandable-checkbox-list.scss';

export default class ExpandableCheckbox {
  constructor(item) {
    this.el = item;
    this.blockName = 'expandable-checkbox-list';
    this.tokens = ['expand_more', 'expand_less'];
    this.expanded = false;
    this._init();
  }

  _init() {
    this.ul = this.el.querySelector('.js-checkbox-list');
    this.title = this.el.querySelector(`.js-${this.blockName}__title`);
    this.toggler = this.el.querySelector('.js-material-icons');

    this.title.addEventListener('click', this._handleTitleClick.bind(this));
  }

  _handleTitleClick() {
    this.expanded = !this.expanded;
    this.toggler.textContent = this.tokens[Number(this.expanded)];
    this.ul.hidden = !this.ul.hidden;
  }
}
