/* eslint-disable no-param-reassign */
/* eslint-disable no-new */
import datepicker from 'js-datepicker';
import './date-dropdown.scss';

import '../datepicker/datepicker.js';
import DateDropdown from './date-dropdown-class.js';

const dateDropdowns = [];

let id = 1;
[...document.querySelectorAll('.date-dropdown')]
  .forEach((item) => {
    dateDropdowns.push(new DateDropdown(item, { id }));
    id += 1;
  });

export { dateDropdowns as default };
