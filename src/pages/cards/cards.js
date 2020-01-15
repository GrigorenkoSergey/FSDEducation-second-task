import "./cards.scss";
import "../../assets/blocks/search-form/search-form.js";
import dateDropdowns from "../../assets/blocks/date-dropdown/date-dropdown.js";
import "../../assets/blocks/final-check/final-check.js";

let arrivals = dateDropdowns.arrivals;
let departures = dateDropdowns.departures;

let arrival = arrivals.filter(item => item.el.dataset.name == "arrival_calendar")[0];
arrival.el.classList.add("_invisible");
arrival.alwaysShow = true;
arrival.show();

let departure = departures.filter(item => item.el.dataset.name == "departure_calendar")[0];
departure.el.classList.add("_invisible");

arrival.setDate(new Date(2019, 7, 19), true)
departure.setDate(new Date(2019, 7, 23), true)

arrival = arrivals.filter(item => item.el.dataset.name == "arrival_final-check")[0];
departure = departures.filter(item => item.el.dataset.name == "departure_final-check")[0];
arrival.setDate(new Date(2019, 7, 19));
departure.setDate(new Date(2019, 7, 23));