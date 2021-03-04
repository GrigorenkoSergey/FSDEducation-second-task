import dateFilters from '../filter-date/filter-date';
import '../input/input';
import '../masked-text-field/masked-text-field';
import '../dropdown/dropdown';
import '../like-button/LikeButton-init';
import '../range-slider/RangeSlider';
import '../rate-button/RateButton-init';
import '../expandable-checkbox-list/ExpandableCheckboxList-init';
import '../rich-checkbox/rich-checkbox';
import '../checkbox-buttons/checkbox-buttons';
import '../buns/buns';
import '../radio-buttons-group/radio-buttons-group';
import '../toggler/toggler';
import '../comment/comment';
import '../button/button';
import '../button-text/button-text';
import '../button-payment/button-payment';
import '../pagination/pagination';
import '../bullet-list/bullet-list';
import '../date-dropdown/date-dropdown';
import './form-elements.scss';

const filter = dateFilters[0];

filter.datepicker.selectDate(new Date('2020, 8, 19'));
filter.datepicker.selectDate(new Date('2020, 8, 23'));
