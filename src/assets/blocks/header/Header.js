import '../button/button';
import '../footer/footer';
import '../copyright/copyright';
import './header.scss';

import HeaderSubmenu from './HeaderSubmenu';

export default class Header {
  constructor() {
    this.handlers = {};
    this.menuExpanded = false;
    this._init();
  }

  _bindHandlers() {
    this.handlers.handleDocumentClick = this._handleDocumentClick.bind(this);
    this.handlers.handleTriggerClick = this._handleTriggerClick.bind(this);
  }

  _init() {
    this._bindHandlers();

    this.el = document.querySelector('.js-header');
    this.trigger = this.el.querySelector('.js-header__trigger');
    this.menu = this.el.querySelector('.js-header__menu');

    [...this.el.querySelectorAll('.js-header__submenu-title')]
      .map((item) => new HeaderSubmenu(item.parentNode));

    this.trigger.addEventListener('click', this.handlers.handleTriggerClick);
  }

  _handleTriggerClick() {
    this.menu.classList.toggle('header__menu_visible');
    this.menuExpanded = !this.menuExpanded;

    if (this.menuExpanded) {
      document.addEventListener('click', this.handlers.handleDocumentClick);
    }
  }

  _handleDocumentClick(e) {
    if (this.el.contains(e.target)) return;

    this.menu.classList.remove('header__menu_visible');
    this.menuExpanded = false;

    document.removeEventListener('click', this.handlers.handleDocumentClick);
  }
}
