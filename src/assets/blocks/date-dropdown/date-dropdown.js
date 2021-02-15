import './date-dropdown.scss';

import DateDropdown from './DateDropdown.js';

const dateDropdowns = [...document.querySelectorAll('.date-dropdown')]
  .map((item) => new DateDropdown(item));

export { dateDropdowns as default };
