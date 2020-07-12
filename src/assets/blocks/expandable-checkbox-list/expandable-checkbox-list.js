class ExpandableCheckbox {
  constructor(item) {
    this.el = item;
    this.blockName = 'expandable-checkbox-list';
    this.init();
  }

  init() {
    this.ul = this.el.querySelector('.checkbox-list');
    this.title = this.el.querySelector(`.${this.blockName}__title`);

    this.title.addEventListener('click', this.handleTitleClick.bind(this));
  }

  handleTitleClick(e) {
    this.title.classList.toggle(`${this.blockName}__title_expanded`);
    this.ul.hidden = !this.ul.hidden;
  }
}

[...document.querySelectorAll('.expandable-checkbox-list')]
  .forEach((item) => new ExpandableCheckbox(item));
