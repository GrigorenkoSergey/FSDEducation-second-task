import './header.scss';

import '../button/button.js';
import '../footer/footer.js';
import '../copyright/copyright.js';
import '../footer-creative/footer-creative.js';

import HeaderSubmenu from './header__submenu.js';

class Header {
  constructor() {
    this.init();
  }

  init() {
    this.el = document.querySelector('.header');
    this.trigger = this.el.querySelector('.header__trigger');
    this.nav = this.el.querySelector('.header__nav');
    this.buttons = this.el.querySelector('.header__buttons');
    this.userLabel = this.el.querySelector('.header__user-name');

    [...this.el.querySelectorAll('.header__submenu-title')]
      .map((item) => new HeaderSubmenu(item.parentNode));

    this.trigger.addEventListener('click', this.handleTriggerClick.bind(this));
  }

  handleTriggerClick(e) {
    this.nav.classList.toggle('header__nav_visible');

    if (this.buttons) {
      this.buttons.classList.toggle('header__buttons_visible');
    } else {
      this.userLabel.classList.toggle('header__user-name_visible');
    }
  }
}

const header = new Header();
