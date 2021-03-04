import dateFilters from '../filter-date/filter-date';
import '../dropdown/dropdown';
import '../range-slider/RangeSlider-init';
import '../preview/preview';
import '../expandable-checkbox-list/ExpandableCheckboxList-init';
import '../rich-checkbox/rich-checkbox';
import '../checkbox-buttons/checkbox-buttons';
import '../pagination/pagination';
import './search-room.scss';

const filter = dateFilters[0];

filter.datepicker.selectDate(new Date('2020, 8, 19'));
filter.datepicker.selectDate(new Date('2020, 8, 23'));
