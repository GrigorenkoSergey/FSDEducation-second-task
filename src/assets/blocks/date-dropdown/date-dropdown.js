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

let departurePickerOption = Object.assign({}, arrivalPickerOptions);
departurePickerOption.position = "br";

const arrival = datepicker(document.querySelector("[name = arrival"), arrivalPickerOptions);
const departure = datepicker(document.querySelector("[name = departure]"), departurePickerOption);

function rerenderContainer(instanse) {
    let container = instanse.el.parentNode.querySelector(".qs-datepicker-container");

    //Подвинем на 5.56 пикселей ниже и сгенерируем кнопки
    rerenderContainer();

    function rerenderContainer() {
        container.style.top = parseFloat(container.style.top) + 5.56 + "px";
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
        departure: departurePickerOption,
    },
    arrival: arrival,
    departure: departure,
}