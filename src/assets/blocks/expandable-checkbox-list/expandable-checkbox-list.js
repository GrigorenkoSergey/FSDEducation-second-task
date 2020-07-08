class ExpandableCheckbox {
  constructor(item) {
    this.el = item;
    this.blockName = 'expandable-checkbox-list';
    this.bindHandlers();
    this.init();
  }

  bindHandlers() {
    this.handleTiteClick = this.handleTiteClick.bind(this);
  }

  init() {
    this.ul = this.el.querySelector('.checkbox-list');
    this.title = this.el.querySelector(`.${this.blockName}__title`);

    this.title.addEventListener('click', this.handleTiteClick);
  }

  handleTiteClick(e) {
    this.title.classList.toggle(`${this.blockName}__title_expanded`);
    this.ul.hidden = !this.ul.hidden;
  }
}

[...document.querySelectorAll('.expandable-checkbox-list')]
  .forEach((item) => new ExpandableCheckbox(item));
