import "./cards.scss";
//Use "js-datepicker" by The Qodesmith
import datepicker from 'js-datepicker';
import rerenderContainer from "../../assets/blocks/date-dropdown/date-dropdown.js"

const pickerOptions = {
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
}
const arrivalDate = datepicker(document.querySelector("[name = arrivalDate]"), pickerOptions);

pickerOptions.position = 'br';
const departureDate = datepicker(document.querySelector("[name = departureDate]"), pickerOptions);

pickerOptions.alwaysShow = true;
pickerOptions.id = 2;
pickerOptions.position = "bl";


const arrivalDate_1 = datepicker(document.querySelector("[name = arrivalDate_1]"), pickerOptions)
pickerOptions.alwaysShow = false;
const departureDate_1 = datepicker(document.querySelector("[name =  departureDate_1]"), pickerOptions)

arrivalDate_1.setDate(new Date(2019, 7, 19), true)
departureDate_1.setDate(new Date(2019, 7, 23), true)