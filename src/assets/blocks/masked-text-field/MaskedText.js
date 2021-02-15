/* eslint-disable class-methods-use-this */

export default class MaskedText {
  constructor(domElem) {
    this.el = domElem;
    this.format = this.el.dataset.format;
    this.init();
  }

  init() {
    this.el.addEventListener('change', this.handleMaskedTextFieldChange.bind(this));
  }

  handleMaskedTextFieldChange(e) {
    const methodName = `${this.format}Check`;
    this[methodName](e);
  }

  dateCheck(e) {
    let date = e.target.value;
    const regexp = /^(\d{2}).(\d{2}).(\d{4})$/;

    if (!regexp.test(date)) {
      e.target.value = '';
      return;
    }

    const dateOrigin = date;
    date = date.split('.').reverse();

    if (!(new Date(date).toLocaleDateString('ru-RU') === dateOrigin)) {
      e.target.value = '';
    }
  }
}
