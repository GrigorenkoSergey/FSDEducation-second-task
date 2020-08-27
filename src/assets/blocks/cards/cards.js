import './cards.scss';
import '../search-form/search-form.js';
import '../final-bill/final-bill.js';
import dateDropdowns from '../date-dropdown/date-dropdown.js';
import '../preview/preview.js';
import '../registration/registration.js';
import '../log-in/log-in.js';

const [calendar] = dateDropdowns.filter((item) => item.arrival.el.dataset.name === 'arrival_calendar');
calendar.arrival.setDate(new Date(Date.now() + 24 * 3600 * 1000));
calendar.departure.setDate(new Date(Date.now() + 3 * 24 * 3600 * 1000));

calendar.arrival.alwaysShow = true;
calendar.arrival.show();

calendar.arrival.el.style = 'visibility: hidden';
calendar.departure.el.style = 'visibility: hidden';
