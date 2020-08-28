/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import datepicker from 'js-datepicker';

const defaultInputValue = 'ДД.ММ.ГГГГ.';

export default class DateDropdown {
  constructor(instance, options = {}) {
    const defaultOptions = {
      startDay: 1,
      customDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      customMonths: ['Январь ', 'Февраль ', 'Март ', 'Апрель ', 'Май ', 'Июнь ',
        'Июль ', 'Август ', 'Сентябрь ', 'Октябрь ', 'Ноябрь ', 'Декабрь '],
      overlayButton: 'Принять',
      overlayPlaceholder: new Date().getFullYear().toString(),
      showAllDates: true,
      id: 1,
      events: [new Date()],
      minDate: new Date(),
      onShow: this.onShow.bind(this),
      onHide: this.onHide.bind(this),
      formatter: this.formatter.bind(this),
    };

    this.el = instance; // DOM-element
    this.options = { ...defaultOptions, ...options };
    this.init();

    return this;
  }

  init() {
    this.arrival = datepicker(this.el.querySelector('[data-id=arrival]'), this.options);
    this.departure = datepicker(this.el.querySelector('[data-id=departure]'), { ...this.options, position: 'br' });

    this.renderButtons(this.arrival.calendarContainer);
    this.renderButtons(this.departure.calendarContainer);
  }

  onShow(instance) {
    const container = instance.calendarContainer;

    // Подвинем на 5.56 пикселей ниже
    container.style.top = `${parseFloat(container.style.top) + 5.56}px`;

    if (this.arrival.dateSelected && !this.departure.dateSelected) {
      this.departure.setDate(this.arrival.dateSelected);
    } else if (!this.arrival.dateSelected && this.departure.dateSelected) {
      this.arrival.setDate(this.departure.dateSelected);
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

    buttonReset.addEventListener('click', this.handleButtonResetClick.bind(this));
    buttonApply.addEventListener('click', this.handleButtonApplyClick.bind(this));
  }

  handleButtonResetClick(e) {
    this.arrival.setDate();
    this.arrival.el.value = defaultInputValue;

    this.departure.setDate();
    this.departure.el.value = defaultInputValue;
  }

  handleButtonApplyClick(e) {
    // eslint-disable-next-line no-console
    console.log('sending data to server');
  }

  formatter(input, date) {
    input.value = date.toLocaleDateString('ru-RU');
  }

  onHide(instance) {
    const dateMask = /^\d{2}\.\d{2}\.20\d{2}$/;
    const input = instance.el.value.trim();
    const dateSelected = new Date(input.split('.').reverse());
    const { minDate, maxDate } = instance;

    const dateIsValid = dateSelected >= minDate
      && (!maxDate || maxDate >= dateSelected);

    if (dateMask.test(input) && dateIsValid) {
      instance.setDate(dateSelected);
    } else {
      instance.setDate();
      instance.el.value = defaultInputValue;
    }
  }
}
