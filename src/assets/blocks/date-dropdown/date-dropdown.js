// Use "js-datepicker" by The Qodesmith
const datepicker = require('js-datepicker');

let arrivalPickerOptions = {
  onShow: rerenderContainer,
  formatter: (input, date, instanse) => {
    const value = date.toLocaleDateString("ru-RU");
    input.value = value;
  },
  startDay: 1,
  customDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  customMonths: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
  overlayButton: "Принять",
  overlayPlaceholder: new Date().getFullYear().toString(),
  showAllDates: true,
  id: 1,
  events: [new Date(2019, 7, 8)],
};

let departurePickerOptions = Object.assign({}, arrivalPickerOptions);
departurePickerOptions.position = "br";

let arrivals = [];
let departures = [];

for (let item of document.querySelectorAll("[data-id='arrival']")) {
  let arrival = datepicker(item, arrivalPickerOptions);
  arrivals.push(arrival);
  arrivalPickerOptions.id++;
}

for (let item of document.querySelectorAll("[data-id='departure']")) {
  let departure = datepicker(item, departurePickerOptions);
  departures.push(departure);
  departurePickerOptions.id++;
}

function rerenderContainer(instanse) {
  let container = instanse.el.parentNode.querySelector(".qs-datepicker-container");

  //Подвинем на 5.56 пикселей ниже и сгенерируем кнопки
  container.style.top = parseFloat(container.style.top) + 5.56 + "px";

  //если у нас еще не сгенерированы кнопки "Очистить" и "Применить", то сгенерируем их
  if (!instanse.el.parentNode.querySelector(".date-dropdown__buttons")) {
    renderButtons();
  }

  function renderButtons() {
    let buttonsContainer = document.createElement("div");
    let buttonReset = document.createElement("div");
    let buttonApply = document.createElement("div");

    buttonsContainer.classList.add('date-dropdown__buttons');
    buttonReset.classList.add("date-dropdown__button-reset");
    buttonApply.classList.add("date-dropdown__button-apply");

    buttonReset.innerHTML = "Очистить";
    buttonApply.innerHTML = "Применить";

    buttonsContainer.append(buttonReset, buttonApply);
    container.append(buttonsContainer);

    buttonReset.addEventListener("click", buttonResetClickHandler);
    buttonApply.addEventListener("click", buttonApplyClickHandler);

    function buttonResetClickHandler(e) {
      instanse.setDate();
      instanse.el.value = "ДД.ММ.ГГГГ.";
    }

    function buttonApplyClickHandler(e) {
      console.log("sending data to server");
    }
  }
}

module.exports = {
  pickerOptions: {
    arrival: arrivalPickerOptions,
    departure: departurePickerOptions,
  },
  arrivals: arrivals,
  departures: departures,
}