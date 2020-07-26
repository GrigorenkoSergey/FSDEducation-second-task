import './cards.scss';
import '../search-form/search-form.js';
import '../final-bill/final-bill.js';
import { arrivals, departures } from '../date-dropdown/date-dropdown.js';
import '../preview/preview.js';

let [arrival] = arrivals.filter((item) => item.el.dataset.name === 'arrival_calendar');
arrival.el.classList.add('_invisible');
arrival.alwaysShow = true;
arrival.show();

let [departure] = departures.filter((item) => item.el.dataset.name === 'departure_calendar');
departure.el.classList.add('_invisible');

arrival.setDate(new Date(2019, 7, 19), true);
departure.setDate(new Date(2019, 7, 23), true);

[arrival] = arrivals.filter((item) => item.el.dataset.name === 'arrival_final-bill');
[departure] = departures.filter((item) => item.el.dataset.name === 'departure_final-bill');
arrival.setDate(new Date(2019, 7, 19));
departure.setDate(new Date(2019, 7, 23));
