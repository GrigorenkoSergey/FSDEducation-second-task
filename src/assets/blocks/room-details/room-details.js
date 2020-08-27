import './room-details.scss';

import dateDropdowns from '../date-dropdown/date-dropdown.js';
import '../dropdown/dropdown.js';
import '../comment/comment.js';
import '../diagram/diagram.js';
import '../buns/buns.js';
import '../final-bill/final-bill.js';
import '../bullet-list/bullet-list.js';

const calendar = dateDropdowns.filter((item) => item.arrival.el.dataset.name === 'arrival_final-bill')[0];
const { arrival, departure } = calendar;

arrival.setDate(new Date(Date.now()));
departure.setDate(new Date(Date.now() + 4 * 24 * 3600 * 1000));
