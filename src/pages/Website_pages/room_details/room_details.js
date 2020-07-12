import './room_details.scss';
// import dateDropdowns from '../../../assets/blocks/date-dropdown/date-dropdown.js';
import { arrivals, departures } from '../../../assets/blocks/date-dropdown/date-dropdown.js';
import '../../../assets/blocks/dropdown/dropdown.js';
import '../../../assets/blocks/comment/comment.js';
import '../../../assets/blocks/diagram/diagram.js';

// const { arrivals } = dateDropdowns;
// const { departures } = dateDropdowns;

const [arrival] = arrivals.filter((item) => item.el.dataset.name === 'arrival_final-bill');
const [departure] = departures.filter((item) => item.el.dataset.name === 'departure_final-bill');
arrival.setDate(new Date(2019, 7, 19));
departure.setDate(new Date(2019, 7, 23));
