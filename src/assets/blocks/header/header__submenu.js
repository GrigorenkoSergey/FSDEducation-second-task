export default class HeaderSubmenu {
  constructor(el) {
    this.el = el;
    this.handlers = {};
    this.init();
  }

  bindHandlers() {
    this.handlers.handleTitleClick = this.handleTitleClick.bind(this);
    this.handlers.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  init() {
    this.bindHandlers();

    this.title = this.el.querySelector('.header__submenu-title');
    this.menu = this.el.querySelector('.header__submenu');

    this.title.addEventListener('click', this.handlers.handleTitleClick);
  }

  handleTitleClick(e) {
    this.menu.classList.toggle('header__submenu_visible');
    this.title.classList.toggle('header__submenu-title_hovered');

    document.addEventListener('click', this.handlers.handleDocumentClick);
  }

  handleDocumentClick(e) {
    if (!this.el.contains(e.target)) {
      document.removeEventListener('click', this.handlers.handleDocumentClick);

      this.menu.classList.remove('header__submenu_visible');
      this.title.classList.remove('header__submenu-title_hovered');
    }
  }
}
