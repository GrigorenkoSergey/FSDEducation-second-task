import { boundMethod } from 'autobind-decorator';
import '../button/button';
import '../footer/footer';
import '../copyright/copyright';
import './header.scss';

import HeaderSubmenu from './HeaderSubmenu';

export default class Header {
  constructor() {
    this.menuExpanded = false;
    this._init();
  }

  _init() {
    this.el = document.querySelector('.js-header');
    this.trigger = this.el.querySelector('.js-header__trigger');
    this.menu = this.el.querySelector('.js-header__menu');

    [...this.el.querySelectorAll('.js-header__submenu-title')]
      .map((item) => new HeaderSubmenu(item.parentNode));

    this.trigger.addEventListener('click', this._handleTriggerClick);
  }

  @boundMethod
  _handleTriggerClick() {
    this.menu.classList.toggle('header__menu_visible');
    this.menuExpanded = !this.menuExpanded;

    if (this.menuExpanded) {
      document.addEventListener('click', this._handleDocumentClick);
    }
  }

  @boundMethod
  _handleDocumentClick(e) {
    if (this.el.contains(e.target)) return;

    this.menu.classList.remove('header__menu_visible');
    this.menuExpanded = false;

    document.removeEventListener('click', this._handleDocumentClick);
  }
}
