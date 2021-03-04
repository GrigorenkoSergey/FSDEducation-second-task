import { boundMethod } from 'autobind-decorator';

export default class HeaderSubmenu {
  constructor(el) {
    this.el = el;
    this._init();
  }

  _init() {
    this.title = this.el.querySelector('.js-header__submenu-title');
    this.menu = this.el.querySelector('.js-header__submenu');

    this.title.addEventListener('click', this._handleTitleClick);
  }

  @boundMethod
  _handleTitleClick() {
    this.menu.classList.toggle('header__submenu_visible');
    this.title.classList.toggle('header__submenu-title_hovered');

    document.addEventListener('click', this._handleDocumentClick);
  }

  @boundMethod
  _handleDocumentClick(e) {
    if (!this.el.contains(e.target)) {
      document.removeEventListener('click', this._handleDocumentClick);

      this.menu.classList.remove('header__submenu_visible');
      this.title.classList.remove('header__submenu-title_hovered');
    }
  }
}
