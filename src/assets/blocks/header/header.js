import './header.scss';

import '../button/button.js';
import '../footer/footer.js';
import '../copyright/copyright.js';

import HeaderSubmenu from './header__submenu.js';

class Header {
  constructor() {
    this.init();
  }

  init() {
    this.el = document.querySelector('.header');
    this.trigger = this.el.querySelector('.header__trigger');
    this.menu = this.el.querySelector('.header__menu');

    [...this.el.querySelectorAll('.header__submenu-title')]
      .map((item) => new HeaderSubmenu(item.parentNode));

    this.trigger.addEventListener('click', this.handleTriggerClick.bind(this));
  }

  handleTriggerClick(e) {
    this.menu.classList.toggle('header__menu_visible');
  }
}

const header = new Header();
