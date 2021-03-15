import { boundMethod } from 'autobind-decorator';

export default class MaskedText {
  constructor(domElem) {
    this.el = domElem;
    this.format = this.el.dataset.format;
    this.errorMessage = document.createElement('span');
    this._init();
  }

  _init() {
    this.el.addEventListener('change', this._handleMaskedTextFieldChange);
    this.el.addEventListener('input', this._handleMaskedTextFieldInput);

    const { errorMessage } = this;
    errorMessage.classList.add('masked-text-field__error');
    errorMessage.textContent = 'Некорректная дата';
  }

  @boundMethod
  _handleMaskedTextFieldChange(e) {
    const methodName = `_${this.format}Check`;

    if (this[methodName](e)) {
      this.errorMessage.remove();
    } else {
      this._showErrorMessage();
    }
  }

  @boundMethod
  _handleMaskedTextFieldInput() {
    let text = this.el.value;

    const pos = text.length - 1;
    if (pos === 2 || pos === 5) {
      if (text[pos] !== '.') text = [...text.slice(0, pos), '.', text[pos]].join('');
    }
    const maskRe = /^(\d\d\.){0,2}\d{0,4}$/;
    if (!maskRe.test(text)) text = text.slice(0, -1);
    this.el.value = text;
  }

  _dateCheck(e) {
    let date = e.target.value;
    const regexp = /^(\d{2})\.(\d{2})\.(\d{4})$/;

    if (!regexp.test(date)) {
      this._showErrorMessage();
      e.target.value = '';
      return false;
    }

    const dateOrigin = date;
    date = date.split('.').reverse();

    if (!(new Date(date).toLocaleDateString('ru-RU') === dateOrigin)) {
      this._showErrorMessage();
      e.target.value = '';
      return false;
    }

    return true;
  }

  _showErrorMessage() {
    const inputCoord = this.el.getBoundingClientRect();
    const top = inputCoord.bottom + window.pageYOffset;
    const left = inputCoord.left + window.pageXOffset;

    const { errorMessage } = this;
    errorMessage.style.top = `${top}px`;
    errorMessage.style.left = `${left}px`;
    document.body.append(errorMessage);
  }
}
