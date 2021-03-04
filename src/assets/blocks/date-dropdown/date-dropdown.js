import DateDropdown from './DateDropdown';
import './date-dropdown.scss';

const dateDropdowns = [...document.querySelectorAll('.js-date-dropdown')]
  .map((item) => new DateDropdown(item));

export { dateDropdowns as default };
