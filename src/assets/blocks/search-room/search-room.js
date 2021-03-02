import dateFilters from '../filter-date/filter-date.js';
import '../dropdown/dropdown.js';
import '../range-slider/RangeSlider.js';
import '../preview/preview.js';
import '../expandable-checkbox-list/ExpandableCheckboxList-init.js';
import '../rich-checkbox/rich-checkbox.js';
import '../checkbox-buttons/checkbox-buttons.js';
import '../pagination/pagination.js';
import './search-room.scss';

const filter = dateFilters[0];

filter.datepicker.selectDate(new Date('2020, 8, 19'));
filter.datepicker.selectDate(new Date('2020, 8, 23'));
