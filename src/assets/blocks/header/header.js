import './header.scss';

import '../button/button.js';
import '../footer/footer.js';
import '../copyright/copyright.js';

import HeaderSubmenu from './header__submenu.js';

class Header {
  constructor() {
    this.handlers = {};
    this.menuExpanded = false;
    this.init();
  }

  bindHandlers() {
    this.handlers.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handlers.handleTriggerClick = this.handleTriggerClick.bind(this);
  }

  init() {
    this.bindHandlers();

    this.el = document.querySelector('.header');
    this.trigger = this.el.querySelector('.header__trigger');
    this.menu = this.el.querySelector('.header__menu');

    [...this.el.querySelectorAll('.header__submenu-title')]
      .map((item) => new HeaderSubmenu(item.parentNode));

    this.trigger.addEventListener('click', this.handlers.handleTriggerClick);
  }

  handleTriggerClick(e) {
    this.menu.classList.toggle('header__menu_visible');
    this.menuExpanded = !this.menuExpanded;

    if (this.menuExpanded) {
      document.addEventListener('click', this.handlers.handleDocumentClick);
    }
  }

  handleDocumentClick(e) {
    if (this.el.contains(e.target)) return;

    this.menu.classList.remove('header__menu_visible');
    this.menuExpanded = false;

    document.removeEventListener('click', this.handlers.handleDocumentClick);
  }
}

const header = new Header();
