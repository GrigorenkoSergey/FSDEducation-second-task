import $ from 'jquery';
import 'air-datepicker/dist/js/datepicker.min.js';
import 'air-datepicker/dist/css/datepicker.min.css';
import './datepicker.scss';

export default class Datepicker {
  constructor(el, options) {
    const defaultOptions = {
      range: true,
      minDate: new Date(),
      dateFormat: 'dd M',
      multipleDatesSeparator: ' - ',
      prevHtml: '<i class="material-icons">arrow_back</i>',
      nextHtml: '<i class="material-icons">arrow_forward</i>',
      navTitles: {
        days: 'MM <i>yyyy</i>',
        months: 'yyyy',
        years: 'yyyy1 - yyyy2',
      },
    };
    this.el = el;
    this._init(el, { ...defaultOptions, ...options });
  }

  _init(el, options) {
    this.datepicker = $(el).datepicker(options).data('datepicker');
    this._renderButtons(this.datepicker.$datepicker[0]);
  }

  _renderButtons(container) {
    const [buttonsContainer, buttonReset, buttonApply] = new Array(3).fill(1).map(() => document.createElement('div'));

    buttonsContainer.classList.add('datepicker--buttons');
    buttonReset.classList.add('datepicker--button-reset');
    buttonApply.classList.add('datepicker--button-apply');

    buttonReset.innerHTML = 'Очистить';
    buttonApply.innerHTML = 'Применить';

    buttonsContainer.append(buttonReset, buttonApply);
    container.append(buttonsContainer);

    buttonReset.addEventListener('click', this._handleButtonResetClick.bind(this));
    buttonApply.addEventListener('click', this._handleButtonApplyClick.bind(this));
  }

  _handleButtonResetClick() {
    this.datepicker.clear();
  }

  _handleButtonApplyClick() {
    this.datepicker.hide();
  }
}