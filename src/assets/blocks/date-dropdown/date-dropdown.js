import './date-dropdown.scss';

import '../datepicker/datepicker.js';
import DateDropdown from './date-dropdown-class.js';

export const arrivals = [];
export const departures = [];

let arrivalId = 1;
[...document.querySelectorAll("[data-id='arrival']")]
  .forEach((item) => {
    const arrival = new DateDropdown(item, { id: arrivalId });
    arrivals.push(arrival);
    arrivalId += 1;
  });

let departureId = 1;
[...document.querySelectorAll("[data-id='departure']")]
  .forEach((item) => {
    const departure = new DateDropdown(item, { id: departureId, position: 'br' });
    departures.push(departure);
    departureId += 1;
  });
