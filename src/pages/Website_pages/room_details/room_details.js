import "./room_details.scss";
import dateDropdowns from "../../../assets/blocks/date-dropdown/date-dropdown.js";
import "../../../assets/blocks/comment/comment.js";
import "../../../assets/blocks/final-check/final-check.js";
import "../../../assets/blocks/diagram/diagram.js";

let arrivals = dateDropdowns.arrivals;
let departures = dateDropdowns.departures;

let arrival = arrivals.filter(item => item.el.dataset.name == "arrival_final-check")[0];
let departure = departures.filter(item => item.el.dataset.name == "departure_final-check")[0];
arrival.setDate(new Date(2019, 7, 19));
departure.setDate(new Date(2019, 7, 23));