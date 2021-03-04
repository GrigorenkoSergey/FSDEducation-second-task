/* eslint-disable no-param-reassign */
import Datepicker from '../datepicker/Datepicker';
import './filter-date.scss';

const dateFilters = [...document.querySelectorAll('.js-filter-date__input')]
  .map((item) => new Datepicker(item, {
    onSelect: (formattedDate, date, inst) => {
      inst.el.value = inst.el.value.toLowerCase();
    },
  }));

export { dateFilters as default };
