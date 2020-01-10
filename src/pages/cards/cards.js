import "./cards.scss";
import "../../assets/blocks/search-form/search-form.js";
import dateDropdown from "../../assets/blocks/date-dropdown/date-dropdown.js";

//Отдельно сгенерируем календарик(мы не создавали для него отдельный блок)
import datepicker from 'js-datepicker';

let pickerOptions = dateDropdown.pickerOptions.arrival;
pickerOptions.alwaysShow = true;
pickerOptions.id = 2;
pickerOptions.position = "bl";


const arrivalDate_1 = datepicker(document.querySelector("[name = arrivalDate_1]"), pickerOptions)
pickerOptions.alwaysShow = false;
const departureDate_1 = datepicker(document.querySelector("[name =  departureDate_1]"), pickerOptions)

arrivalDate_1.setDate(new Date(2019, 7, 19), true)
departureDate_1.setDate(new Date(2019, 7, 23), true)