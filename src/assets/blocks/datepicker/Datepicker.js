import $ from 'jquery';
import 'air-datepicker/dist/js/datepicker.min';
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
    const buttonsContainer = document.createElement('div');
    const [buttonReset, buttonApply] = new Array(2).fill(1)
      .map(() => {
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        return button;
      });

    buttonsContainer.classList.add('datepicker--buttons');
    buttonsContainer.append(buttonReset, buttonApply);
    container.append(buttonsContainer);

    buttonReset.classList.add('datepicker--button-reset');
    buttonReset.innerHTML = 'Очистить';
    buttonReset.addEventListener('click', this._handleButtonResetClick.bind(this));

    buttonApply.classList.add('datepicker--button-apply');
    buttonApply.innerHTML = 'Применить';
    buttonApply.addEventListener('click', this._handleButtonApplyClick.bind(this));
  }

  _handleButtonResetClick() {
    this.datepicker.clear();
  }

  _handleButtonApplyClick() {
    this.datepicker.hide();
  }
}
