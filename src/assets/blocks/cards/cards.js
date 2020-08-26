import './cards.scss';
import '../search-form/search-form.js';
import '../final-bill/final-bill.js';
import { arrivals, departures } from '../date-dropdown/date-dropdown.js';
import '../preview/preview.js';
import '../registration/registration.js';
import '../log-in/log-in.js';

let [arrival] = arrivals.filter((item) => item.el.dataset.name === 'arrival_calendar');
arrival.el.style = 'visibility: hidden';
arrival.alwaysShow = true;
arrival.show();

let [departure] = departures.filter((item) => item.el.dataset.name === 'departure_calendar');
departure.el.style = 'visibility: hidden';

arrival.setDate(new Date(2019, 7, 19), true);
departure.setDate(new Date(2019, 7, 23), true);

[arrival] = arrivals.filter((item) => item.el.dataset.name === 'arrival_final-bill');
[departure] = departures.filter((item) => item.el.dataset.name === 'departure_final-bill');
arrival.setDate(new Date(2019, 7, 19));
departure.setDate(new Date(2019, 7, 23));