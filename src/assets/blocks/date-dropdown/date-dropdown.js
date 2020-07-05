/* eslint-disable no-param-reassign */
// Use "js-datepicker" by The Qodesmith
const datepicker = require('js-datepicker');

function rerenderContainer(instanse) {
  const container = instanse.el.parentNode.querySelector('.qs-datepicker-container');

  function renderButtons() {
    const buttonsContainer = document.createElement('div');
    const buttonReset = document.createElement('div');
    const buttonApply = document.createElement('div');

    buttonsContainer.classList.add('date-dropdown__buttons');
    buttonReset.classList.add('date-dropdown__button-reset');
    buttonApply.classList.add('date-dropdown__button-apply');

    buttonReset.innerHTML = 'Очистить';
    buttonApply.innerHTML = 'Применить';

    buttonsContainer.append(buttonReset, buttonApply);
    container.append(buttonsContainer);

    function buttonResetClickHandler(e) {
      instanse.setDate();
      instanse.el.value = 'ДД.ММ.ГГГГ.';
    }

    function buttonApplyClickHandler(e) {
      // eslint-disable-next-line no-console
      console.log('sending data to server');
    }

    buttonReset.addEventListener('click', buttonResetClickHandler);
    buttonApply.addEventListener('click', buttonApplyClickHandler);
  }

  // Подвинем на 5.56 пикселей ниже и сгенерируем кнопки
  container.style.top = `${parseFloat(container.style.top) + 5.56}px`;

  // если у нас еще не сгенерированы кнопки "Очистить" и "Применить", то сгенерируем их
  if (!instanse.el.parentNode.querySelector('.date-dropdown__buttons')) {
    renderButtons();
  }
}

const arrivalPickerOptions = {
  onShow: rerenderContainer,
  formatter: (input, date, instanse) => {
    const value = date.toLocaleDateString('ru-RU');
    input.value = value;
  },
  startDay: 1,
  customDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  overlayButton: 'Принять',
  overlayPlaceholder: new Date().getFullYear().toString(),
  showAllDates: true,
  id: 1,
  events: [new Date(2019, 7, 8)],
};

const departurePickerOptions = { ...arrivalPickerOptions };
departurePickerOptions.position = 'br';

const arrivals = [];
const departures = [];

[...document.querySelectorAll("[data-id='arrival']")]
  .forEach((item) => {
    const arrival = datepicker(item, arrivalPickerOptions);
    arrivals.push(arrival);
    arrivalPickerOptions.id += 1;
  });

[...document.querySelectorAll("[data-id='departure']")]
  .forEach((item) => {
    const departure = datepicker(item, departurePickerOptions);
    departures.push(departure);
    departurePickerOptions.id += 1;
  });

module.exports = {
  pickerOptions: {
    arrival: arrivalPickerOptions,
    departure: departurePickerOptions,
  },
  arrivals,
  departures,
};
