/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import datepicker from 'js-datepicker';

export default class DateDropdown {
  constructor(item, options) {
    const defaultOptions = {
      startDay: 1,
      customDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      customMonths: ['Январь ', 'Февраль ', 'Март ', 'Апрель ', 'Май ', 'Июнь ',
        'Июль ', 'Август ', 'Сентябрь ', 'Октябрь ', 'Ноябрь ', 'Декабрь '],
      overlayButton: 'Принять',
      overlayPlaceholder: new Date().getFullYear().toString(),
      showAllDates: true,
      id: 1,
      events: [new Date(2019, 7, 8)],
      onShow: this.onShow.bind(this),
      formatter: this.formatter.bind(this),
    };

    const optionsUpdated = { ...defaultOptions, ...options };
    this.datepicker = datepicker(item, optionsUpdated);

    return this.datepicker;
  }

  onShow() {
    const container = this.datepicker.el.parentNode.querySelector('.qs-datepicker-container');

    // Подвинем на 5.56 пикселей ниже и сгенерируем кнопки
    container.style.top = `${parseFloat(container.style.top) + 5.56}px`;

    // если у нас еще не сгенерированы кнопки "Очистить" и "Применить", то сгенерируем их
    if (!container.querySelector('.date-dropdown__buttons')) {
      this.renderButtons(container);
    }
  }

  renderButtons(container) {
    const [buttonsContainer, buttonReset, buttonApply] = new Array(3).fill(1).map(() => document.createElement('div'));

    buttonsContainer.classList.add('date-dropdown__buttons');
    buttonReset.classList.add('date-dropdown__button-reset');
    buttonApply.classList.add('date-dropdown__button-apply');

    buttonReset.innerHTML = 'Очистить';
    buttonApply.innerHTML = 'Применить';

    buttonsContainer.append(buttonReset, buttonApply);
    container.append(buttonsContainer);

    this.handleButtonApplyClick = this.handleButtonApplyClick.bind(this);
    this.handleButtonResetClick = this.handleButtonResetClick.bind(this);

    buttonReset.addEventListener('click', this.handleButtonResetClick);
    buttonApply.addEventListener('click', this.handleButtonApplyClick);
  }

  handleButtonResetClick(e) {
    this.datepicker.setDate();
    this.el.value = 'ДД.ММ.ГГГГ.';
  }

  handleButtonApplyClick(e) {
    // eslint-disable-next-line no-console
    console.log('sending data to server');
  }

  formatter(input, date) {
    const value = date.toLocaleDateString('ru-RU');
    input.value = value;
  }
}
