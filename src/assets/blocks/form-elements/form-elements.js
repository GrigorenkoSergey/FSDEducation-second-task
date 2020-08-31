import './form-elements.scss';

import '../input/input.js';
import '../masked-text-field/masked-text-field.js';
import '../dropdown/dropdown.js';
import dateFilters from '../filter-date/filter-date.js';
import '../like-button/like-button.js';
import '../range-slider/range-slider.js';
import '../rate-button/rate-button.js';
import '../expandable-checkbox-list/expandable-checkbox-list.js';
import '../rich-checkbox/rich-checkbox.js';
import '../checkbox-buttons/checkbox-buttons.js';
import '../buns/buns.js';
import '../radio-buttons-group/radio-buttons-group.js';
import '../toggler/toggler.js';
import '../comment/comment.js';
import '../button/button.js';
import '../button-text/button-text.js';
import '../button-payment/button-payment.js';
import '../pagination/pagination.js';
import '../bullet-list/bullet-list.js';
import '../date-dropdown/date-dropdown.js';

const filter = dateFilters[0];

filter.datepicker.selectDate(new Date('2020, 8, 19'));
filter.datepicker.selectDate(new Date('2020, 8, 23'));
