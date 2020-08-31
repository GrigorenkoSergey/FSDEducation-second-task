import './search-room.scss';

import '../dropdown/dropdown.js';
import '../range-slider/range-slider.js';
import '../preview/preview.js';
import '../expandable-checkbox-list/expandable-checkbox-list.js';
import dateFilters from '../filter-date/filter-date.js';
import '../rich-checkbox/rich-checkbox.js';
import '../checkbox-buttons/checkbox-buttons.js';
import '../pagination/pagination.js';

const filter = dateFilters[0];

filter.datepicker.selectDate(new Date('2020, 8, 19'));
filter.datepicker.selectDate(new Date('2020, 8, 23'));
