import './room-details.scss';
import { arrivals, departures } from '../date-dropdown/date-dropdown.js';
import '../dropdown/dropdown.js';
import '../comment/comment.js';
import '../diagram/diagram.js';

const [arrival] = arrivals.filter((item) => item.el.dataset.name === 'arrival_final-bill');
const [departure] = departures.filter((item) => item.el.dataset.name === 'departure_final-bill');
arrival.setDate(new Date(2019, 7, 19));
departure.setDate(new Date(2019, 7, 23));
