import './date-dropdown.scss';

import DateDropdown from './date-dropdown-class.js';

const dateDropdowns = [...document.querySelectorAll('.date-dropdown')]
  .map((item) => new DateDropdown(item));

export { dateDropdowns as default };
