import "./cards.scss";
import "../../assets/blocks/search-form/search-form.js";
import dateDropdown from "../../assets/blocks/date-dropdown/date-dropdown.js";

//Отдельно сгенерируем календарик(мы не создавали для него отдельный блок)
import datepicker from 'js-datepicker';

let pickerOptions = dateDropdown.pickerOptions.arrival;
pickerOptions.alwaysShow = true;
pickerOptions.id = 2;
pickerOptions.position = "bl";


const arrival_2 = datepicker(document.querySelector("[name = arrivalDate_1]"), pickerOptions)
arrival_2.el.classList.add("_invisible");
pickerOptions.alwaysShow = false;

const departure_2 = datepicker(document.querySelector("[name =  departureDate_1]"), pickerOptions)
departure_2.el.classList.add("_invisible");

arrival_2.setDate(new Date(2019, 7, 19), true)
departure_2.setDate(new Date(2019, 7, 23), true)